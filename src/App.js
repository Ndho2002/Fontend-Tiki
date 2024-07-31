import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { isJsonString } from "./utils";
import { jwtDecode } from "jwt-decode";
import { axiosJwt, getDetailsUser, refreshToken } from "./services/UserService";
import { resetUser, updateUserRD } from "./redux/slides/userSlice";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id && isAccessTokenValid(storageData)) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
  }, []);

  const isAccessTokenValid = (storageData) => {
    if (!storageData) return false;
    try {
      const token = JSON.parse(storageData);
      return token?.exp > Date.now() / 1000;
    } catch (error) {
      return false;
    }
  };
  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { storageData, decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await refreshToken(storageData);
        localStorage.setItem("access_token", JSON.stringify(data.access_token));
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateUserRD({ ...res?.data, access_token: token }));
  };

  return (
    <Router>
      <Routes>
        {routes.map((page) => {
          const Page = page.page;
          const checkAuth = !page.isPrivate || user.isAdmin;
          const Layout = page.isShowHeader ? DefaultComponent : Fragment;

          return (
            <Route
              key={page.path}
              path={checkAuth ? page.path : undefined}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
