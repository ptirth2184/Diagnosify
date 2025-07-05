import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:8000/api",
});

export const getSymptoms = () => API.get("/symptoms/");
export const predictDisease = (data) => API.post("http://localhost:5000/predict", data);
