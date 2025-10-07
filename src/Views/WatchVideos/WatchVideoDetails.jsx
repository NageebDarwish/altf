import {
  Box,
  Typography,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Button,
  CircularProgress,
  MenuItem,
  Menu,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import PublicIcon from "@mui/icons-material/Public";
import CultureIcon from "@mui/icons-material/EmojiEmotions";
import MenuDropDown from "../../components/MenuDropDown/MenuDropDown";
import { FaSignal } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { BsDownload, BsThreeDotsVertical } from "react-icons/bs";
import { useEffect, useState } from "react";
import { MdOutlineFileDownload, MdOutlineRemoveRedEye } from "react-icons/md";
import { PiListHeart } from "react-icons/pi";
import { request } from "../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const WatchVideoDetails = ({ state ,contentType}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loadingOption, setLoadingOption] = useState(null);
  const open = Boolean(anchorEl);
  const series= contentType
  const showDownloadIcon = true
  const storedVideoType = localStorage.getItem("videoType");
  const isAuthenticated = useSelector((state) => state.admin.isAuthenticated);
  const [downloadingVideos, setDownloadingVideos] = useState({});
  const dispatch =useDispatch()
  const [markedprogress,setmarkedprogress]=useState({})
   const userVideoLists = useSelector((state) => state.user.user?.video_lists || []);

  const isFavorite = userVideoLists.some(item => item.video_id === String(state?.id))

  const tags = [
    { label: "Argentina", icon: <FlagIcon /> },
    { label: "Mexico", icon: <FlagIcon /> },
    { label: "Agustina", icon: <PersonIcon /> },
    { label: "Andrea", icon: <PersonIcon /> },
    { label: "Conversations", icon: <ChatIcon /> },
    { label: "Latin America", icon: <PublicIcon /> },
    { label: "Culture", icon: <CultureIcon /> },
    { label: "Mexico", icon: <FlagIcon /> },
    { label: "Argentina", icon: <FlagIcon /> },
  ];

  const secondaryTags = [
    { label: "Mexico", icon: <FlagIcon /> },
    { label: "Argentina", icon: <FlagIcon /> },
  ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
   useEffect(() => {
    // console.log('Video lists updated:', userVideoLists);
  }, [userVideoLists]);
  const handleOptionClick = async (option, video) => {
  if (!video) return;

  if (option.title === "list") {
    setLoadingOption(option.title);
    const data = {
      video_id: video.id,
    };
    try {
      const response = await request({
        url: isFavorite ? "api/remove/video/list" : "api/video/list",
        method: "post",
        data: data,
      });

      if (isFavorite) {
        dispatch({
          type: 'REMOVE_FROM_FAVORITES',
          payload: String(video.id)
        });
      } else {
        dispatch({
          type: 'ADD_TO_FAVORITES',
          payload: { video_id: String(video.id) }
        });
      }

      enqueueSnackbar(
        isFavorite ? "Removed from favorites" : "Added to favorites",
        { variant: "success" }
      );

    } catch (error) {
      console.error("Error updating favorites:", error);
      enqueueSnackbar("Failed to update favorites", { variant: "error" });
    } finally {
      setLoadingOption(null);
      setAnchorEl(null);
    }
  } else if (option.title === "watched") {
    setLoadingOption(option.title);
    try {
      let response;
      
      if (contentType === "series") {
        response = await request({
          url: `api/series/video/watched/${video.id}`,
          method: "get",
        });
      } else {
        response = await request({
          url: `api/video/watched/${video.id}`,
          method: "get",
        });
      }
      
      console.log(response, 'response121212')
      setmarkedprogress(response?.data?.payload?.progress_time)

    } catch (error) {
      console.error("Error updating marked watch:", error);
      enqueueSnackbar("Failed to update marked watch", { variant: "error" });
    } finally {
      setLoadingOption(null);
      setAnchorEl(null);
    }
  } else {
    setAnchorEl(null);
  }
};

  const handleDownloadClick = async (video_id) => {
    if (!isAuthenticated) {
      navigate("/Nodownload");
      return;
    }
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
  const ITEM_HEIGHT = 40;

 

  const options = [
    {
      icon: <BsDownload className="text-orange-500 text-xl" />,
      label: "Download",
      title: "video",
    },
    {
      icon: <MdOutlineRemoveRedEye className="text-orange-500 text-xl" />,
      label: "Mark as Watched",
      title: "watched",
    },
    {
      icon: <PiListHeart className="text-orange-500 text-xl" />,
      label: isFavorite ? "Remove from Favourites" : "Add to Favourites",
      title: "list",
    },
  ];



  return (
    <Box
      sx={{
        borderRadius: "10px",
        bgcolor: "white",
        padding: { xs: "10px", md: '10px 10px' },
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        // gap: 2,


      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Title */}
        {/* <Typography
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "17px", md: "32px" }, lineHeight: 'normal' }}
          className="font-HelveticaNeue tracking-tight"
        >
          {state?.title}
        </Typography> */}
         <h1
          fontWeight="bold"
          className="font-HelveticaNeue xs:text-[17px] md:text-[22px] line-clamp-2 tracking-tight"
        >
          {state?.title}
        </h1>

        {/* Action Buttons */}
        <Stack direction="row" >
          {/* <Tooltip title="Download">
            <IconButton size="small">
              <FiDownload className="h-6 w-6 text-[#2E2E2E]" />
            </IconButton>
          </Tooltip> */}
          {storedVideoType === "1" ? (
            showDownloadIcon && (
              <Box>
                {downloadingVideos[state.id] ? (
                  <CircularProgress size={24} color="secondary" />
                ) : (
                  <IconButton
                    // onClick={() => handleDownloadClick(state.id)}
                    disabled={downloadingVideos[state.id]}
                  >
                    <MdOutlineFileDownload
                      color={isAuthenticated ? "black" : "#ccc"}
                      size={20}
                      style={{
                        cursor: isAuthenticated ? "pointer" : "not-allowed",
                      }}
                    />
                  </IconButton>
                )}
              </Box>
            )
          ) : (
            <IconButton disabled>
              <MdOutlineFileDownload color="#ccc" size={20} />
            </IconButton>
          )}
          {/* <Tooltip title="More options">
            <IconButton size="small">
              <MoreVertIcon fontSize="5" />
            </IconButton>
          </Tooltip> */}
          <Box onClick={handleClick}>
            <BsThreeDotsVertical className="h-6 w-6 text-[#2E2E2E]" />
          </Box>
        </Stack>
      </Box>

      {/* Description */}
      <Typography color="text.secondary" sx={{ fontSize: "16px" }} className="font-HelveticaNeue">
        {state?.description}
      </Typography>

      <Button
        sx={{
          textTransform: "none",
          backgroundColor:
            state?.level?.name === "Super Beginner"
              ? "#08BBE8"
              : state?.level?.name === "Beginner"
                ? "#1CC932"
                : state?.level?.name === "Advanced"
                  ? "#0C3373"
                  : state?.level?.name === "Intermediate"
                    ? "#F2CC08"
                    : "#ccc",
        }}
        className="md:px-3 px-2 py-1 text-[8px] flex items-center w-20 md:w-32 md:text-[15px] font-HelveticaNeue md:py-1 font-bold md:font-semibold rounded-md gap-2 text-white"
      >
        <img src={state?.level?.name === "Super Beginner" ? "/begginer.svg" : state?.level?.name === "Beginner" ? "/begginer.svg" : state?.level?.name === "Advanced" ? "/advanced.svg" : state?.level?.name === "Intermediate" ? "/intermidate.svg" : ""} alt="Level" className="h-4 w-4" />
        {state?.level?.name}
      </Button>


      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "25ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.title}
            onClick={() => handleOptionClick(option, state)}
            disabled={loadingOption === option.title}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                // fontWeight: "600",
              }}
            >
              {option.icon} {option.label}
              {loadingOption === option.title && (
                <CircularProgress size={16} style={{ marginLeft: 8 }} />
              )}
            </div>
          </MenuItem>
        ))}
      </Menu>

      {/* Tags */}
      {/* <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2, pt: '12px' }}>
        <Chip
          label="Intermediate"
          color="warning"
          icon={<FaSignal />}
          sx={{
            fontSize:{xs:"10px",md:"15px"},
            borderRadius: {xs:"3px",md:'6px'},
            // fontWeight: "bold",
            color: "white",
            bgcolor: "#F2CC08",
            border: "none",
            textTransform: "capitalize",
            "& .MuiChip-icon": {
              fontSize: "10px",
            },
          }}
          className="font-HelveticaNeue"
        />
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag.label}
            icon={tag.icon}
            variant="outlined"
            sx={{
              fontSize:{xs:"10px",md:"15px"},
              paddingY:"",
              color: "#FFF",
              borderRadius: {xs:1,md:2},
              fontWeight: 500,
              textTransform: "capitalize",
              backgroundColor: "#0C3373",
              border: "none",
              "& .MuiChip-icon": {
                color: "#FFF",
                fontSize: {xs:"10px",md:"16px"},
              },
            }}
            className="font-HelveticaNeue"

          />
        ))}
      </Stack> */}

      {/* <Stack direction="row" alignItems="center" gap={0.5} className="md:py-3">
        <CalendarTodayIcon
          fontSize="6"
          color="action"
          sx={{
            "& .MuiChip-icon": {
              fontSize: "12px",
            },
          }}
        />
        <Typography sx={{ fontSize: {xs:"12px",md:"16px"}, fontWeight: 400 }} color="#333333" className="font-HelveticaNeue">
          Published on 2024-11-19
        </Typography>
      </Stack> */}

      {/* <div className="flex flex-col xl:flex-row gap-5 my-4 font-HelveticaNeue">
        <div>
          <img src="/walk2.png" alt="" className="h-[100px] w-[154px] rounded-[5px]" />
        </div>
        <div className="font-HelveticaNeue">
          <Typography className="text-md font-bold font-HelveticaNeue">Yoga playlist</Typography>
          <div className="flex justify-between flex-col gap-6 font-HelveticaNeue">
            <Typography className="text-md text-[#8E8E8E] font-HelveticaNeue">
              this is an episode from the series playing Stardew Valley season 2
            </Typography>
            <Typography className="text-md flex items-center gap-2 font-HelveticaNeue">
              <FiDownload className="text-[#F28327] text-md" />
              Download Series
            </Typography>
          </div>
        </div>
      </div> */}

    </Box>
  );
};

export default WatchVideoDetails;
