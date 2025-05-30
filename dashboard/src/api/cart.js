import axios from "axios";

const API = "http://localhost:5002/api/cart";

export const getCart = (userId) => axios.get(`${API}/${userId}`).then(res => res.data);
export const addToCart = (data) => axios.post(API, data).then(res => res.data);

// Add this clearCart function
export const clearCart = (userId) => axios.post(`${API}/clear/${userId}`).then(res => res.data);
