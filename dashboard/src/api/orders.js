import axios from 'axios';

const API = "http://localhost:5003/api/orders";

export const getOrders = (userId) =>
  axios.get(`${API}/user/${userId}`).then(res => res.data);

export const createOrder = (data) =>
  axios.post(API, data).then(res => res.data);
