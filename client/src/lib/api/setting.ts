import { StringMappingType } from "typescript";
import client from "./client";

export const userProfileAPI = async (fd: FormData) => {
  const response = await client.post("/user/uploadImg", fd);
  return response.data.image;
};

export const updateUserInfoAPI = async (
  thumbnail: string,
  name: string,
  oldPassword:string,
  newPassword: string,
) => {
  const body = {
    thumbnail,
    name,
    oldPassword,
    newPassword
  };
  const response = await client.patch("/user/updateUserInfo", body);
  return response.data.user;
};
