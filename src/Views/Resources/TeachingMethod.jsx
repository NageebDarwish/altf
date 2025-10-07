import React from "react";
import { Container, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import aboutimage from "../../assets/picture/image25.png";
import aboutimage2 from "../../assets/picture/aboutus2.png";
import { useNavigate } from "react-router-dom";
const UnderlinedTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  color: "#0294D3",
  fontWeight: "bold",
  fontSize: "20px",
  paddingBottom: "10px",
}));

const TeachingMethod = () => {
const navigate=useNavigate();
  const handleNavigate = () => {
    navigate("/resources/vedio-plateform")
  }

  return (
    <Container maxWidth="lg" padding={4} sx={{marginTop:"10px"}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <UnderlinedTypography className="font-pally">Teaching Methods</UnderlinedTypography>

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

        <Button
          sx={{
            background: "#000000",
            color: "white",
            padding: "5px",
            margin: "20px",
            width: "150px",
            height: "50px",
          }}
          className="font-HelveticaNeue"
          onClick={handleNavigate}
        >
          Contact Us
        </Button>
      </Grid>
    </Container>
  );
};

const StyledImage = styled("img")({
  width: "100%",
  height: "400px",
  borderRadius: 8,
});

export default TeachingMethod;
