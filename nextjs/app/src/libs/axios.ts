import axios, { type AxiosError } from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  adapter: "fetch",
});

export const isUnauthorizedError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error) && error.response?.status === 401;
