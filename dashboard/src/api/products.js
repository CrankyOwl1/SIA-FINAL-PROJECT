import axios from "axios";
const API = "http://localhost:5004/api/products";

export const getProducts = () => axios.get(API).then(res => res.data);
export const getProductById = (id) => axios.get(`${API}/${id}`).then(res => res.data);
export const createProduct = (data) => axios.post(API, data).then(res => res.data);
export const updateProduct = (id, data) => axios.put(`${API}/${id}`, data).then(res => res.data);
export const deleteProduct = (id) => axios.delete(`${API}/${id}`).then(res => res.data);
