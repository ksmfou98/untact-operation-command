interface IWebRTCUser {
  id: string;
  stream: MediaStream;
  name: string;
  muted: boolean;
  videoOff: boolean;
}
