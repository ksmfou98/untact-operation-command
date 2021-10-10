import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MediaSetting = () => {
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

  const onChangeAudio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const audio = e.target.value;
    console.log(audio);
  };

  const onChangeSpeaker = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const speaker = e.target.value;
    console.log(speaker);
  };

  return (
    <MediaSettingBlock>
      <div>
        <label>마이크</label>
        <select onChange={onChangeAudio}>
          {audios?.map((audio) => (
            <option key={audio.deviceId} value={audio.deviceId}>
              {audio.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>스피커</label>
        <select onChange={onChangeSpeaker}>
          {speakers?.map((speaker) => (
            <option key={speaker.deviceId} value={speaker.deviceId}>
              {speaker.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>비디오</label>
        <select>
          {videos?.map((video) => (
            <option key={video.deviceId} value={video.deviceId}>
              {video.label}
            </option>
          ))}
        </select>
      </div>
    </MediaSettingBlock>
  );
};

const MediaSettingBlock = styled.div``;

export default MediaSetting;
