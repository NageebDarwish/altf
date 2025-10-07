import React from "react";
import { Container, Grid, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";
import aboutimage from "../../assets/picture/aboutus1.png";
import aboutimage2 from "../../assets/picture/aboutus2.png";

const UnderlinedTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  color: "#0294D3",
  fontWeight: "bold",
  fontSize: "18px",
  paddingBottom: "15px",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 36,
    width: "100%",
    height: "4px",
    backgroundColor: "#0294D3",
  },

  [theme.breakpoints.down("sm")]: {
    "&::after": {
      top: 30,
    },
    paddingBottom: "10px",
  },
}));

const AboutUs = () => {
  return (
    <Box maxWidth="lg" padding={3}>
      <Typography className="font-pally" variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Contact Us
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UnderlinedTypography className="font-pally">
            Best Educational Learning Platform In the World
          </UnderlinedTypography>

          <Typography variant="body1" className="font-HelveticaNeue">
            Lorem ipsum dolor sit amet consectetur. Blandit orci ullacorper ac
            tincidunt amet aliquam massa donec leo. Et pharetra mauris enim
            cursus velit. Lobortis porta ac nunc eget. Ut ut malesuada eu leo
            liberotur egestas tempor a aliquam sollicitudin arcu. Aliquet sem
            eget vikelementum sed. Nisi faucibus adipiscing diam porttitor. Ac
            scelerisque enim aliuam at eget proin mauris varius. Odio imperdiet
            tincidunt ut diam velit. Quis at praesent orci commodo faucibus Hac
            ante dignissim purus cras ac euismod tellusetium ante faucibus magna
            nulla. Eget consequat vel mattis accumsan tristique ultrices velit.
            Vestibulum ultrices cras condimentum integer. Faucibus ultricies
            ultricies sed aenean habitasse vitae nullam fermentumquam orci
            ultricies netusSit risus dictum placerat nullam sed cras. Curabitur
            at vitae facilisis in urna.Hac ante dignissim purus cras ac euismod
            tellusetium ante faucibus magna nulla. Eget consequat vel mattis
            acha ha hajhjha naknkaa kala lanllana lla kllanalkdn ja l
            lauaomahiaoen.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledImage src={aboutimage} alt="About Us Image" />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6}>
          <StyledImage src={aboutimage2} alt="About Us Image" />
        </Grid>

        <Grid item xs={12} md={6}>
          <UnderlinedTypography className="font-pally">
            Best Online Platform for Learning
          </UnderlinedTypography>
          <Typography variant="body1" className="font-HelveticaNeue">
            Lorem ipsum dolor sit amet consectetur. Blandit orci ullacorper ac
            tincidunt amet aliquam massa donec leo. Et pharetra mauris enim
            cursus velit. Lobortis porta ac nunc eget. Ut ut malesuada eu leo
            liberotur egestas tempor a aliquam sollicitudin arcu. Aliquet sem
            eget vikelementum sed. Nisi faucibus adipiscing diam porttitor. Ac
            scelerisque enim aliuam at eget proin mauris varius. Odio imperdiet
            tincidunt ut diam velit. Quis at praesent orci commodo faucibus Hac
            ante dignissim purus cras ac euismod tellusetium ante faucibus magna
            nulla. Eget consequat vel mattis accumsan tristique ultrices velit.
            Vestibulum ultrices cras condimentum integer. Faucibus ultricies
            ultricies sed aenean habitasse vitae nullam fermentumquam orci
            ultricies netusSit risus dictum placerat nullam sed cras. Curabitur
            at vitae facilisis in urna.Hac ante dignissim purus cras.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const StyledImage = styled("img")({
  width: "100%",
  height: "350px",
  borderRadius: 8,
});

export default AboutUs;
