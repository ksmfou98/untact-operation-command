import client from "./client";

export const readFriendListAPI = async () => {
  const response = await client.get(`/user/readFriendList/`);
  return response.data.myFriends;
};

export const friendDeleteAPI = async (friendId: string) => {
  const response = await client.delete(`/user/deleteFriend/${friendId}`);
  return response.data.myFriends;
};
