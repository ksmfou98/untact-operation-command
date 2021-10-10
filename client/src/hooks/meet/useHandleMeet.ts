import { meetState } from "atoms/meetState";
import { IUserState, userState } from "atoms/userState";
import { createMeetAPI, meetThumbnailAPI } from "lib/api/meet";
import { useHistory } from "react-router";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

export default function useHandleMeet() {
  const [meetForm, setMeetForm] = useRecoilState(meetState);
  const { title, description, thumbnail, password, menu, muted, videoOff } =
    meetForm;
  const history = useHistory();
  const resetMeetState = useResetRecoilState(meetState);

  const user = useRecoilValue(userState) as IUserState;

  const onThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetForm((prev) => ({ ...prev, thumbnail: e.target.value }));

    if (e.target.files !== null) {
      const fd = new FormData();
      fd.append("meetThumb_img", e.target.files[0]);

      try {
        const image = await meetThumbnailAPI(fd);
        setMeetForm((prev) => ({ ...prev, thumbnail: image }));
      } catch (e) {
        alert("이미지 업로드에 실패했습니다.");
      }
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
    const host = user._id;
    try {
      const meet = await createMeetAPI(
        host,
        title,
        description,
        thumbnail,
        password,
        menu,
        muted,
        videoOff
      );
      resetMeetState();
      history.push(`/meet/${meet._id}`);
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
    onThumbnailUpload,
  };
}
