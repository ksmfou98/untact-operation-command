import { IUserState } from "atoms/userState";
import useInput from "hooks/common/useInput";
import { friendSearchAPI } from "lib/api/friend";
import { useState } from "react";

export default function useMemberSearchEffect() {
  const [members, setMembers] = useState<IUserState[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [searchEmail, onChangeSearchEmail, setSearchEmail] = useInput("");

  const onSearchMember = async () => {
    try {
      const members = await friendSearchAPI(searchEmail);
      setMembers(members);
    } catch (e) {
      alert("친구 검색에 실패했습니다.");
      console.log(e);
      setSearchEmail("");
    }
  };

  const onClickMember = (userId: string) => {
    setSelectedMember(userId);
  };
  return {
    onSearchMember,
    searchEmail,
    onChangeSearchEmail,
    setSearchEmail,
    members,
    selectedMember,
    setSelectedMember,
    onClickMember,
  };
}
