import { useEffect, useState, useCallback } from "react";
import { LuSettings2 } from "react-icons/lu";
import {
  Box,
  Button,
  MenuItem,
  CircularProgress,
  Checkbox,
  Typography,
  Switch,
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import SearchBar from "./SearchBar";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../../services/axios";
import { createApiUrl, API_ENDPOINTS } from "../../config/api";
import { BiSort } from "react-icons/bi";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { CiSliderVertical } from "react-icons/ci";
import { IoMdSearch } from "react-icons/io";
import { FaAngleRight, FaChevronLeft } from "react-icons/fa";
import DesktopMenuItems from "@components/DesktopMenuItems";
import { useMenuContext } from "../../contexts/MenuContext";
import PropTypes from "prop-types";

const FilterVideo = ({
  setVideoData,
  set_loading,
  fetchVideos,
  onFilterChange,
  selectedFilters,
}) => {
  const { menuData } = useMenuContext();
  console.log(menuData);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showFilterList, setShowFilterList] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [activeSubFilter, setActiveSubFilter] = useState(null);

  // Mobile filter states
  const [mobileLevels, setMobileLevels] = useState([]);
  const [mobileGuides, setMobileGuides] = useState([]);
  const [mobileTopics, setMobileTopics] = useState([]);
  const [mobileLoading] = useState(false);
  const [mobileSearchValue, setMobileSearchValue] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const levelId = queryParams.get("level");

  const mainFilters = [
    {
      label: "Sort By",
      icon: <BiSort className="border border-black p-[2px] rounded-[5px]" />,
      apiKey: "sort",
    },
  ];

  const secondaryFilters = [
    {
      label: "Levels",
      icon: (
        <MdOutlineSignalCellularAlt className="border border-black p-[2px] rounded-[5px]" />
      ),
      apiKey: "levels",
    },
    { label: "Guides", img: "/guideicon.png", apiKey: "guides" },
    { label: "Topics", img: "/tag.png", apiKey: "topics" },
  ];

  const sortOptions = [
    { label: "Newest", value: "desc" },
    { label: "Oldest", value: "asc" },
    { label: "Shortest", value: "shortest" },
    { label: "Longest", value: "longest" },
    // { label: "Popular", value: "asc" },
  ];

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      // When switch is turned ON, use the hide watched API
      set_loading(true);
      try {
        const res = await request({
          method: "get",
          url: "api/hide/watched/video",
        });
        setVideoData(res?.data?.payload);
        console.log(res, "resres12345");
      } catch (error) {
        console.error("Error:", error);
      } finally {
        set_loading(false);
      }
    } else {
      // When switch is turned OFF, fetch normal videos
      fetchVideos();
    }
  };

  const getSuggestions = async () => {
    await axios
      .get(createApiUrl(API_ENDPOINTS.filters.suggestions))
      .then((result) => {
        setSuggestions(result?.data?.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Mobile filter data fetching functions
  const getMobileLevels = async () => {
    try {
      const response = await axios.get(
        createApiUrl(API_ENDPOINTS.filters.levels)
      );
      setMobileLevels(response.data.payload);
    } catch (error) {
      console.error("Error fetching levels:", error);
      setMobileLevels([]);
    }
  };

  const getMobileGuides = async () => {
    try {
      const response = await axios.get(
        createApiUrl(API_ENDPOINTS.filters.guides)
      );
      setMobileGuides(response.data.payload);
    } catch (error) {
      console.error("Error fetching guides:", error);
      setMobileGuides([]);
    }
  };

  const getMobileTopics = async () => {
    try {
      const response = await axios.get(
        createApiUrl(API_ENDPOINTS.filters.topics)
      );
      setMobileTopics(response.data.payload);
    } catch (error) {
      console.error("Error fetching topics:", error);
      setMobileTopics([]);
    }
  };

  // Mobile filter change handler
  const handleMobileCheckboxChange = async (filter, id) => {
    const newFilters = { ...selectedFilters };
    const currentValues = newFilters[filter] || [];

    if (currentValues.includes(id)) {
      newFilters[filter] = currentValues.filter((item) => item !== id);
    } else {
      newFilters[filter] = [...currentValues, id];
    }

    sendFiltersToAPI(newFilters);
    onFilterChange(newFilters);
  };

  useEffect(() => {
    getSuggestions();
    // Load mobile filter data when component mounts
    getMobileLevels();
    getMobileGuides();
    getMobileTopics();
  }, []);

  const openFilterMenu = async (event, filter) => {
    setAnchorEl(event.currentTarget);
    setSelectedFilter(filter.label);
    if (filter.apiKey === "sort") {
      setData(sortOptions);
    } else if (filter.apiKey === "combined") {
      setData(secondaryFilters);
    } else {
      setLoading(true);
      try {
        const response = await axios.get(
          createApiUrl(API_ENDPOINTS.filters.custom(filter.apiKey))
        );
        setData(response.data.payload);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const closeFilterMenu = () => {
    setAnchorEl(null);
    setData([]);
  };

  const handleCheckboxChange = async (filter, id) => {
    const newFilters = { ...selectedFilters };
    const currentValues = newFilters[filter] || [];

    if (currentValues.includes(id)) {
      newFilters[filter] = currentValues.filter((item) => item !== id);
    } else {
      newFilters[filter] = [...currentValues, id];
    }

    sendFiltersToAPI(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = async (sortValue) => {
    const newFilters = { ...selectedFilters, sort: sortValue };
    sendFiltersToAPI(newFilters);
    onFilterChange(newFilters);
    closeFilterMenu();
  };

  const sendFiltersToAPI = useCallback(async (filters) => {
    const payload = {};

    if (filters.levels?.length > 0) {
      payload.level_ids = filters.levels;
    }
    if (filters.guides?.length > 0) {
      payload.guide_ids = filters.guides;
    }
    if (filters.topics?.length > 0) {
      payload.topic_ids = filters.topics;
    }
    if (filters.sort) {
      payload.sort = filters.sort;
    }

    // Add pagination parameters
    payload.page = 1;
    payload.per_page = 15;

    // Add hide_watched parameter based on switch state
    payload.hide_watched = checked ? 1 : 0;

    try {
      set_loading(true);
      const response = await axios.post(
        createApiUrl(API_ENDPOINTS.videos.filter),
        payload
      );
      
      // Handle paginated response
      if (response?.data?.payload) {
        if (response.data.payload.data) {
          // Paginated response format
          setVideoData(response.data.payload.data);
        } else {
          // Regular array response
          setVideoData(response.data.payload);
        }
      }
      set_loading(false);
    } catch (error) {
      console.error("Error sending filter data:", error);
      set_loading(false);
    }
  }, [setVideoData, set_loading, checked]);

  useEffect(() => {
    if (levelId) {
      const filter = { levels: [levelId], guides: [], topics: [] };
      sendFiltersToAPI(filter);
    }
  }, [levelId, sendFiltersToAPI]);

  const handleSearchClick = () => {
    setShowSearchBar(true);
  };

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handlenavigatevideo = () => {
    setAnchorEl(null);
    setActiveSubFilter(null);
    navigate("/dashboard/videos");
  };

  const handleMobileSearchChange = (e) => {
    setMobileSearchValue(e.target.value);
  };
  // Mobile search handler
  const handleMobileSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      const searchValue = e.target.value;
      if (searchValue.trim()) {
        // You can implement search functionality here
        // For now, we'll just log the search value
        console.log("Mobile search:", searchValue);
        // You might want to call a search API or filter function here
      }
    }
  };
  return (
    <>
    {/* Mobile Menu Items - Show only on mobile */}
        {menuData.menuItems && menuData.staticData && (
          <div className="block md:hidden container mb-4 pb-2 border-b">
            <DesktopMenuItems 
              menuItems={menuData.menuItems}
              staticData={menuData.staticData}
              progresscompletemin={menuData.progresscompletemin}
              setOpenDialog={menuData.setOpenDialog}
            />
          </div>
        )}
      <Box className="mt-16 md:mt-0 hidden md:block">
        {showSearchBar && (
          <SearchBar
            suggestions={suggestions}
            setShowSearchBar={setShowSearchBar}
          />
        )}
        
        
          
        <Box className="flex flex-wrap items-center gap-3 md:px-[8px] py-1 border-t md:py-[8px] md:gap-[12px] mt-10 md:mt-0 bg-white md:rounded-xl ">
          {/* Sort By - Always visible */}
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Button
              variant="outlined"
              startIcon={
                <BiSort className="md:border border-black p-[2px] rounded-[5px]" />
              }
              endIcon={<ArrowDropDown />}
              onClick={(e) => openFilterMenu(e, mainFilters[0])}
              sx={{
                color: "text.primary",
                backgroundColor: { xs: "", md: "#eef2f6" },
                borderColor: { xs: "gray", md: "rgba(0, 0, 0, 0.1)" },
                textTransform: "none",
                borderRadius: {
                  xs: 0,
                  md: "12px",
                },
                padding: "6px 6px",
                fontSize: { xs: "12px", sm: "14px", lg: "16px" },
                width: "100%",
                border: "none",
              }}
              className="font-HelveticaNeue"
            >
              Sort By
            </Button>
          </Grid>

          {/* Filters - Combined on small screens, separate on larger */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            lg={2}
            className="border-l"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <Button
              variant="outlined"
              startIcon={
                <CiSliderVertical className="md:border border-black p-[2px] rounded-[5px]" />
              }
              endIcon={<ArrowDropDown />}
              onClick={(e) =>
                openFilterMenu(e, { label: "Filters", apiKey: "combined" })
              }
              sx={{
                color: "text.primary",
                borderColor: { xs: "", md: "rgba(0, 0, 0, 0.1)" },
                textTransform: "none",
                borderRadius: {
                  xs: 0,
                  md: "12px",
                },
                padding: "6px 6px",
                fontSize: { xs: "12px", sm: "14px" },
                width: "100%",
                border: "none",
              }}
              className="font-HelveticaNeue"
            >
              Filters
            </Button>
          </Grid>

          {secondaryFilters.map((filter, index) => (
            <Grid
              key={index}
              item
              xs={4}
              sm={6}
              md={3}
              lg={2}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Button
                variant="outlined"
                startIcon={
                  filter.img ? (
                    <img
                      src={filter.img}
                      alt={filter.label}
                      className="h-4 w-4 object-contain"
                    />
                  ) : (
                    filter.icon
                  )
                }
                endIcon={<ArrowDropDown />}
                onClick={(e) => openFilterMenu(e, filter)}
                sx={{
                  color: "text.primary",
                  backgroundColor: "#eef2f6",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  textTransform: "none",
                  borderRadius: "12px",
                  padding: "6px 6px",
                  fontSize: { xs: "12px", sm: "14px", lg: "16px" },
                  width: "100%",
                }}
                className="font-HelveticaNeue"
              >
                {filter.label}
              </Button>
            </Grid>
          ))}

          {/* Hide Watched - Hidden on xs, visible on sm and up */}
          <Grid
            item
            xs={0}
            sm={12}
            md={3}
            lg={2}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Switch
              checked={checked}
              onChange={handleChange}
              sx={{
                transform: "scale(1.5)",
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "white",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "green",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#ccc",
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{ whiteSpace: "nowrap", fontSize: "18px", fontWeight: 400 }}
              className="font-HelveticaNeue"
            >
              Hide Watched
            </Typography>
          </Grid>

          <div
            onClick={handleSearchClick}
            className="border-l md:w-80 xxl:w-full md:border-none flex-1"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                borderRadius: { xs: "", md: "13px" },
                padding: "8px 10px",
                backgroundColor: { xs: "#f6f6f6", md: "#f6f6f6" },
                gap: "4px",
                flex: 1,
              }}
            >
              {/* <img src="/search.png" alt="" className="h-5 w-5 object-contain" /> */}
              <IoMdSearch className="text-[20px]" />
              <Typography
                variant="body2"
                sx={{ flexGrow: 1, color: "text.secondary" }}
                className="font-pally"
              >
                Search
              </Typography>
            </Box>
          </div>
        </Box>

        <Dialog
          open={Boolean(anchorEl)}
          onClose={() => {
            closeFilterMenu();
            setActiveSubFilter(null);
          }}
          fullScreen={isSmallScreen}
          PaperProps={{
            sx: isSmallScreen
              ? {
                  m: 0,
                  p: 0,
                  borderRadius: 0,
                }
              : {
                  position: "absolute",
                  top: anchorEl
                    ? anchorEl.offsetTop + anchorEl.offsetHeight
                    : 0,
                  left: anchorEl ? anchorEl.offsetLeft : 0,
                  m: 0,
                  p: 0,
                  borderRadius: 1,
                  boxShadow: 3,
                  minWidth: 200,
                  maxHeight: "80vh",
                  overflow: "auto",
                  zIndex: 1301,
                },
          }}
        >
          <DialogContent sx={{ p: 0, m: 0 }}>
            <div className="px-2 py-2 border bg-[#f9f9f9] flex justify-between">
              <h1 onClick={handlenavigatevideo} className="md:hidden block">
                <FaChevronLeft className="mt-2 text-3xl" />
              </h1>
              <h1 className="text-3xl md:text-xl ">
                {selectedFilter === "Filters"
                  ? activeSubFilter || "Filters"
                  : selectedFilter}
              </h1>
              <h1></h1>
            </div>

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress size={25} />
              </Box>
            ) : (
              data.map((item, index) => {
                if (selectedFilter === "Sort By") {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => handleSortChange(item.value)}
                      sx={{
                        width: "100%",
                        "&:hover": {
                          bgcolor: "#F28327",
                          color: "white",
                        },
                      }}
                    >
                      <Typography sx={{ fontSize: "16px" }}>
                        {item.label}
                      </Typography>
                    </MenuItem>
                  );
                } else if (selectedFilter === "Filters") {
                  return (
                    <MenuItem
                      key={index}
                      onClick={(e) => {
                        openFilterMenu(e, item);
                        setActiveSubFilter(item.label);
                      }}
                      sx={{
                        width: "100%",
                        "&:hover": {
                          bgcolor: "#F28327",
                          color: "white",
                        },
                      }}
                    >
                      <Box className="flex items-center justify-between w-full pr-10 border-b py-4">
                        <Box className="flex gap-2">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={item.label}
                              className="h-4 w-4 object-contain mt-1"
                            />
                          ) : (
                            <Box className="mt-1">{item.icon}</Box>
                          )}
                          <Typography sx={{ fontSize: "16px" }}>
                            {item.label}
                          </Typography>
                        </Box>
                        <FaAngleRight />
                      </Box>
                    </MenuItem>
                  );
                } else {
                  return (
                    <MenuItem key={index} disableRipple>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0 }}
                      >
                        <Checkbox
                          checked={
                            selectedFilters[
                              selectedFilter.toLowerCase()
                            ]?.includes(item.id) || false
                          }
                          onChange={() =>
                            handleCheckboxChange(
                              selectedFilter.toLowerCase(),
                              item.id
                            )
                          }
                          sx={{
                            "& .MuiSvgIcon-root": {
                              color: "#F28327",
                            },
                            "&.Mui-checked": {
                              color: "#F28327",
                            },
                          }}
                        />
                        <Typography variant="body2">{item.name}</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ marginLeft: "auto" }}>
                        {item.count}
                      </Typography>
                    </MenuItem>
                  );
                }
              })
            )}
          </DialogContent>

          <div className="md:hidden block px-4 mb-4">
            <button
              onClick={handlenavigatevideo}
              className="px-4 py-2 bg-btnbackground rounded-xl text-white w-full"
            >
              View video
            </button>
          </div>
        </Dialog>
      </Box>
      <div>
        <div className="md:mt-0 md:hidden flex items-center gap-4 container">
          <input
            type="search"
            placeholder="search"
            className="bg-white p-2 rounded-lg flex-1"
            value={mobileSearchValue}
            onChange={handleMobileSearchChange}
            onKeyPress={handleMobileSearch}
          />
          <button
            className="bg-white p-3 rounded-lg"
            onClick={() => setShowFilterList((prev) => !prev)}
          >
            <LuSettings2 />
          </button>
        </div>
        {showFilterList && (
          <div className="container md:hidden">
            <div className="bg-white p-2 rounded-lg mt-4">
              {/* Sort By Section */}
              <div className="mb-4">
                <h1 className="flex items-center gap-2 text-primary/80 mb-2">
                  <BiSort className="border border-primary/80 p-[2px] rounded-[5px]" />
                  Sort By
                </h1>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        selectedFilters.sort === option.value
                          ? "bg-btnbackground text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels Section */}
              <div className="mb-4">
                <h1 className="flex items-center gap-2 text-primary/80 mb-2">
                  <MdOutlineSignalCellularAlt className="border border-primary/80 p-[2px] rounded-[5px]" />
                  Levels
                </h1>
                {mobileLoading ? (
                  <div className="flex justify-center py-2">
                    <CircularProgress size={20} />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {mobileLevels.map((level) => (
                      <div key={level.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`level-${level.id}`}
                          checked={
                            selectedFilters.levels?.includes(level.id) || false
                          }
                          onChange={() =>
                            handleMobileCheckboxChange("levels", level.id)
                          }
                          className="accent-primary"
                        />
                        <label
                          htmlFor={`level-${level.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {level.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Guides Section */}
              <div className="mb-4">
                <h1 className="flex items-center gap-2 text-primary/80 mb-2">
                  <img src="/guides.svg" alt="guideicon" className="w-4 h-4" />
                  Guides
                </h1>
                {mobileLoading ? (
                  <div className="flex justify-center py-2">
                    <CircularProgress size={20} />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {mobileGuides.map((guide) => (
                      <div key={guide.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`guide-${guide.id}`}
                          checked={
                            selectedFilters.guides?.includes(guide.id) || false
                          }
                          onChange={() =>
                            handleMobileCheckboxChange("guides", guide.id)
                          }
                          className="accent-primary"
                        />
                        <label
                          htmlFor={`guide-${guide.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {guide.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Topics Section */}
              <div className="mb-4">
                <h1 className="flex items-center gap-2 text-primary/80 mb-2">
                  <img src="/topics.svg" alt="topics" className="w-4 h-4" />
                  Topics
                </h1>
                {mobileLoading ? (
                  <div className="flex justify-center py-2">
                    <CircularProgress size={20} />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {mobileTopics.map((topic) => (
                      <div key={topic.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`topic-${topic.id}`}
                          checked={
                            selectedFilters.topics?.includes(topic.id) || false
                          }
                          onChange={() =>
                            handleMobileCheckboxChange("topics", topic.id)
                          }
                          className="accent-primary"
                        />
                        <label
                          htmlFor={`topic-${topic.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {topic.name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Hide Watched Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-primary/80">Hide Watched</h1>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "white",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "green",
                        },
                      "& .MuiSwitch-track": {
                        backgroundColor: "#ccc",
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

FilterVideo.propTypes = {
  setVideoData: PropTypes.func.isRequired,
  set_loading: PropTypes.func.isRequired,
  fetchVideos: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    levels: PropTypes.array,
    guides: PropTypes.array,
    topics: PropTypes.array,
    sort: PropTypes.string,
  }).isRequired,
};

export default FilterVideo;
