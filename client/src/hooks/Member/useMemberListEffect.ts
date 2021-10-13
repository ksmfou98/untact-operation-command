import { friendsState } from "atoms/userState";
import { readFriendListAPI } from "lib/api/friend";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function useMemberListEffect() {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useRecoilState(friendsState);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const friendsList = await readFriendListAPI();
        setFriends(friendsList);
      } catch (error) {
        alert("친구 목록을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [setFriends]);

  return { friends, setFriends, loading };
}
