import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";

const FreeMemberShipPlan = () => {
  return (
    <div>
      <Header />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "url('/FaxX.webp')", // Corrected syntax
          backgroundSize: "cover", // Ensures the image covers the area
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition

          px: { sm: 2, md: 7 },
          py: 7,
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: "80%", md: "70%" },
            display: "flex",
            borderRadius: "40px",
            backgroundColor: "#fff",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            marginBottom: "12px",
          }}
        >
          <Box sx={{ flex: 2, p: { xs: 3, md: 5 } }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ mb: 1, color: "#0C3373" }}
            >
              Start learning
            </Typography>
            <Typography sx={{ fontSize: "12px", mb: 2, color: "#0C3373" }}>
              Do you want to learn Arabic naturally and effortlessly? Let's get
              started!
            </Typography>

            <Box
              sx={{
                backgroundColor: "#d4edda",
                color: "#1CC932",
                padding: "10px",
                borderRadius: "5px",
                width: "250px",
                mb: 2,
              }}
            >
              ✅ No credit card required
            </Box>

            {/* Full Name Field */}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#0C3373",
                mb: 1,
              }}
            >
              Full Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              placeholder="Enter your Name"
            />

            {/* Email Address Field */}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#0C3373",
                mb: 1,
              }}
            >
              Email Address
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              placeholder="Enter Email Addrss"
            />

            {/* Password Field */}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#0C3373",
                mb: 1,
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              sx={{ mb: 2 }}
              placeholder="Enter Password"
            />

            {/* Checkbox for Terms */}
            <FormControlLabel
              control={<Checkbox />}
              label="I agree to Terms and Conditions"
              sx={{ color: "#0C3373", mb: 2 }}
            />

            {/* Button and Image Container */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#F28327",
                  color: "white",
                  width: "auto",
                  borderRadius: "100px",
                  textTransform: "none",
                }}
                className="text-btntextsize"
              >
                Sign Up
              </Button>

              <img src="/make.webp" alt="img" style={{ width: "140px" }} />
            </Box>
          </Box>

          {/* Right Side - Blue Panel */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#002f6c",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              color: "#fff",
              p: 2,
              position: "relative", // Ensures the image stays within this container
            }}
          >
            <img src="/mylogo.webp" alt="img" />

            {/* Image Positioned at Bottom Right */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
              }}
            >
              <img src="/shape.png" alt="img" style={{ width: "100px" }} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default FreeMemberShipPlan;
