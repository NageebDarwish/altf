import { useEffect, useRef } from "react";
import Pusher from "pusher-js";

const PostPusherCustom = (channelName, eventName, callback) => {
  const pusherRef = useRef(null);
  const channelRef = useRef(null);

  useEffect(() => {
    if (!pusherRef.current) {
      pusherRef.current = new Pusher("19aade7e0b3022777714", {
        cluster: "ap1",
        encrypted: true,
      });
    }

    if (!channelRef.current) {
      channelRef.current = pusherRef.current.subscribe(channelName);
      channelRef.current.bind(eventName, callback);
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unbind(eventName, callback);
        pusherRef.current.unsubscribe(channelName);
        channelRef.current = null;
      }
    };
  }, [channelName, eventName, callback]);

  return pusherRef.current;
};

export default PostPusherCustom;