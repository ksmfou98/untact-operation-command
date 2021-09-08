interface IWebRTCUser {
  id: string;
  stream: MediaStream;
  muted: boolean;
  videoOff: boolean;
}
