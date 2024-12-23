import axios from "axios";

// Set base URL for Axios
const API_BASE_URL = "https://api.example.com"; // Replace with your actual API URL

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const addUser = async (newUser: { name: string; email: string; role: string }) => {
  const response = await axios.post(`${API_BASE_URL}/users`, newUser);
  return response.data;
};
