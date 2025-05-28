import axios from "axios";
const API = "http://localhost:5000/api";

export const login = (data) => axios.post(`${API}/login`, data).then(res => res.data);
export const register = (data) => axios.post(`${API}/register`, data).then(res => res.data);
export const getUserById = (userId, token) =>
  axios
    .get(`${API}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);