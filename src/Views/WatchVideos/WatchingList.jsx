import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import WatchPlayListSeries from "./WatchPlayListSeries";
import WatchVideoDetails from "./WatchVideoDetails";

import { FaLock } from "react-icons/fa";
import axios from "axios";


const WatchingList = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const isWatchRoute = location.pathname.startsWith("/watch/");
  const { state } = useLocation();
  const { id } = useParams();
  console.log(id, "location");
  const { video, type, series } = location.state || {};

  const user = useSelector((state) => state.user);
  const vid = useSelector((state) => state.video.video_data);
  const vid_timeline = useSelector((state) => state.video.video_timeline);
  const filteredSeries = Array?.isArray(series?.videos)
    ? series?.videos?.filter((video) => video?.id === Number(id))
    : [];
  const filteredWatch = filteredSeries[0]?.video;
  const filteredPripume = filteredSeries[0]?.plan;
  console.log(filteredPripume, "filteredPripume")
  console.log("filteredWatch", filteredWatch);

  const videoUrl = `https://www.youtube.com/watch?v=${video.video}`;
  const [played, setPlayed] = useState(state?.video?.timelines?.watched_time);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(timer);
  const playerRef = useRef(null);
  // const [series, setSeries] = useState([]);

  console.log(id, series, video)

  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);
  const dispatch = useDispatch();
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getSeriesData = async () => {
    await axios
      .get(`${import.meta.env.VITE_REACT_APP_URL}api/series/list`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      })
      .then((result) => {
        // console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateTimeLine = async () => {
    if (isWatchRoute && user.isAuthenticated) {
      const formData = new FormData();
      if (state?.type === "video") {
        formData.append("video_id", state?.video?.id);
      } else if (state?.type === "series") {
        formData.append("series_video_id", state?.video?.id);
      }
      formData.append("watched_time", vid_timeline?.watched_time);
      formData.append("type", state?.type);
      const res = axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}api/timeline/video`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,

          },
        }
      );
    }
  };
  const upDateGoalData = async () => {
    const date = getCurrentDate();

    try {

      const result = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL
        }api/update/goal?date=${date}&completed_minutes=${timerRef.current}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Goal updated:", result.data);
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  };
  useEffect(() => {
    return () => {
      updateTimeLine();
      if (user.isAuthenticated) {
        upDateGoalData();
      }
    };
  }, [updateTimeLine, upDateGoalData, user.isAuthenticated]);
  useEffect(() => {
    let timerInterval;

    if (isPlaying) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isPlaying]);

  useEffect(() => {
    getSeriesData();
  }, [getSeriesData]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {

    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleProgress = (progress) => {
    if (!isPlaying) return;
    if (progress >= 0.99) {
      progress = 0;
    }
    const video_data = {
      watched_time: progress,
      video_id: id,
    };
    dispatch({
      type: "ADD_VIDEO_DATA",
      payload: video_data,
    });
    setPlayed(progress);
  };

  const handleReady = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(played, "fraction");
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // onPlay && onPlay();
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (user.isAuthenticated) {
      upDateGoalData();
    }
    dispatch({
      type: "ADD_VIDEO_WATCH_TIME",
      payload: { watched_time: timer },
    });
    // setPlayed(timer);
  };

  const handleVideoSelect = () => {
    dispatch({
      type: "ADD_VIDEO_WATCH_TIME",
      payload: { video_id: id, watched_time: 0 },
    });
    setTimer(0);
  };

  useEffect(() => {
    handleVideoSelect();
  }, [id, handleVideoSelect]);


  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSelectVideo = (video) => {
    setSelectedVideo(video);
  };



  return (
    <Box sx={{ height: "90vh", p: 2, display: "flex", gap: 3 }}>
      <Box sx={{ width: "100%", borderRadius: 2, position: "relative" }} flex={3}>

        {filteredPripume === "premium" && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 2,
              height: "300px",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
                alignItems: "center",
              }}
            >
              <FaLock style={{ marginRight: 8 }} />
              Premium
            </Typography>
          </Box>
        )}

        {selectedVideo ? (
          <div>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${selectedVideo.video}`}
              ref={playerRef}
              playing={filteredPripume !== "premium"}
              controls={filteredPripume !== "premium"}
              onProgress={({ played }) => handleProgress(played)}
              onPlay={handlePlay}
              onPause={handlePause}
              progressInterval={1000}
              onReady={handleReady}
              width="100%"
              height="300px"
            />
          </div>
        ) : (
          <div>
            <ReactPlayer
              url={videoUrl}
              ref={playerRef}
              playing={false}
              controls={true}
              progressInterval={1000}
              onReady={handleReady}
              width="100%"
              height="300px"
            />
          </div>
        )}


        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: "100%",

            height: "5px",
            backgroundColor: "#f1f1f1",
          }}
        >
          <Box
            sx={{
              width: `${played * 100}%`,
              height: "100%",
              backgroundColor: "red",
            }}
          />
        </Box>
        {selectedVideo ? (
                  <WatchVideoDetails state={selectedVideo} />

        ) : (
          <WatchVideoDetails state={state?.video} />

        )}


      </Box>

      <WatchPlayListSeries
        state={state}
        series={series}
        ModalGetVedio={video}
        onSelectVideo={handleSelectVideo}
      />

    </Box>
  );
};

export default WatchingList;
