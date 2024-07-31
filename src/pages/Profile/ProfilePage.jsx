import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDetailsUser, updateUser } from "../../services/UserService";
import { useDispatch } from "react-redux";
import { useMutationHook } from "../../hooks/UserMutationHook";
import { updateUserRD } from "../../redux/slides/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [form, setForm] = useState(user);

  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    updateUser(id, rests, access_token);
  });

  const { data, status, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      handleGetDetailsUsers(user?.id, user?.access_token);
    }
  }, [isSuccess]);

  useEffect(() => {
    setForm(user);
  }, [user]);

  const handleGetDetailsUsers = async (id, token) => {
    const res = await getDetailsUser(id, token);
    dispatch(updateUserRD({ ...res?.data, access_token: token }));
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const { name, email, phone, address } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      access_token: user?.access_token,
    });
  };

  return (
    <div className="bg-[#f5f5fa] py-20">
      <div className="max-w-screen-xl px-5 mx-auto">
        <div className=" bg-white p-4 w-[512px] mx-auto rounded-lg">
          <div className=" rounded-xl mx-auto ">
            <div className=" text-center text-base font-normal text-[rgb(100,100,109)] mb-2 ">
              Thông tin cá nhân
            </div>

            <form onSubmit={handleSubmit}>
              <div className=" flex flex-col gap-3">
                <div>
                  <label className="w-full max-w-[110px] inline-block text-sm text-[rgb(51, 51, 51)] mb-2">
                    Họ & tên
                  </label>
                  <input
                    className="rounded py-[10px] focus:outline-none px-3 w-full"
                    type="text"
                    id="name"
                    onChange={handleOnChange}
                    value={name}
                  />
                </div>
                <div>
                  <label className="w-full max-w-[110px] inline-block text-sm text-[rgb(51, 51, 51)] mb-4">
                    email
                  </label>
                  <input
                    className="rounded py-[10px] focus:outline-none px-3 w-full"
                    type="email"
                    id="email"
                    onChange={handleOnChange}
                    value={email}
                  />
                </div>
                <div>
                  <label className="w-full max-w-[110px] inline-block text-sm text-[rgb(51, 51, 51)] mb-4">
                    Phone
                  </label>
                  <input
                    className="rounded py-[10px] focus:outline-none px-3 w-full"
                    type="text"
                    id="phone"
                    onChange={handleOnChange}
                    value={phone}
                  />
                </div>
                <div>
                  <label className="w-full max-w-[110px] inline-block text-sm text-[rgb(51, 51, 51)] mb-4">
                    address
                  </label>
                  <input
                    className="rounded py-[10px] focus:outline-none px-3 w-full"
                    type="text"
                    id="address"
                    onChange={handleOnChange}
                    value={address}
                  />
                </div>
                <div className="mx-auto">
                  <button className="  w-[200px] cursor-pointer bg-[rgb(11,116,229)] h-[40px] text-white border-none rounded text-sm  ">
                    {status === "pending" ? "Loading..." : "Lưu thông tin"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
