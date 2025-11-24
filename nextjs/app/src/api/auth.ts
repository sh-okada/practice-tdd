import { axiosClient } from "@/libs/axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (formData: LoginRequest) =>
  axiosClient.post("/auth/login", formData);

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export const signup = async (formData: SignupRequest) =>
  axiosClient.post("/auth/signup", formData);
