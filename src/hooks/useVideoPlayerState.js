import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to manage video player state
 * Consolidates multiple useState declarations for video playback
 */
export const useVideoPlayerState = (initialSavedTimeSeconds = 0, initialDuration = 1) => {
  // Video playback state
  const [playbackState, setPlaybackState] = useState({
    played: 0,
    isPlaying: false,
    timer: 0,
    progressTimeSeconds: initialSavedTimeSeconds,
    videoProgress: {},
    videoDuration: initialDuration,
    hasSeeked: false,
    videoCompleted: false,
    currentVideoId: null,
  });

  // Video data state
  const [videoData, setVideoData] = useState({
    selectedVideo: null,
    video_data: {
      watched_time: 0,
      video_id: null,
      is_completed: 0,
    },
    checked: false,
  });

  // Refs for video player
  const refs = {
    timerRef: useRef(0),
    playerRef: useRef(null),
    endedRef: useRef(false),
    videoCompletedRef: useRef(false),
    progressTimeSecondsRef: useRef(initialSavedTimeSeconds),
    lastUpdateTimeRef: useRef(0),
    lastProgressTimeRef: useRef(0),
    sessionWatchedTimeRef: useRef(0),
    isSeekingRef: useRef(false),
    previousPlayedRef: useRef(0),
    currentVideoDataRef: useRef({
      video_id: null,
      watched_time: 0,
      is_completed: 0,
      progress_time: initialSavedTimeSeconds,
    }),
  };

  // Update refs when state changes
  useEffect(() => {
    refs.timerRef.current = playbackState.timer;
  }, [playbackState.timer]);

  useEffect(() => {
    refs.progressTimeSecondsRef.current = playbackState.progressTimeSeconds;
  }, [playbackState.progressTimeSeconds]);

  useEffect(() => {
    refs.videoCompletedRef.current = playbackState.videoCompleted;
  }, [playbackState.videoCompleted]);

  // State setters
  const updatePlaybackState = (updates) => {
    setPlaybackState(prev => ({ ...prev, ...updates }));
  };

  const updateVideoData = (updates) => {
    setVideoData(prev => ({ ...prev, ...updates }));
  };

  // Specific setters for common operations
  const setPlayed = (played) => updatePlaybackState({ played });
  const setIsPlaying = (playing) => updatePlaybackState({ isPlaying: playing });
  const setTimer = (timer) => updatePlaybackState({ timer });
  const setProgressTimeSeconds = (seconds) => updatePlaybackState({ progressTimeSeconds: seconds });
  const setVideoProgress = (progress) => updatePlaybackState({ videoProgress: progress });
  const setVideoDuration = (duration) => updatePlaybackState({ videoDuration: duration });
  const setHasSeeked = (seeked) => updatePlaybackState({ hasSeeked: seeked });
  const setVideoCompleted = (completed) => updatePlaybackState({ videoCompleted: completed });
  const setCurrentVideoId = (id) => updatePlaybackState({ currentVideoId: id });
  
  const setSelectedVideo = (video) => updateVideoData({ selectedVideo: video });
  const setVideoDataState = (data) => updateVideoData({ video_data: data });
  const setChecked = (checked) => updateVideoData({ checked });

  // Helper functions
  const resetVideoState = () => {
    setPlaybackState({
      played: 0,
      isPlaying: false,
      timer: 0,
      progressTimeSeconds: initialSavedTimeSeconds,
      videoProgress: {},
      videoDuration: initialDuration,
      hasSeeked: false,
      videoCompleted: false,
      currentVideoId: null,
    });
    
    setVideoData({
      selectedVideo: null,
      video_data: {
        watched_time: 0,
        video_id: null,
        is_completed: 0,
      },
      checked: false,
    });

    // Reset refs
    refs.timerRef.current = 0;
    refs.endedRef.current = false;
    refs.videoCompletedRef.current = false;
    refs.progressTimeSecondsRef.current = initialSavedTimeSeconds;
    refs.lastUpdateTimeRef.current = 0;
    refs.lastProgressTimeRef.current = 0;
    refs.sessionWatchedTimeRef.current = 0;
    refs.isSeekingRef.current = false;
    refs.previousPlayedRef.current = 0;
    refs.currentVideoDataRef.current = {
      video_id: null,
      watched_time: 0,
      is_completed: 0,
      progress_time: initialSavedTimeSeconds,
    };
  };

  return {
    // State objects
    playbackState,
    videoData,
    
    // Refs
    refs,
    
    // State setters
    updatePlaybackState,
    updateVideoData,
    
    // Specific setters
    setPlayed,
    setIsPlaying,
    setTimer,
    setProgressTimeSeconds,
    setVideoProgress,
    setVideoDuration,
    setHasSeeked,
    setVideoCompleted,
    setCurrentVideoId,
    setSelectedVideo,
    setVideoDataState,
    setChecked,
    
    // Helper functions
    resetVideoState,
  };
};
