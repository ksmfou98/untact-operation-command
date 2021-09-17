import ChannelService from "lib/ChannelService";
import { useEffect } from "react";

export default function useChannelPluginEffect() {
  useEffect(() => {
    ChannelService.boot({
      pluginKey: "84990ec9-1a13-452b-aa08-7b799362940e", //please fill with your plugin key
      //   memberId: "유저ID",
      //   profile: {
      //     name: "유저Name",
      //     email: "유저Email",
      //     id: "유저ID",
      //   },
    });
  }, []);
}
