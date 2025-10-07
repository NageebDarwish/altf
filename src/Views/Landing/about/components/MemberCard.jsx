import {
  autocompleteClasses,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

const MemberCard = ({ coverImage, name, designation, detail }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column" },
        boxShadow: "none",
        borderRadius: "8px",
        maxWidth: "100%",
        height: "402px",
        position: "relative",
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${coverImage})`, // replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content Section */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "white",
          zIndex: 2,
          position: "absolute",
          left: "50%",
          bottom: 15,
          transform: "translateX(-50%)",
          boxShadow: 5,
          width: 11 / 12,
          borderRadius: "10px",
        }}
      >
        <Stack>
          <Typography
            variant="h8"
            sx={{
              fontWeight: "bold",
              color: theme.palette.color.customPurple,
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="h11"
            sx={{
              fontWeight: "bold",
              color: "grey",
            }}
          >
            {designation}
          </Typography>

          {/* Description */}
          <Typography
            variant="body2"
            sx={{
              color: "grey.600",
              marginTop: "8px",
            }}
          >
            {detail}
          </Typography>
        </Stack>
        {/* Title */}
      </CardContent>
    </Card>
  );
};

export default MemberCard;
