import { userState } from "atoms/userState";
import AuthError from "components/auth/AuthError";
import Loading from "components/common/Loading";
import PasswordModal from "components/home/PasswordModal";
import Meet from "components/meet/Meet";
import MeetNotFound from "components/meet/MeetNotFound";
import useFindMeet from "hooks/meet/useFindMeet";
import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

const MeetPage = () => {
  const { loading, exist, meet, meetId } = useFindMeet();
  const user = useRecoilValue(userState);
  const [isRoomPassword, setIsRoomPassword] = useState(false);

  useEffect(() => {
    if (meet?.password) setIsRoomPassword(true);
  }, [meet?.password]);

  if (!user._id) return <AuthError />;
  if (loading) return <Loading />;
  if (!exist) return <MeetNotFound />;

  if (isRoomPassword)
    return (
      <PasswordModal meetId={meetId} setIsRoomPassword={setIsRoomPassword} />
    );

  return <>{meet && <Meet meetInfo={meet} />}</>;
};

export default MeetPage;
