import React, { useEffect } from "react";
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

  const divisor = useMemo(() => {
    return Math.ceil(Math.sqrt(users.length)) || 1;
  }, [users.length]);

  useLayoutEffect(() => {
    const gridWidth = sidebarOpen
      ? document.body.offsetWidth - 320
      : document.body.offsetWidth;
    setItemWidth(gridWidth / divisor);
  }, [divisor, sidebarOpen]);

  return (
    <Grid ref={ref}>
      {users.map((user, index) => {
        const remainder = users.length % divisor;
        const isLastRow = index >= users.length - remainder;
        return (
          <MeetGridItem
            key={index}
            isLastRow={isLastRow}
            stream={user.stream}
            width={itemWidth}
          />
        );
      })}
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
