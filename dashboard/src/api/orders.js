import axios from "axios";
const API = "http://localhost:5003/api/orders";

export const getOrders = (userId) => axios.get(`${API}/${userId}`).then(res => res.data);
export const createOrder = (data) => axios.post(API, data).then(res => res.data);
export const updateOrderStatus = (orderId, status) => 
  axios.put(`${API}/${orderId}`, { status }).then(res => res.data);
export const deleteOrder = (orderId) => axios.delete(`${API}/${orderId}`).then(res => res.data);
export const getOrderDetails = (orderId) => axios.get(`${API}/details/${orderId}`).then(res => res.data);
export const getAllOrders = () => axios.get(`${API}/all`).then(res => res.data);
