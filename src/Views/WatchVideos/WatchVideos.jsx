import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  useMediaQuery,
} from "@mui/material";
import YoutubeCard from "./YoutubeCard";
import { Link, useLocation } from "react-router-dom";
import { request } from "../../services/axios";
import SkeletonComp from "../../components/Skeleton/SkeletonComp";
import FilterVideo from "../../components/FilterVideo/FilterVideo";
import { useInfiniteVideoScroll } from "../../hooks/useInfiniteScroll";
import "../../utils/extensionErrorHandler"; // Suppress extension errors

const WatchVideos = () => {
  const [view, setView] = useState("list");
  const [video, setVideoData] = useState([]);
  const [newvideo, setnewvideo] = useState([]);
  const [downloadingVideos, setDownloadingVideos] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    levels: [],
    guides: [],
    topics: [],
    sort: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    levels: [],
    guides: [],
    topics: [],
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("level");

  // Use infinite scroll hook for videos
  const {
    data: infiniteVideoData,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
    lastElementRef,
  } = useInfiniteVideoScroll({
    dependencies: [level],
    enableAutoLoad: !level, // Don't auto-load if we have a level filter
    rootSelector: "#scroll-container",
  });
  const [userData, setUserData] = useState(null);
  const userStatus = userData?.subscription?.plan?.is_default;
  
  useEffect(() => {
    try {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      }
    } catch (error) {
      console.error("Error reading user data:", error);
    }
  }, []);

  // Add stable container reference to prevent extension errors
  useEffect(() => {
    const container = document.getElementById('watch-videos-container');
    if (container) {
      // Add data attributes to help extensions identify elements
      container.setAttribute('data-component', 'watch-videos');
      container.setAttribute('data-loaded', 'true');
    }
  }, []);

  // Add scroll event listener as fallback for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loadingMore) return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      if (distanceFromBottom <= 600) {
        loadMore();
      }
    };

    let rafId;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [hasMore, loadingMore, loadMore]);

  const isWideScreen = useMediaQuery("(min-width:1441px)");
  const isVeryWideScreen = useMediaQuery("(min-width:1920px)");
  const isUltraWideScreen = useMediaQuery("(min-width:2560px)");

  // Determine column size based on screen width
  const getGridSize = () => {
    if (isUltraWideScreen) return 2; // 6 cards per row
    if (isVeryWideScreen) return 3; // 4 cards per row
    if (isWideScreen) return 4; // 3 cards per row (default)
    return 4; // default (xl=4 → 3 cards per row)
  };

  const gridSize = getGridSize();

  // Update video data when infinite scroll data changes
  useEffect(() => {
    if (infiniteVideoData.length > 0) {
      setVideoData(infiniteVideoData);
      setnewvideo(infiniteVideoData);
    }
  }, [infiniteVideoData]);

  useEffect(() => {
    if (level) {
      setSelectedFilters((prev) => ({
        ...prev,
        levels: [level],
      }));
      // Level filtering is now handled by FilterVideo component
    }
  }, [level]);

  // If filters are externally cleared to empty, ensure base list present
  useEffect(() => {
    const noLevels = !selectedFilters.levels || selectedFilters.levels.length === 0;
    const noGuides = !selectedFilters.guides || selectedFilters.guides.length === 0;
    const noTopics = !selectedFilters.topics || selectedFilters.topics.length === 0;
    const noSort = !selectedFilters.sort;
    if (noLevels && noGuides && noTopics && noSort) {
      if (video.length === 0) {
        refresh();
      }
    }
  }, [selectedFilters, video.length, refresh]);

  const handleDownloadClick = async (video_id) => {
    setDownloadingVideos((prev) => ({ ...prev, [video_id]: true }));
    try {
      await request({
        method: "post",
        url: "api/video/list",
        data: {
          video_id,
          type: "video",
        },
      });
    } catch (error) {
      console.error("Error downloading video:", error);
    } finally {
      setDownloadingVideos((prev) => ({ ...prev, [video_id]: false }));
    }
  };

  const handleVideoPlay = async (video_id) => {
    try {
      await request({
        method: "post",
        url: "api/video/history",
        data: {
          video_id,
          type: "video",
        },
      });
    } catch (error) {
      console.error("Error playing video:", error);
    }
  };

  const handleAddToList = async (video_id, type) => {
    try {
      await request({
        method: "post",
        url: "api/video/list",
        data: {
          video_id,
          type: "video",
        },
      });
    } catch (error) {
      console.error("Error adding video to the list:", error);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const levelsResponse = await request({
        url: "api/levels",
        method: "get",
      });
      const guidesResponse = await request({
        url: "api/guides",
        method: "get",
      });
      const topicsResponse = await request({
        url: "api/topics",
        method: "get",
      });

      setFilterOptions({
        levels: levelsResponse.data.payload,
        guides: guidesResponse.data.payload,
        topics: topicsResponse.data.payload,
      });
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  // sendFiltersToAPI function removed - now handled by FilterVideo component

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    // Filtering is now handled by FilterVideo component
  };

  const handleDeleteFilter = (filterType, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (filterType === "sort") {
        newFilters.sort = "";
      } else {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value
        );
      }
      // When all filters are cleared, refresh base list
      const noLevels = !newFilters.levels || newFilters.levels.length === 0;
      const noGuides = !newFilters.guides || newFilters.guides.length === 0;
      const noTopics = !newFilters.topics || newFilters.topics.length === 0;
      const noSort = !newFilters.sort;
      if (noLevels && noGuides && noTopics && noSort) {
        refresh();
      }
      return newFilters;
    });
  };

  const getFilterNameById = (filterType, id) => {
    const filterOption = filterOptions[filterType].find(
      (item) => item.id === id
    );
    return filterOption ? filterOption.name : "Unknown";
  };

  const resetFilters = () => {
    setSelectedFilters({
      levels: [],
      guides: [],
      topics: [],
      sort: "",
    });
    refresh(); // Use the refresh function from infinite scroll hook
  };

  console.log(video,'video');

  return (
    <Box id="watch-videos-container">
      <Grid item xs={12}>
        <Box>
          <FilterVideo
            setVideoData={setVideoData}
            set_loading={() => {}} // No-op since we're using infinite scroll loading
            fetchVideos={refresh} // Use refresh function from infinite scroll
            onFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
          />
        </Box>
      </Grid>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid container sx={{ my: "4px", mb: 1 }}>
          {view === "list" && (
            <Grid item xs={12}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              ></Box>
            </Grid>
          )}
        </Grid>

        {(selectedFilters.levels.length > 0 ||
          selectedFilters.guides.length > 0 ||
          selectedFilters.topics.length > 0 ||
          selectedFilters.sort) && (
          <Box
            sx={{
              padding: "7px",
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              <h1 className="md:inline-block hidden text-2xl font-semibold font-HelveticaNeue">
                Include:
              </h1>
              {selectedFilters.levels.map((levelId) => (
                <Chip
                  key={`level-${levelId}`}
                  label={`${getFilterNameById("levels", levelId)}`}
                  onDelete={() => handleDeleteFilter("levels", levelId)}
                  className={`text-white ${
                    levelId % 2 == 0 ? "bg-btnbackground" : "bg-[#0C3373]"
                  }`}
                />
              ))}
              {selectedFilters.guides.map((guideId) => (
                <Chip
                  key={`guide-${guideId}`}
                  label={`${getFilterNameById("guides", guideId)}`}
                  onDelete={() => handleDeleteFilter("guides", guideId)}
                  className={`text-white ${
                    guideId % 2 == 0 ? "bg-btnbackground" : "bg-[#0C3373]"
                  }`}
                />
              ))}
              {selectedFilters.topics.map((topicId) => (
                <Chip
                  key={`topic-${topicId}`}
                  label={`${getFilterNameById("topics", topicId)}`}
                  onDelete={() => handleDeleteFilter("topics", topicId)}
                  className={`text-white ${
                    topicId % 2 == 0 ? "bg-btnbackground" : "bg-[#0C3373]"
                  }`}
                />
              ))}
              {selectedFilters.sort && (
                <Chip
                  label={`${selectedFilters.sort}`}
                  onDelete={() =>
                    handleDeleteFilter("sort", selectedFilters.sort)
                  }
                  className={`text-white ${
                    selectedFilters.sort == "newest"
                      ? "bg-btnbackground"
                      : "bg-[#0C3373]"
                  }`}
                />
              )}
            </Box>
            <div className="px-20 py-4 hidden">
              <button
                onClick={resetFilters}
                className="text-red-400 font-bold text-xl px-4 py-2 rounded-md hover:text-red-500"
              >
                Reset Filters
              </button>
            </div>
          </Box>
        )}

        <Grid
          container
          spacing={2}
          sx={{ padding: "10px", marginBottom: { xs: "70px", md: "0px" } }}
        >
          {loading ? (
            <>
              {[...Array(6)].map((_, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={gridSize}
                  key={`skeleton-initial-${idx}`}
                  className="md:mb-0"
                >
                  <SkeletonComp />
                </Grid>
              ))}
            </>
          ) : video?.length > 0 ? (
            <>
              {video.map((videos, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={gridSize}
                  key={`${videos.id}-${index}`}
                  className="md:mb-0"
                >
                  <Link to={`/dashboard/watch/${videos.video}`} state={{ video: videos, type: "video", newvideo, allVideos: video }}>
                    <YoutubeCard
                      newvideo={newvideo}
                      video={videos}
                      Vediotitle={videos?.title}
                      videoUrl={videos?.video}
                      title={videos?.title}
                      onPlay={() => handleVideoPlay(videos.id)}
                      description={videos.description}
                      buttonText={videos.level}
                      videoDuration={videos.videoDuration}
                      backgroundImage={videos.backgroundImage}
                      showDownloadIcon={true}
                      onDownloadClick={() => handleDownloadClick(videos.id)}
                      isDownloading={downloadingVideos[videos.id]}
                      menuItems={["Add to list"]}
                      handleAdd={() => handleAddToList(videos.id)}
                      type="video"
                      isPremium={videos.plan === "premium"}
                      userStatus={userStatus}
                    />
                  </Link>
                </Grid>
              ))}

              {/* Loading more skeletons */}
              {loadingMore && (
                [...Array(3)].map((_, idx) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    xl={gridSize}
                    key={`skeleton-more-${idx}`}
                    className="md:mb-0"
                  >
                    <SkeletonComp />
                  </Grid>
                ))
              )}
              
              {/* Infinite scroll trigger element */}
              {hasMore && (
                <Grid item xs={12} ref={lastElementRef} id="infinite-trigger">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "16px",
                      minHeight: "80px",
                    }}
                  >
                    {!loadingMore && (
                      <Typography variant="body2" color="text.secondary">
                        Loading more videos...
                      </Typography>
                    )}
                  </Box>
                </Grid>
              )}
              
              {error && (
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </>
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
              className="py-10"
            >
              No videos available
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default WatchVideos;
