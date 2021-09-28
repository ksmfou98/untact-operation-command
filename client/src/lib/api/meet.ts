import { IMeetState } from "atoms/meetState";
import client from "./client";

export const createMeetAPI = async (body: IMeetState) => {
  // IMeet 인터페이스 생성후 교체
  const response = await client.post(`/meet/create`, body);
  return response.data.meet;
};
