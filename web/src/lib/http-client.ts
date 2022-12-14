import axios from "axios";
import { getAuthToken } from "../stores/auth.store";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
});

httpClient.interceptors.request.use((req) => {
  if (!req.headers) req.headers = {};
  const token = getAuthToken();
  req.headers.authorization = token ? `Bearer ${token}` : undefined;
  return req;
});
