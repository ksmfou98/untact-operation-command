import client from "./client";

export const createMeetAPI = async (
  host: string,
  title: string,
  description: string,
  thumbnail: string,
  password: string,
  menu: string,
  muted: boolean,
  videoOff: boolean
) => {
  const body = {
    host,
    title,
    description,
    thumbnail,
    password,
    menu,
    muted,
    videoOff,
  };
  const response = await client.post(`/meet/create`, body);
  return response.data.meet;
};

export const readMeetListAPI = async () => {
  const response = await client.get(`/meet/readMeetList`);
  return response.data.meets;
};

export const meetThumbnailAPI = async (fd: FormData) => {
  const response = await client.post(`/meet/uploadMeetThumb`, fd);
  return response.data.image;
};

export const findMeetAPI = async (meetId: string) => {
  const response = await client.get(`/meet/findMeet/${meetId}`);
  return response.data;
};

export const meetCheckPasswordAPI = async (
  meetId: string,
  password: string
) => {
  const body = { meetId, password };
  const response = await client.post(`/meet/checkPassword`, body);

  return response.data;
};
