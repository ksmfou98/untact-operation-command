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

  return (
    <MediaSettingBlock>
      <div>
        <label>마이크</label>
        <ul>
          {audios?.map((audio) => (
            <li key={audio.deviceId}>
              <input type="radio" name="mic" value={audio.deviceId} />
              {audio.label}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>스피커</label>
        <ul>
          {speakers?.map((speaker) => (
            <li key={speaker.deviceId}>
              <input type="radio" name="speaker" value={speaker.deviceId} />
              {speaker.label}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label>비디오</label>
        <ul>
          {videos?.map((video) => (
            <li key={video.deviceId}>
              <input type="radio" name="video" value={video.deviceId} />
              {video.label}
            </li>
          ))}
        </ul>
      </div>
    </MediaSettingBlock>
  );
};

const MediaSettingBlock = styled.div``;

export default MediaSetting;
