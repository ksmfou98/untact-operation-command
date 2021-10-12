import { friendAddAPI, friendDeleteAPI } from "lib/api/friend";

export default function useMemberHandleEffect() {
  //친구 삭제 기능
  const onDeleteFriend = async (friendId: string) => {
    try {
      const response = await friendDeleteAPI(friendId);
      return response;
    } catch (e) {
      alert("친구 삭제에 실패했습니다");
      console.log(e);
    }
  };

  const onAddFriend = async (friendId: string) => {
    try {
      const myFriends = await friendAddAPI(friendId);
      return myFriends;
    } catch (e) {
      alert("친구 추가에 실패했습니다");
      console.log(e);
    }
  };
  return { onDeleteFriend, onAddFriend };
}
