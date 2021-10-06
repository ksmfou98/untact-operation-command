import { IUserState } from "atoms/userState";
import { readFriendListAPI } from "lib/api/friend";
import { useEffect, useState } from "react";

export default function useMemberListEffect() {
  const [friends, setFriends] = useState<IUserState[]>([]);
  useEffect(() => {
    const getData = async () => {
      const friendsList = await readFriendListAPI();
      setFriends(friendsList);
    };
    getData();
  }, [setFriends]);

  return { friends };
}
