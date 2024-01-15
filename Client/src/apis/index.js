import Axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
  return config;
});

// GET REQUESTS
export const getUser = () => axios.get("/api/users/users/me");
export const getCategoiries = () => axios.get("/api/categories");
export const getSingleCategory = (id) => axios.get(`/api/categories/${id}`);
export const getMenuItems = () => axios.get("/api/menu-items");
export const getSingleMenuItem = (id) => axios.get(`/api/menu-items/${id}`);
export const getCartItems = () => axios.get("/api/cart/menu-items");
export const getOrders = () => axios.get("/api/orders");
export const getSingleOrder = (id) => axios.get(`/api/orders/${id}`);

// POST REQUESTS
export const register = (data) => axios.post("/api/users", data);
export const login = (data) => axios.post("/token/login/", data);
export const addToCart = (data) => axios.post("/api/cart/menu-items", data);
export const makeOrder = (data) => axios.post("/api/orders", data);

// PUT REQUESTS
export const updateOrderStatus = (id, data) =>
  axios.put(`/api/orders/${id}`, data);

// DELETE REQUESTS
export const deleteCartItem = (id) =>
  axios.delete(`/api/cart/menu-items/${id}`);

export const logout = () => axios.delete("/api/users/logout/");

//////////////////////////// STAFF API CALLS ////////////////////////////
export const getUsers = () => axios.get("/api/groups/manager/users");

export const makeUserManager = (data) =>
  axios.post("/api/groups/manager/users", data);
export const removeUserManager = (id) =>
  axios.delete("/api/groups/manager/users/" + id);
export const makeUserDelivery = (data) =>
  axios.post("/api/groups/delivery-crew/users", data);
export const removeUserDelivery = (id) =>
  axios.delete("/api/groups/delivery-crew/users/" + id);

export const newMenuItem = (data) => axios.post("/api/menu-items", data);
export const editMenuItem = (id, data) =>
  axios.put("/api/menu-items/" + id, data);
export const removeMenuItem = (id) => axios.delete("/api/menu-items/" + id);

export const newCategory = (data) => axios.post("/api/categories", data);
export const editCategory = (id, data) =>
  axios.put("/api/categories/" + id, data);
export const removeCategory = (id) => axios.delete("/api/categories/" + id);

export const staffLogin = async (data) => {
  try {
    const response = await validateRole(data);
    if (response.data.isValid === "True") {
      return axios.post("/token/login/", data);
    } else {
      throw new Error("Invalid role");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

async function validateRole(data) {
  try {
    const response = await axios.post(`/api/staff/check`, data);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
