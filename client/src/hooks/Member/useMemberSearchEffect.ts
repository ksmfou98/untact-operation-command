import { IUserState } from "atoms/userState";
import { friendSearchAPI } from "lib/api/friend";
import { useEffect } from "react";

export default function useMemberSearchEffect(friendEmail: string) {
  const memberList = friendSearchAPI(friendEmail);
  return memberList;
}
