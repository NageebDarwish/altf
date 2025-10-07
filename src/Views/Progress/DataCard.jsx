import { Paper, Box, Typography } from "@mui/material";

const DataCard = ({ title, value, icon, children, backgroundColor }) => {
  return (
    <Paper
      sx={{
        backgroundColor: backgroundColor ? backgroundColor : "white",
        boxShadow: 1,
        height: "136px",
        padding: "10px",
      }}
    >
      <Box display="flex" alignItems="center">
        {icon}
        <Typography sx={{ marginLeft: 1, fontSize: "13px" }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {value}
      </Typography>
      {children}
    </Paper>
  );
};

export default DataCard;
