import { useEffect, useState } from "react";
import { Grid, Box, Typography, Paper, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircularProgressWithLabel from "./CircularProgressWithLabel"; // Assuming this is your custom component
import { MdDiamond } from "react-icons/md";
import ProgressClinder from "./ProgressClinder";
import axios from "axios";
import DialogComp from "./DialogComp";
import { useSelector } from "react-redux";
import StatsCard from "./StatsCard";
import { request } from "../../services/axios";
import { LuMessagesSquare } from "react-icons/lu";
import Modal from "./Modal";

const Progress = () => {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [goalDetails, setGoalDetails] = useState("");
  const [levelSetails, setLEvelDetails] = useState([]);
  const [streaks, setStreaks] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [outsideData, setOutsideData] = useState();
  const [watchedVideos, setWatchedVideos] = useState("");
  const user = useSelector((state) => state.user);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [goalData, setGoalData] = useState("");
  const handleClickOpen = (level) => {
    setSelectedLevel(level);
    setOpen(true);
  };
  const fetchData = async (url, setter) => {
    try {
      const result = await request(
        {
          url: url,
          method: "get",
        },
        false
      );
      setter(result?.data?.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("api/user/detail", setUserDetails);
    fetchData("api/goal", setGoalDetails);
    fetchData("api/progress/level/list", setLEvelDetails);
    fetchData("api/all/streaks", setStreaks);
    fetchData("api/all/goals", setAllGoals);
    fetchData("api/watched/video/count", setWatchedVideos);
    fetchData("api/outside/platform/all", setOutsideData);
  }, []);
  const getGoalData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}api/goal`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        }
      );
      setGoalData(res?.data?.payload);
    } catch (error) {
      console.error(
        "Error saving goal:",
        error.response?.data || error.message
      );
    }
  };
  useEffect(() => {
    getGoalData();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    fetchData("api/outside/platform/all", setOutsideData);
  };
  return (
    <Box sx={{ flexGrow: 1, padding: "20px", overflowY: "hidden" }}>
      <Grid container spacing={3} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={4}>
          <StatsCard
            style={{ color: "white" }}
            title="Video Watching Time"
            value={
              userDetails ? (
                (userDetails?.total_watching_hours / 60).toFixed(2)
              ) : (
                <Typography>Loading...</Typography>
              )
            }
            description="Minutes Watched"
            bg="#063E5F"
            userDetails={userDetails}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Videos"
            value={
              watchedVideos ? (
                watchedVideos
              ) : (
                <Typography>Loading...</Typography>
              )
            }
            description="Watched Videos"
            userDetails={userDetails}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Practiced Days"
            value={`${streaks?.length} Days`}
            description="Days You Practiced"
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Levels
            </Typography>
            {levelSetails?.map((level, index) => (
              <Paper
                key={index}
                onClick={() => handleClickOpen(level)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  margin: "10px 0",
                  border: "1px solid #00BFFF",
                  borderRadius: "10px",
                }}
              >
                <Box display="flex" alignItems="center">
                  <MdDiamond
                    style={{
                      color: index === 0 ? "#00BFFF" : "gray",
                      marginRight: "16px",
                      fontSize: "36px",
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ color: index === 0 ? "#00BFFF" : "gray" }}
                    >
                      {level?.name}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                      {level.description}
                    </Typography> */}
                    <Box display="flex" alignItems="center" mt={1}>
                      <AccessTimeIcon
                        style={{ fontSize: "16px", marginRight: "4px" }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        Hours of input: {level?.watching_hours}
                      </Typography>
                      <ChatBubbleOutlineIcon
                        style={{
                          fontSize: "16px",
                          marginLeft: "12px",
                          marginRight: "4px",
                        }}
                      />
                      <Typography variant="caption" color="textSecondary">
                        Known words: {level?.known_words}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <ArrowForwardIosIcon
                  style={{ color: "#000", fontSize: "16px" }}
                />
              </Paper>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper style={{ padding: "16px", height: "full" }}>
            <Typography variant="h6">Daily Goals</Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ height: "150px", marginTop: "44px" }}
            >
              <CircularProgressWithLabel
                size={150}
                progress={85}
                strokeWidth={16}
                primaryColor="#0294D3"
                goal={goalData}
                goalDetails={goalDetails}
              />
            </Box>
            <Button
              onClick={() => setOpenDialog(true)}
              sx={{
                background: "#0294D3",
                color: "white",
                marginTop: "45px",
                width: "100%",
              }}
            >
              Change Daily Goals Time
            </Button>
            <DialogComp
              open={openDialog}
              close={() => setOpenDialog(false)}
              getGoalData={getGoalData}
            />
          </Paper>
          <div className="border h-80 mt-7 bg-white rounded-lg">
            <div className="flex flex-col gap-6 px-6 py-4">
              <h1 className="text-3xl font-bold">Outside hours</h1>
              <div className="flex flex-col gap-4 items-center justify-center h-36 w-68 rounded-lg mt-4 bg-[#def1f7] border">
                <h1 className="text-2xl">
                  <LuMessagesSquare />
                </h1>
                <h1 className="font-bold text-2xl">
                  {(outsideData?.total_duration / 3600).toFixed(2)}
                </h1>
                <h1 className="font-bold text-lg">
                  hours outside the platform
                </h1>
              </div>
              <button
                className="text-md text-[#ff9301] font-bold"
                onClick={toggleModal}
              >
                + Add hours outside the platform
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
      <ProgressClinder
        allGoals={allGoals}
        userDetails={userDetails}
        streaks={streaks}
      />
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </Box>
  );
};

export default Progress;
