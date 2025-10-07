import { Card, CardContent, Typography, Box, useTheme } from "@mui/material";

const OfferCard = ({ title, description, backgroundUrl }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column" },
        boxShadow: "none",
        borderRadius: "8px",
        maxWidth: "100%",
        height: "200px",
        border: `1px solid ${theme.palette.color.customOffWhite}`,
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          width: { xs: "100%", sm: "80px" },
          height: { xs: "auto", sm: "80px" },
          backgroundImage: `url(${backgroundUrl})`, // replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "4px",
          margin: "16px",
        }}
      />

      {/* Content Section */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "16px",
          backgroundColor: "white",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: "grey.600",
            marginTop: "8px",
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
