import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Avatar,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import SearchInput from "./SearchInput";
//   import { logOut } from "../../../../../store/actions/adminActions";
import { FaSearch, FaUserCircle } from "react-icons/fa";

const NAV_WIDTH = 280;

const HEADER_MOBILE = 54;

const HEADER_DESKTOP = 62;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  // ...bgBlur({color: theme.palette.primary.main}),
  backgroundColor: theme.palette.typography.allVariants.color,
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    padding: "10px 0",
  },
}));
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
    display: "flex",
    justifyContent: "space-between",
  },
}));
const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };
  return (
    <StyledRoot>
      <StyledToolbar>
        <Typography
          sx={{ color: "#000000", fontWeight: 800, fontSize: "1.5rem" }}
        >
          <SearchInput />
        </Typography>
        <Box>
          {/* <FormControl sx={{ m: 1, width:'400px'}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password"> Search</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            startAdornment={
              <InputAdornment position="start">
                  <SearchIcon />
              </InputAdornment>
            }
            label="Search"
            size='small'
            placeholder='Search here.....'
            sx={{borderRadius:'10px', background:'#f7f7f7'}}
          />
        </FormControl>  */}
        </Box>
        <Box />
        {/* <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs:0.5,
            sm:1
          }}
          >
            <IconButton
            onClick={handleNotificationsOpen}
            ref={notificationsRef}
            >
              <Badge badgeContent={102}  color="primary">
              <NotificationsNoneIcon sx={{color:'#bc9000', fontSize:'2rem'}} />
              </Badge>
            </IconButton>
            <Box sx={{display:'flex', alignItems:'center'}}>
              <Avatar src="/assets/images/admin.png" sx={{cursor:'pointer',}} onClick={handleAvatarClick}/>
              <Box>
              <Typography sx={{color:'#000',mb:-0.5}}> Mudasser</Typography>
              <Typography sx={{color:'#000', fontSize:'12px', fontWeight:'bold'}}>Admin </Typography>
              </Box>
              <IconButton>
                  <ArrowDropDownIcon />
              </IconButton>
            </Box>
          </Stack> */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton component={Link} to="/notifications">
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <PersonIcon sx={{ color: "#e2e2e2" }} />
            </Avatar>
          </IconButton>
          <Typography
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              fontFamily: "Poppins",
              fontSize: "22px",
            }}
          >
            My Profile
          </Typography>
        </Box>
      </StyledToolbar>
    </StyledRoot>
  );
};

export default TopBar;
