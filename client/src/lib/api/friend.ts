import client from "./client";

export const readFriendListAPI = async () => {
  const response = await client.get(`/user/readFriendList/`);
  return response.data.myFriends;
};
