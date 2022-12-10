import axios from "axios";
import { getAuthToken } from "../stores/auth.store";

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

httpClient.interceptors.request.use((req) => {
  if (!req.headers) req.headers = {};
  req.headers.authorization = getAuthToken();
  return req;
});
