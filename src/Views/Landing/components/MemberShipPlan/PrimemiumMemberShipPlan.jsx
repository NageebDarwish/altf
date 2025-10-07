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

const PrimemiumMemberShipPlan = () => {
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
            width: { xs: "90%", sm: "80%", md: "90%" },
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
              fontWeight="bold"
              sx={{ mb: 1, color: "#0C3373" }}
              className="font-pally text-headingsize"
            >
              Go Premium
            </Typography>
            <Typography sx={{ fontSize: "16px", mb: 2, color: "#0C3373" }}>
              Do you want to learn Arabic naturally and effortlessly? Let's get
              started!
            </Typography>

            <Box
              sx={{
                backgroundColor: "#DBFFDF",
                color: "#1CC932",
                padding: "10px",
                borderRadius: "5px",
                width: "150px",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Cancel anytime
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
              placeholder="Enter Your Name"
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
              placeholder="Enter Email"
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

            {/* Card Details Section */}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#0C3373",
                mb: 1,
              }}
            >
              Card Number
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              placeholder="Card Number"
            />

            {/* CVC & Expiry Date in One Row */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#0C3373",
                    mb: 1,
                  }}
                >
                  CVC
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder=" CVC Number"
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#0C3373",
                    mb: 1,
                  }}
                >
                  Expiry Date
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder=" Expire Data"
                />
              </Box>
            </Box>

            <FormControlLabel
              control={<Checkbox />}
              label="I agree to Terms and Conditions"
              sx={{ color: "#0C3373", mb: 2 }}
            />

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
                }}
                className="text-btntextsize"
              >
                Sign Up
              </Button>

              <img src="/make.webp" alt="img" style={{ width: "140px" }} />
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              backgroundColor: "#002f6c",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              color: "#fff",
              p: 2,
              position: "relative",
            }}
          >
            <img src="/mylogo.webp" alt="img" />

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

export default PrimemiumMemberShipPlan;
