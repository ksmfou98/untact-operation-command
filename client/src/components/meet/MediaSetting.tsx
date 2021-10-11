import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface MediaSettingProps {
  onChangeVideo: (videoId: string) => void;
  onChangeAudio: (audioId: string) => void;
}

const MediaSetting = ({ onChangeVideo, onChangeAudio }: MediaSettingProps) => {
  const [videos, setVideos] = useState<MediaDeviceInfo[]>();
  const [audios, setAudios] = useState<MediaDeviceInfo[]>();
  const [speakers, setSpeakers] = useState<MediaDeviceInfo[]>();

  useEffect(() => {
    async function getConnectedDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      const audioDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );
      const speakerDevices = devices.filter(
        (device) => device.kind === "audiooutput"
      );
      setVideos(videoDevices);
      setAudios(audioDevices);
      setSpeakers(speakerDevices);
    }

    getConnectedDevices();
  }, []);

  const onChangeAudioId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const audioId = e.target.value;
    onChangeAudio(audioId);
  };

  const onChangeSpeakerId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speaker = e.target.value;
    console.log(speaker);
  };

  const onChangeVideoId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const videoId = e.target.value;
    onChangeVideo(videoId);
  };

  return (
    <MediaSettingBlock>
      <MediaList>
        <label>마이크</label>
        <select onChange={onChangeAudioId}>
          {audios?.map((audio) => (
            <option key={audio.deviceId} value={audio.deviceId}>
              {audio.label}
            </option>
          ))}
        </select>
      </MediaList>
      <MediaList>
        <label>스피커</label>
        <select onChange={onChangeSpeakerId}>
          {speakers?.map((speaker) => (
            <option key={speaker.deviceId} value={speaker.deviceId}>
              {speaker.label}
            </option>
          ))}
        </select>
      </MediaList>
      <MediaList>
        <label>비디오</label>
        <select onChange={onChangeVideoId}>
          {videos?.map((video) => (
            <option key={video.deviceId} value={video.deviceId}>
              {video.label}
            </option>
          ))}
        </select>
      </MediaList>
    </MediaSettingBlock>
  );
};

const MediaSettingBlock = styled.div``;

const MediaList = styled.div`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 6px;
    font-size: 14px;
  }
  select {
    margin-bottom: 8px;
    border: 1px solid #d1d0d0;
    padding: 10px 5px;
    outline: none;
  }
`;

export default MediaSetting;
