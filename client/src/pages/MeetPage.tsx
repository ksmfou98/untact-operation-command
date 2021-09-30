import Loading from "components/common/Loading";
import Meet from "components/meet/Meet";
import MeetNotFound from "components/meet/MeetNotFound";
import useFindMeet from "hooks/meet/useFindMeet";
import React from "react";

const MeetPage = () => {
  const { loading, exist } = useFindMeet();

  if (loading) return <Loading />;
  if (!exist) return <MeetNotFound />;

  return <Meet />;
};

export default MeetPage;
