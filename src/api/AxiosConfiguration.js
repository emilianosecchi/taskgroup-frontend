import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_BACKEND_API_URL,
});

instance.interceptors.request.use(function (config) {
  const token = sessionStorage.getItem("jwtToken")
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export function getAxiosInstance() {
  return instance;
}

export function getFullUrl(resourceName, endpointName) {
  return resourceName + "/" + endpointName;
}
