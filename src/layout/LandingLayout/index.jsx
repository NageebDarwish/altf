import React from "react";
import Header from "../../Views/Landing/components/Header";
import Footer from "../../Views/Landing/components/Footer";
import { Outlet } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";
import ScrollReset from "../../components/ScrollReset";

const LandingLayout = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollReset />
      <Header />
      <main
        className="flex-1"
        style={{
          paddingTop: isSmallScreen ? "80px" : "90px",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
