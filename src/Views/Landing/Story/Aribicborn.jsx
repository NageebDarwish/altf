import { Box, Stack, Typography, useTheme } from "@mui/material";
import Container from "../../../components/common/Container";

const Aribicborn = ({
  title,
  descriptions,
  description2,
  bgColor = "white",
  imageUrl,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "left",
          textAlign: "left",
          gap: 4,
          borderRadius: 2,
        }}
        className="font-helvetica"
      >
      {/* Text Section */}
      <Box sx={{ width: { xs: "100%", md: "100%" }, textAlign: "left" }}>
        <Typography
          variant="h5"
          component="h2"
          fontWeight="bold"
          className="text-lg sm:text-textsmallheading font-bold md:text-[44px] font-pally text-[#0C3373] mb-6"
        >
          Arabic all the time was born
        </Typography>

        <Typography
          variant="body1"
          sx={{
            lineHeight: { xs: 1.6, sm: 1.7, md: 1.8 },
            textAlign: "left",
          }}
          className="text-heading font-HelveticaNeue text-base sm:text-lg md:text-xl font-[500]"
        >
          With this vision, Hasan created Arabic All The Time—a platform
          designed to transform screen time into language acquisition time. It
          immerses aspiring learners in relatable stories, engaging videos, and
          gives a key to the vibrant warmth of Arab culture. It’s a space where
          acquiring Arabic feels intuitive, inspiring, and deeply rewarding- A
          journey of connection and discovery.
          <br />
          <br />
          At Arabic All The Time, we believe that language is more than just
          words. It’s a gateway to new worlds, meaningful connections, and
          cultural understanding. Whether you’re beginning your journey or
          rediscovering Arabic, our mission is to make every moment of learning
          feel natural, enjoyable, and truly rewarding.
        </Typography>
      </Box>

      {/* Image Section */}
      <Box
        component="img"
        src="/IMG_0764 2.webp"
        alt={title}
        sx={{
          width: { xs: "100%", md: "100%" },
          // height: "400px",
          // objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      </Box>
    </Container>
  );
};

export default Aribicborn;
