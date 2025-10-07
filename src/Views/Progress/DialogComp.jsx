import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  InputBase,
  Stack,
} from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import ToastComp from "../../components/toast/ToastComp";
import { RxCross2 } from "react-icons/rx";

const DialogComp = ({ open, close, getGoalData }) => {
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("15");
  const [customValue, setCustomValue] = useState("");
  const user = useSelector((state) => state.user);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value !== "custom") {
      setCustomValue("");
    }
  };

  const handleSave = async () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const body = {
      target_minutes:
        selectedValue === "custom" && customValue
          ? `${customValue}`
          : `${selectedValue}`,
      date: currentDate,
    };

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_REACT_APP_URL}api/goal`, body, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
      });
      ToastComp({ variant: "success", message: "Goal saved successfully!" });
      getGoalData();
      setLoading(false);
      close();
    } catch (error) {
      setLoading(false);
      console.error(
        "Error saving goal:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      maxWidth="xs"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          width: '100%',
          marginX: 1,
          maxWidth: { xs: '100%', sm: '40vw' },
          height: { xs: '100%', sm: 'auto' }
        }
      }}
    >      <DialogTitle className=" border-b mb-3 flex justify-between">
        <h1 className="text-[24px] font-semibold font-HelveticaNeue">
          Daily Goal
        </h1>
        <h1 onClick={close} >
          <RxCross2 className="border rounded-full h-6 w-6" />
        </h1>
      </DialogTitle>
      <DialogContent >
        <RadioGroup value={selectedValue} onChange={handleChange}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border:
                selectedValue === "15"
                  ? "1px solid #F28327"
                  : "1px solid transparent",
              borderRadius: 2,
              p: {xs:1,md:2},
              mb: 2,
              backgroundColor:
                selectedValue === "15" ? "#FEF9F4" : "transparent",
            }}
          >
            <FormControlLabel
              value="15"
              control={
                <Radio
                  sx={{
                    color: "#F28327",
                    "&.Mui-checked": {
                      color: "#F28327",
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Casual
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Keeping your Arabic fresh
                  </Typography>
                </Box>
              }
            />
            <Typography variant="body2" color="text.secondary">
              15 min/day
            </Typography>
          </Box>

          {/* Learner Option */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border:
                selectedValue === "30"
                  ? "1px solid #F28327"
                  : "1px solid transparent",
              borderRadius: 2,
              p: 2,
              mb: 2,
              backgroundColor:
                selectedValue === "30" ? "#FEF9F4" : "transparent",
            }}
          >
            <FormControlLabel
              value="30"
              control={
                <Radio
                  sx={{
                    color: "#F28327",
                    "&.Mui-checked": {
                      color: "#F28327",
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Dedicated
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Making progress every day
                  </Typography>
                </Box>
              }
            />
            <Typography variant="body2" color="text.secondary">
              30 min/day
            </Typography>
          </Box>

          {/* Serious Option */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border:
                selectedValue === "60"
                  ? "1px solid #F28327"
                  : "1px solid transparent",
              borderRadius: 2,
              p: 2,
              mb: 2,
              backgroundColor:
                selectedValue === "60" ? "#FEF9F4" : "transparent",
            }}
          >
            <FormControlLabel
              value="60"
              control={
                <Radio
                  sx={{
                    color: "#F28327",
                    "&.Mui-checked": {
                      color: "#F28327",
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Serious
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Arabic All The Time
                  </Typography>
                </Box>
              }
            />
            <Typography variant="body2" color="text.secondary">
              60 min/day
            </Typography>
          </Box>

          {/* Custom Goal Option */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              border: selectedValue === "custom" ? "1px solid #F28327" : "1px solid transparent",
              borderRadius: 2,
              p: 2,
              mb: 2,
              backgroundColor: selectedValue === "custom" ? "#FEF9F4" : "transparent",
            }}
          >
            <FormControlLabel
              value="custom"
              control={
                <Radio
                  sx={{
                    color: "#F28327",
                    "&.Mui-checked": {
                      color: "#F28327",
                    },
                  }}
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    Set your own goal!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enter your goal in minutes
                  </Typography>
                </Box>
              }
            />
            <Stack direction="row" alignItems="center" spacing={1}>
              <InputBase
                sx={{
                  bgcolor: 'grey.400',
                  width: '30px',
                  height: "20px",
                  // padding: '2px 2px',
                  borderRadius: 1,
                }}
                inputProps={{ 'aria-label': 'input' }}
              />
              <Typography variant="body2" color="text.secondary">
                min/day
              </Typography>
            </Stack>
          </Box>
        </RadioGroup>
        <Box>
          <Button
            className="bg-dashboardPrimary rounded-3xl py-2"
            onClick={handleSave}
            variant="contained"
            sx={{ mt: 2 }}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={25} /> : "Save"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComp;
