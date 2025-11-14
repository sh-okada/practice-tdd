import { axiosClient } from "@/libs/axios";

export type UserResponse = {
  id: string;
  email: string;
  name: string;
};

export const getMe = async () => axiosClient.get<UserResponse>("/users/me");
