import axios, { type AxiosError } from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  adapter: "fetch",
});

export const isBadRequestError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error) && error.response?.status === 400;

export const isUnauthorizedError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error) && error.response?.status === 401;

export const isConflictError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error) && error.response?.status === 409;
