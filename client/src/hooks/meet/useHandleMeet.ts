import { meetState } from "atoms/meetState";
import { IUserState, userState } from "atoms/userState";
import { createMeetAPI } from "lib/api/meet";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

export default function useHandleMeet() {
  const [meetForm, setMeetForm] = useRecoilState(meetState);
  const resetMeet = useResetRecoilState(meetState);
  const user = useRecoilValue(userState) as IUserState;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeetForm((prev) => ({ ...prev, [name]: value }));
  };

  const onToggleMuted = () => {
    setMeetForm((prev) => ({ ...prev, muted: !prev.muted }));
  };

  const onToggleVideoOff = () => {
    setMeetForm((prev) => ({ ...prev, videoOff: !prev.videoOff }));
  };

  const onCreateMeet = async () => {
    const body = { ...meetForm, host: user._id };
    try {
      await createMeetAPI(body);
      resetMeet();
    } catch (e) {
      alert("미팅 생성에 실패했습니다.");
    }
  };

  return {
    meetForm,
    onChange,
    onToggleMuted,
    onToggleVideoOff,
    onCreateMeet,
  };
}
