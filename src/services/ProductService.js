import axios from "axios";

export const getAllProduct = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `http://localhost:3000/api/product/getAll?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `http://localhost:3000/api/product/getAll?limit=${limit}`
    );
  }

  return res.data;
};

export const getAllProductSort = async (sort, typeSort, limit) => {
  const res = await axios.get(
    `http://localhost:3000/api/product/getAll?sort=${sort}&sort=${typeSort}&limit=${limit}`
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

export const createProduct = async (data, access_token) => {
  const res = await axios.post(
    "http://localhost:3000/api/product/create",
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `http://localhost:3000/api/product/getByProduct/${id}`
  );
  return res.data;
};

export const updataProduct = async (id, data, access_token) => {
  const res = await axios.put(
    `http://localhost:3000/api/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axios.delete(
    `http://localhost:3000/api/product/delete/${id}`,

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
