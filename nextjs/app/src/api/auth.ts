import { axiosClient } from "@/libs/axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (formData: LoginRequest) =>
  axiosClient.post("/auth/login", formData);
