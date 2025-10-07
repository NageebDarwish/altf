import { useRef, useState } from "react";

const VideoPlayer = ({ video }) => {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const iframeWindow = iframeRef.current.contentWindow;
    if (isPlaying) {
      iframeWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    } else {
      iframeWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full">
      {/* Embedded iframe for video */}
      <iframe
        ref={iframeRef}
        className="rounded-lg w-full"
        src={`https://www.youtube.com/embed/${video.video}?enablejsapi=1`}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
