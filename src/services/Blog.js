import axios from "axios";

export const getBlogs = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `http://localhost:8080/api/blog/get-blogs?filter=title&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `http://localhost:8080/api/blog/get-blogs?limit=${limit}`
    );
  }

  return res.data;
};

export const likeBlog = async (id, access_token) => {
  axios.defaults.headers.common["token"] = `Bearer ${access_token}`;
  const res = await axios.put(`http://localhost:8080/api/blog/like/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  // headers: {'X-Custom-Header': 'foobar'});
  return res.data;
};

export const dislikeBlog = async (id, access_token) => {
  axios.defaults.headers.common["token"] = `Bearer ${access_token}`;
  const res = await axios.put(`http://localhost:8080/api/blog/dislike/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  // headers: {'X-Custom-Header': 'foobar'});
  return res.data;
};

export const createBlog = async (data) => {
  const res = await axios.post(
    "http://localhost:8080/api/blog/create-blog",
    data
  );
  return res.data;
};

export const getProductType = async (type) => {
  if (type) {
    const res = await axios.get(
      `http://localhost:3000/api/product/getAll?filter=type&filter=${type}`
    );
    return res.data;
  }
};

export const createProduct = async (data) => {
  const res = await axios.post(
    "http://localhost:3000/api/product/create",
    data
  );
  return res.data;
};
export const getDetailsBlog = async (id) => {
  const res = await axios.get(
    `http://localhost:8080/api/blog/get-by-blog/${id}`
  );
  return res.data;
};

export const updataBlog = async (id, data, access_token) => {
  axios.defaults.headers.common["token"] = `Bearer ${access_token}`;
  const res = await axios.put(
    `http://localhost:8080/api/blog/update-blog/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteBlog = async (id, access_token) => {
  axios.defaults.headers.common["token"] = `Bearer ${access_token}`;
  const res = await axios.delete(
    `http://localhost:8080/api/blog/detele-blog/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const SortSearchFilerProduct = async (page, sort, filter) => {
  const res = await axios.get(
    `http://localhost:3000/api/product/getAll?page=${page}&sort=${sort.sort},${sort.order}`
  );
  return res.data;
};
