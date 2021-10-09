import client from "./client";

export const userProfileAPI = async (fd: FormData) => {
  const response = await client.post("/user/uploadImg", fd);
  return response.data.image;
};

export const updateUserInfoAPI = async (thumbnail: string) => {
  const body = {
    thumbnail,
  };
  const response = await client.patch("/user/updateUserInfo", body);
  return response;
};
