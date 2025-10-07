import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import logo from "../../../../assets/picture/video-based.jpg";
import { useNavigate } from "react-router-dom";

const NewHeader = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm")); 
  const navigate = useNavigate();
  const isAuthenticatedUser = localStorage.getItem("isAuthenticated");

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", boxShadow: 1, zIndex: 40 }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "3px 10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "120px", marginRight: "20px" }}
          />
        </Box>

        {!isMobile ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
                width: "48%",
              }}
            >
              <SvgIcon
                viewBox="0 0 1024 1024"
                sx={{
                  fontSize: 40,
                  background: "#6354b1",
                  padding: "8px",
                  borderRadius: "4px",
                  color: "white",
                }}
              >
                <path d="M876.6 480.975h112.502v56.251h-112.502v-56.251zM29.1 480.975h112.5v56.251h-112.5v-56.251zM228.793 749.619l39.769 39.767-79.542 79.544-39.769-39.767 79.543-79.544zM785.674 749.614l79.534 79.539-39.772 39.772-79.534-79.539 39.772-39.772zM481 876.6h56.247v112.502h-56.247v-112.502zM714.977 364.163c-36.562-50.062-58.501-105.75-63.56-162.563h-284.635c-4.495 58.5-25.308 113.62-59.063 156.938-46.683 61.313-62.433 139.495-43.87 215.435 25.809 105.882 122.602 190.126 244.688 190.126 138.896 0 253.691-111.672 253.691-253.124 0-52.875-16.317-103.5-47.252-146.812zM368.5 29.1h281.248v116.25h-281.248v-116.25z"></path>
              </SvgIcon>
              <Typography sx={{ color: "black" }}>
                Don’t lose your progress, Sign Up Now!
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{
                  fontSize: "0.8rem",  
                  padding: "6px 10px", 
                  minWidth: "auto",
                  textTransform: "none",  
                }}
                component={Link}
                to="/sign-in"
              >
                Login/Sign up
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="end"
              sx={{ color: "black" }}
            >
              <GiHamburgerMenu />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{
                  width: 250,
                  display: "flex",
                  flexDirection: "column",
                  padding: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img src={logo} alt="logo" style={{ width: "120px" }} />
                  <IconButton onClick={toggleDrawer(false)}>
                    <RxCross2 />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ background: "#ff9301", width: "100%" }}
                    component={Link}
                    to="/sign-up"
                  >
                    Sign up
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    to="/sign-in"
                    sx={{
                      background: "#fff5e7",
                      color: "#ff9301",
                      border: "none",
                      width: "100%",
                    }}
                  >
                    Log in
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NewHeader;
