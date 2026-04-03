import axios from "axios";

const api_SpaCar = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api_SpaCar;
