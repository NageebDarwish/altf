import { Box } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WatchPlayListSeries from "./WatchPlayListSeries";
import WatchVideoDetails from "./WatchVideoDetails";
import axios from "axios";
import CommentSection from "./CommentSection";
import { createApiUrl, API_ENDPOINTS } from "../../config/api";

const Watch = () => {
  const location = useLocation();
  const isWatchRoute = location.pathname.startsWith("/dashboard/watch/");
  const { state } = useLocation();
  const usersid = useSelector((state) => state.user.user);
  const userId = usersid?.id;
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const vid = useSelector((state) => state.video.video_data);
  const vid_timeline = useSelector((state) => state.video.video_timeline);

  const initialVideo = state?.video;
  let initialUserTimeline;

  if (state.type === "video") {
    initialUserTimeline = initialVideo?.timelines?.find(
      (data) => data.user_id === String(userId)
    );
  } else {
    initialUserTimeline = initialVideo?.timeline?.find(
      (data) => data.user_id === String(userId)
    );
  }


  const initialSavedTimeSeconds =
    parseFloat(initialUserTimeline?.progress_time) || 0;
  const initialDuration = parseFloat(initialVideo?.duration_seconds) || 1;
  const initialPlayed =
    initialSavedTimeSeconds > 0
      ? Math.min(initialSavedTimeSeconds / initialDuration, 0.99)
      : 0;


  const [hasSeeked, setHasSeeked] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const videoCompletedRef = useRef(false);
  const [currentVideoId, setCurrentVideoId] = useState(id);
  const [checked, setChecked] = useState(false);

  const videoUrl = `https://www.youtube.com/watch?v=${currentVideoId}`;
  const [played, setPlayed] = useState(0); // Start at 0, will be set in handleReady
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [timer, setTimer] = useState(0);
  // Progress time in seconds
  const [progressTimeSeconds, setProgressTimeSeconds] = useState(
    initialSavedTimeSeconds
  );
  const progressTimeSecondsRef = useRef(initialSavedTimeSeconds);

  const lastUpdateTimeRef = useRef(0);
  const [videoProgress, setVideoProgress] = useState({});

  const videoList =
    state?.type === "series" ? state?.allVideos : state?.newvideo;

  const timerRef = useRef(timer);
  const playerRef = useRef(null);
  const endedRef = useRef(false);
  const [videoDuration, setVideoDuration] = useState(initialDuration);
  const previousPlayedRef = useRef(0);

  // New refs to track actual watched time more accurately
  const lastProgressTimeRef = useRef(0);
  const sessionWatchedTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  // Store current video data for timeline updates
  const currentVideoDataRef = useRef({
    video_id: currentVideoId,
    watched_time: 0,
    is_completed: 0,
    progress_time: initialSavedTimeSeconds,
  });

  const [video_data, setVideoData] = useState({
    watched_time: 0,
    video_id: currentVideoId,
    is_completed: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);

  useEffect(() => {
    progressTimeSecondsRef.current = progressTimeSeconds;
  }, [progressTimeSeconds]);

  useEffect(() => {
    videoCompletedRef.current = videoCompleted;
  }, [videoCompleted]);

  const dispatch = useDispatch();

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getSeriesData = async () => {
    try {
      await axios.get(createApiUrl(API_ENDPOINTS.series.list), {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
    } catch (err) {
      console.error("Error fetching series data:", err);
    }
  };

  const updateTimeLine = useCallback(async () => {
    if (!isWatchRoute || !user.isAuthenticated) return;

    // Only update if we have meaningful progress to report
    if (
      sessionWatchedTimeRef.current < 1 &&
      currentVideoDataRef.current.is_completed === 0
    ) {
      return;
    }

    const formData = new FormData();
    const currentVideo = selectedVideo || state?.video;
    const currentVideoIdForApi = selectedVideo
      ? selectedVideo.id
      : state?.video?.id || currentVideoId;

    if (state?.type === "video") {
      formData.append("video_id", currentVideoIdForApi);
    } else if (state?.type === "series") {
      formData.append("series_id", state?.videodata?.id);
      const seriesVideoId = selectedVideo
        ? selectedVideo.id
        : state?.video?.id || currentVideoId;
      formData.append("series_video_id", seriesVideoId);
    }

    const currentData = currentVideoDataRef.current;
    const progressTimeInSeconds = Math.round(currentData.progress_time);
    const watchedTimeInSeconds = sessionWatchedTimeRef.current || 0;
    const progressToSend = progressTimeInSeconds;

    formData.append("watched_time", watchedTimeInSeconds.toFixed(0));
    formData.append("is_completed", currentData.is_completed.toString());
    formData.append("type", state?.type);
    formData.append("progress_time", progressToSend.toString());

    try {
      const res = await axios.post(
        createApiUrl(API_ENDPOINTS.timeline.video),
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating timeline:", error);
    }
  }, [isWatchRoute, user, state, selectedVideo, currentVideoId]);

  const upDateGoalData = async () => {
    const date = getCurrentDate();
    const minutes = Math.floor(timerRef.current);

    try {
      const result = await axios.post(
        createApiUrl(`update/goal?date=${date}&completed_minutes=${minutes}`),
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to update goal:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (user.isAuthenticated) {
        updateTimeLine();
        upDateGoalData();
      }
    };
  }, [currentVideoId, selectedVideo]);

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
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      updateTimeLine();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleProgress = (progress) => {
    if (!videoDuration) return;

    const currentTimeSeconds = progress * videoDuration;

    setProgressTimeSeconds(currentTimeSeconds);
    progressTimeSecondsRef.current = currentTimeSeconds;

    if (videoCompletedRef.current && progress < 0.1) {
      console.log(
        "Video restarted after completion - resetting completion flag"
      );
      setVideoCompleted(false);
      videoCompletedRef.current = false;
    }

    const watchedPercentage = progress * 100;
    const isCompleted = watchedPercentage >= 98 ? 1 : 0;

    if (watchedPercentage >= 98 && !videoCompletedRef.current) {
      setVideoCompleted(true);
      videoCompletedRef.current = true;
      console.log("Video marked as completed");
    }

    setVideoProgress((prev) => ({
      ...prev,
      [currentVideoId]: progress,
    }));

    if (isPlaying && !isSeekingRef.current) {
      const timeDifference = currentTimeSeconds - lastProgressTimeRef.current;
      const isReasonableProgression = timeDifference > 0 && timeDifference <= 2;

      if (isReasonableProgression) {
        sessionWatchedTimeRef.current += timeDifference;
      }
    }

    lastProgressTimeRef.current = currentTimeSeconds;
    const videoIdForUpdate = selectedVideo ? selectedVideo.id : currentVideoId;

    currentVideoDataRef.current = {
      video_id: selectedVideo ? selectedVideo.id : currentVideoId,
      watched_time: sessionWatchedTimeRef.current,
      is_completed: isCompleted,
      progress_time: currentTimeSeconds,
    };

    setVideoData({
      watched_time: sessionWatchedTimeRef.current,
      video_id: currentVideoId,
      is_completed: isCompleted,
      progress_time: currentTimeSeconds,
    });

    dispatch({
      type: "ADD_VIDEO_DATA",
      payload: {
        watched_time: progress,
        video_id: currentVideoId,
        is_completed: isCompleted,
      },
    });

    setPlayed(progress);
    previousPlayedRef.current = progress;
  };

  const handleSeek = (seekTo) => {
    isSeekingRef.current = true;

    setTimeout(() => {
      isSeekingRef.current = false;
      lastProgressTimeRef.current = seekTo * videoDuration;
    }, 100);
  };

  // Fix: Improved handleReady function
  const handleReady = () => {
    if (!playerRef.current) return;

    const currentVideo = selectedVideo || state?.video;
    let currentVideoTimeline = null;

    if (state.type === "video") {
      // Expecting `timelines` array
      const timelines = selectedVideo?.timelines || state?.video?.timelines;
      if (Array.isArray(timelines)) {
        currentVideoTimeline = timelines.find(
          (timeline) => String(timeline.user_id) === String(userId)
        );
      }
    } else {
      // Expecting `timeline` as object (not array)
      const timeline = selectedVideo?.timeline || state?.video?.timeline;
      if (
        timeline &&
        typeof timeline === "object" &&
        String(timeline.user_id) === String(userId)
      ) {
        currentVideoTimeline = timeline;
      }
    }

    console.log("handleReady → currentVideoTimeline:", currentVideoTimeline);

    if (
      currentVideoTimeline?.progress_time &&
      !hasSeeked &&
      playerRef.current
    ) {
      const seekTo = parseFloat(currentVideoTimeline.progress_time);
      if (!isNaN(seekTo)) {
        playerRef.current.seekTo(seekTo, "seconds");
        setHasSeeked(true);
        console.log(`⏩ Seeked to ${seekTo} seconds`);
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    lastUpdateTimeRef.current = Date.now();
  };

  const handlePause = () => {
    setIsPlaying(false);
    dispatch({
      type: "ADD_VIDEO_WATCH_TIME",
      payload: { watched_time: timer },
    });
  };


  // Fix: Improved useEffect for video ID changes
  useEffect(() => {
    setCurrentVideoId(id);
    setHasSeeked(false);
    endedRef.current = false;

    // Get the correct video data and timeline
    const currentVideo = state?.video;
    let currentVideoTimeline;
    if (state.type === "video") {
      currentVideoTimeline = currentVideo?.timelines?.find(
        (timeline) => timeline.user_id === String(userId)
      );
    } else {
      currentVideoTimeline = currentVideo?.timeline?.find(
        (timeline) => timeline.user_id === String(userId)
      );
    }

    const savedTimeSeconds =
      parseFloat(currentVideoTimeline?.progress_time) || 0;
    const duration = parseFloat(currentVideo?.duration_seconds) || 1;

    setPlayed(0); // Start at 0, will be set properly in handleReady
    setProgressTimeSeconds(savedTimeSeconds);
    progressTimeSecondsRef.current = savedTimeSeconds;
    setVideoDuration(duration);

    sessionWatchedTimeRef.current = 0;
    lastProgressTimeRef.current = 0;

    currentVideoDataRef.current = {
      video_id: id,
      watched_time: 0,
      is_completed: 0,
      progress_time: savedTimeSeconds,
    };

    setVideoData({
      watched_time: 0,
      video_id: id,
      is_completed: 0,
    });

    previousPlayedRef.current = 0;

    // Call handleVideoSelect with the correct video ID
    dispatch({
      type: "ADD_VIDEO_WATCH_TIME",
      payload: { video_id: id, watched_time: 0 },
    });
    setTimer(0);
    setVideoCompleted(false);
    videoCompletedRef.current = false;
  }, [id, userId, state, dispatch]);

  const markVideoAsWatched = async (isCompleted) => {
    const type = isCompleted ? "add" : "remove";

    try {
      const response = await axios.get(
        "https://admin.arabicallthetime.com/api/watched/video/store",
        {
          params: {
            video_id: currentVideoId,
            type: type,
          },
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(
        `Video ${type === "add" ? "added to" : "removed from"} watched list:`,
        response.data
      );
    } catch (error) {
      console.error(
        `Error ${
          type === "add" ? "adding" : "removing"
        } video from watched list:`,
        error
      );
    }
  };
  useEffect(() => {
    endedRef.current = false;
  }, [id, selectedVideo]);

  // Fix: Improved handleSelectVideo function
  const handleSelectVideo = useCallback(
    (video, timeline) => {
      console.log("Selecting video:", video);

      // Only update if video is actually changing
      if (selectedVideo?.id !== video.id) {
        // Get the timeline for the selected video
        const userTimeline =
          state.type === "video"
            ? Array.isArray(video?.timelines)
              ? video.timelines.find((t) => t.user_id === String(userId))
              : null
            : Array.isArray(video?.timeline)
            ? video.timeline.find((t) => t.user_id === String(userId))
            : null;

        console.log("Selected video timeline:", userTimeline);

        const duration = parseFloat(video.duration_seconds) || 1;
        const savedProgressTimeSeconds =
          parseFloat(userTimeline?.progress_time) || 0;

        console.log(
          "Selected video - duration:",
          duration,
          "savedProgress:",
          savedProgressTimeSeconds
        );

        setCurrentVideoId(video.video);
        setSelectedVideo(video);
        setVideoDuration(duration);

        // Reset session data
        sessionWatchedTimeRef.current = 0;
        lastProgressTimeRef.current = savedProgressTimeSeconds;

        currentVideoDataRef.current = {
          video_id: video.id,
          watched_time: 0,
          is_completed: userTimeline?.is_completed || 0,
          progress_time: savedProgressTimeSeconds,
        };

        setVideoData({
          watched_time: 0,
          video_id: video.id,
          is_completed: userTimeline?.is_completed || 0,
        });

        const initialProgress =
          savedProgressTimeSeconds > 0
            ? Math.min(savedProgressTimeSeconds / duration, 0.99)
            : 0;

        setPlayed(initialProgress);
        setTimer(0);
        setProgressTimeSeconds(savedProgressTimeSeconds);
        progressTimeSecondsRef.current = savedProgressTimeSeconds;
        previousPlayedRef.current = 0;
        endedRef.current = false;
        setHasSeeked(false);
        setVideoCompleted(false);
        videoCompletedRef.current = false;
      }
    },
    [state.type, userId]
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const firstselectedvideo = location.state.video.id;

  const getNextVideo = useCallback(() => {
    if (!videoList || videoList.length === 0) return null;

    const publicVideos =
      videoList.filter((video) => video.status === "public") || [];
    const currentVideoIndex = publicVideos.findIndex((video) =>
      selectedVideo
        ? video.id === selectedVideo.id
        : video.video === currentVideoId
    );

    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < publicVideos.length) {
      return publicVideos[nextIndex];
    }

    return null;
  }, [videoList, selectedVideo, currentVideoId]);

  const handleEnded = useCallback(() => {
    console.log("Video ended");
    updateTimeLine();
    setVideoCompleted(true);
    videoCompletedRef.current = true;

    if (user.isAuthenticated && !endedRef.current) {
      endedRef.current = true;
      markVideoAsWatched();
    }

    if (checked) {
      const nextVideo = getNextVideo();
      if (nextVideo) {
        setTimeout(() => {
          handleSelectVideo(nextVideo);
        }, 1000);
      }
    }
  }, [
    user.isAuthenticated,
    currentVideoId,
    checked,
    getNextVideo,
    handleSelectVideo,
  ]);

  return (
    <Box
      sx={{
        p: { xs: 0, lg: 1 },
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        gap: { xs: 0, md: 4 },
        marginTop: { xs: "40px", md: "0px" },
      }}
    >
      <Box sx={{ width: "100%", borderRadius: 2 }} flex={3}>
        {selectedVideo ? (
          <div>
            <ReactPlayer
              ref={playerRef}
              url={`https://www.youtube.com/watch?v=${selectedVideo.video}`}
              playing={true}
              controls
              onProgress={({ played }) => handleProgress(played)}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onSeek={(seconds) => handleSeek(seconds / videoDuration)}
              progressInterval={1000}
              onReady={handleReady}
              onDuration={(duration) => setVideoDuration(duration)}
              width="100%"
              height="400px"
              style={{ borderRadius: "10px" }}
              config={{
                youtube: {
                  playerVars: {
                    origin: window.location.href,
                    enablejsapi: 1,
                  },
                },
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              maxWidth: "100%",
              borderRadius: { xs: "", md: "10px" },
              overflow: "hidden",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              playing={true}
              controls
              onProgress={({ played }) => handleProgress(played)}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onSeek={(seconds) => handleSeek(seconds / videoDuration)}
              progressInterval={1000}
              onReady={handleReady}
              onDuration={(duration) => setVideoDuration(duration)}
              width="100%"
              height="100%"
            />
          </div>
        )}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            width: { xs: "", md: "100%" },
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
          <>
            <WatchVideoDetails
              state={selectedVideo}
              contentType={location.state.type}
            />
          </>
        ) : (
          <>
            <WatchVideoDetails
              state={state?.video}
              contentType={location.state.type}
            />
          </>
        )}

        {selectedVideo ? (
          <>
            <CommentSection
              video={selectedVideo}
              contentType={location.state.type}
            />
          </>
        ) : (
          <>
            <Box>
              {location.state.type == "series" ? (
                <CommentSection
                  video={location?.state?.videodata}
                  contentType={location.state.type}
                />
              ) : (
                <CommentSection
                  video={location?.state?.video}
                  contentType={location.state.type}
                />
              )}
            </Box>
          </>
        )}
      </Box>

      <WatchPlayListSeries
        state={videoList}
        onSelectVideo={useCallback(
          (video, timeline) => {
            updateTimeLine(); // Call this first to save previous video progress
            handleSelectVideo(video, timeline);
          },
          [updateTimeLine, handleSelectVideo]
        )}
        firstselectedvideo={firstselectedvideo}
        videoProgress={videoProgress}
        contentType={location.state.type}
        playlistname={location.state.video.title}
        series={location.state}
        checked={checked}
        onAutoplayChange={(value) => setChecked(value)}
        currentVideoId={currentVideoId}
        userId={userId}
      />
    </Box>
  );
};

export default Watch;
