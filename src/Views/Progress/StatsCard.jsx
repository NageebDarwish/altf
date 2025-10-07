import { Paper, Typography } from "@mui/material";
import React from "react";

const StatsCard = ({ title, value, description, bg = "", style }) => {
  console.log(value, "VALUEEEEEEEEEEEEEEEEEEEE");
  return (
    <Paper
      style={{
        padding: "10px",
        textAlign: "center",
        background: bg ? bg : "",
        color: bg ? "#fff" : "",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6" sx={{ fontSize: "14px" }}>
        {title}
      </Typography>
      <Typography variant="h5" style={style} sx={{ font: "bold" }}>
        {value}
      </Typography>
      <Typography variant="subtitle1" sx={{ fontSize: "14px" }}>
        {description}
      </Typography>
    </Paper>
  );
};

export default StatsCard;
