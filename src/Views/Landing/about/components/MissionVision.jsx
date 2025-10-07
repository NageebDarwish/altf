import { Box, Typography } from "@mui/material";

const MissionVision = ({ title, description1, img, btnlabel, reverse }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        backgroundColor: "white",
        padding: { xs: 2, md: 4 },
        maxWidth: "100%",
      }}
    >
      {/* Text Section */}
      <Box sx={{ textAlign: { xs: "center", md: "left" }, maxWidth: "500px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
          className="text-smallscreenheading md:text-headingsize text-headingcolor"
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{ lineHeight: 1.6, marginBottom: 2 }}
        className="text-[14px] sm:text-xl text-[#0C3373]"
        >
          {description1}
        </Typography>

        <button className="bg-btnbackground text-white px-6 py-2 rounded-full hover:bg-hoverbtn transition">
          {btnlabel}
        </button>
      </Box>

      {/* Image Section */}
      <Box
        component="img"
        src={img}
        alt={title}
        sx={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default MissionVision;
