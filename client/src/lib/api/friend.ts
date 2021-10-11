import client from "./client";

//친구 목록 불러오기
export const readFriendListAPI = async () => {
  const response = await client.get(`/user/readFriendList/`);
  return response.data.myFriends;
};

//친구 삭제
export const friendDeleteAPI = async (friendId: string) => {
  const response = await client.delete(`/user/deleteFriend/${friendId}`);
  return response.data.myFriends;
};

//email로 친구 검색하기
export const friendSearchAPI = async (friendEmail: string) => {
  const response = await client.get(`/user/searchFriendEmail/${friendEmail}`);
  return response.data.members;
};
