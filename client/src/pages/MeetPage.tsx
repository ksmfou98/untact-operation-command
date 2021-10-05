import { userState } from "atoms/userState";
import AuthError from "components/auth/AuthError";
import Loading from "components/common/Loading";
import Meet from "components/meet/Meet";
import MeetNotFound from "components/meet/MeetNotFound";
import useFindMeet from "hooks/meet/useFindMeet";
import React from "react";
import { useRecoilValue } from "recoil";

const MeetPage = () => {
  const { loading, exist, meet } = useFindMeet();
  const user = useRecoilValue(userState);

  if (!user._id) return <AuthError />;
  if (loading) return <Loading />;
  if (!exist) return <MeetNotFound />;

  return <>{meet && <Meet meetInfo={meet} />}</>;
};

export default MeetPage;
