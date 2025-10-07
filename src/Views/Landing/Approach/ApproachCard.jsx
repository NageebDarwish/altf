import { Box, Stack, Typography, useTheme } from "@mui/material";

const ApproachCard = ({
  title,
  description1,
  description2,
  flexDirection = "row",
  bgColor = "white",
  imageUrl,
  logoimg
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: flexDirection },
        alignItems: "start",
        justifyContent: "center",
        backgroundColor: bgColor,
        // paddingY: 4,
        // gap: { xs: 3, md: 6 },
        borderRadius: 2,
      }}
      className="font-helvetica"
    >
      {/* Text Section */}
      <Box
        sx={{
          paddingY: 4,
          paddingX: 4,
          width: { xs: "100%", md: "50%" },
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={"start"}
          gap={2}
        >
          {/* <Typography
            variant="h9"
            sx={{
              fontWeight: "bold",
              color: theme.palette.color.customOrange,
              textTransform: "uppercase",
              width: "max-content",
              borderBottom: `1px solid ${theme.palette.color.customOrange}`,
              pb: 1,
              fontSize: "12px",
              textWrap: "nowrap",
            }}
          >
            APPROACH
          </Typography> */}
          <img src={logoimg} alt="" className="h-6 w-10 object-contain" />
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            className="text-smallscreenheading md:text-headingsize text-headingcolor"
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            mt: 5,
            lineHeight: 1.8,
          }}
          className="text-paracolor"
        >
          {description1}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 3, lineHeight: 1.8 }}
          className="text-paracolor"
        >
          {description2}
        </Typography>
      </Box>

      {/* Image Section */}
      <Box
        component="img"
        src={imageUrl}
        alt={title}
        sx={{
          width: { xs: "100%", md: "50%" },
          height: "auto",
          objectFit: "cover",
        }}
      />
    </Box>
  );
};

export default ApproachCard;
