import { friendsState, IUserState } from "atoms/userState";
import { friendAddAPI, friendDeleteAPI } from "lib/api/friend";
import { useRecoilState } from "recoil";

export default function useMemberHandleEffect() {
  const [friends, setFriends] = useRecoilState(friendsState);
  //친구 삭제 기능
  const onDeleteFriend = async (friendId: string) => {
    try {
      const myFriends = await friendDeleteAPI(friendId);
      setFriends(myFriends);
    } catch (e) {
      alert("친구 삭제에 실패했습니다");
    }
  };

  const onAddFriend = async (friendId: string) => {
    try {
      const friend = await friendAddAPI(friendId);
      setFriends(friends.concat(friend));
    } catch (e) {
      alert("친구 추가에 실패했습니다");
    }
  };
  return { onDeleteFriend, onAddFriend };
}
