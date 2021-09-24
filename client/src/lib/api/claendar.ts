import client from "../../hooks/common/client";

// 일정 목록 조회
export const readScheduleLinstAPI = async () => {
  const response = await client.get("/calendar/readSchedule/");
  return response.data.schedules;
};

// 일정 추가
export const createScheduleAPI = async (
  title: string,
  start: Date,
  end?: Date
) => {
  const body = {
    title,
    start,
    end,
  };
  const response = await client.post("/calendar/createSchedule/", body);
  return response;
};

// 일정 삭제
export const deleteScheduleAPI = async (scheduleId: string) => {
  const response = await client.delete(
    `/calendar/createSchedule/${scheduleId}`
  );
  return response.data.schedules;
};

// 일정 수정
export const updateScheduleAPI = async (
  title: string,
  start: Date,
  scheduleId: string,
  end?: Date
) => {
  const body = {
    title,
    start,
    scheduleId,
    end,
  };
  const response = await client.patch("/calendar/updateSchedule/", body);
  return response.data.schedules;
};
