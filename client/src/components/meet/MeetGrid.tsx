import React from "react";
import { useLayoutEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import MeetGridItem from "components/meet/MeetGridItem";

interface MeetGridProps {
  users: IWebRTCUser[];
  sidebarOpen: boolean;
}

function MeetGrid({ users, sidebarOpen }: MeetGridProps) {
  const [itemWidth, setItemWidth] = useState(0);
  const ref = useRef<any>();

  console.log(users);

  const divisor = useMemo(() => {
    return Math.ceil(Math.sqrt(users.length)) || 1;
  }, [users.length]);

  useLayoutEffect(() => {
    const gridWidth = sidebarOpen
      ? document.body.offsetWidth - 420
      : document.body.offsetWidth - 100;
    setItemWidth(gridWidth / divisor);
  }, [divisor, sidebarOpen]);

  return (
    <Grid ref={ref}>
      {users.map((user, index) => (
        <MeetGridItem
          key={index}
          stream={user.stream}
          muted={true}
          width={itemWidth}
        />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: black;
  flex-wrap: wrap;
  justify-content: center;
`;

export default MeetGrid;
