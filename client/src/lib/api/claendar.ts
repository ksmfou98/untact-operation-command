import client from "./client";

// 일정 목록 조회
export const readScheduleLinstAPI = async () => {
  const response = await client.get("/calendar/readSchedule/");
  return response.data.schedules;
};

// 일정 추가
export const createScheduleAPI = async (
  title: string,
  date: string,
  start: string,
  end?: string
) => {
  const body = {
    title,
    date,
    start,
    end,
  };
  const response = await client.post("/calendar/createSchedule/", body);
  console.log(response.data);
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
  date: Date,
  start: number,
  scheduleId: string,
  end?: number
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
