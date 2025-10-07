import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resendOtp, verifyOtp } from "../../store/reducers/action";
import { useNavigate, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";

const OtpAuthentications = () => {
  const [otp, setOtp] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.admin?.user);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get email from navigation state or Redux state
  const email = location?.state?.email || data?.email;

  const handleOtpChange = (value) => {
    // تنظيف القيمة للتأكد من أنها أرقام فقط
    const cleanedValue = value.replace(/\D/g, "");
    setOtp(cleanedValue);
  };
  console.log(data);

  const handleSubmit = () => {
    const otpCode = otp;
    const otpData = { email: email, otp: otpCode };
    setLoading(true);

    dispatch(verifyOtp(otpData))
      .then((response) => {
        setSnackbarMessage(
          response.data.success
            ? response.data.message
            : "OTP verification failed."
        );
        setSnackbarSeverity(response.data.success ? "success" : "error");
        setSnackbarOpen(true);
        if (response.data.success) navigate("/sign-in");
      })
      .catch((error) => {
        setSnackbarMessage(
          error?.response?.data?.message || "OTP verification failed."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleResendOtp = () => {
    const resendData = { email: email };

    dispatch(resendOtp(resendData))
      .then((response) => {
        setSnackbarMessage(
          response.data.success
            ? "OTP resent successfully!"
            : "OTP resend failed."
        );
        setSnackbarSeverity(response.data.success ? "success" : "error");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarMessage(
          error?.response?.data?.message || "OTP resend failed."
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      });
  };

  return (
    <>
      <style>
        {`
          .no-spinner::-webkit-outer-spin-button,
          .no-spinner::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .no-spinner[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <Grid
        container
        sx={{ alignItems: "center", height: "100vh" }}
        className="overflow-y-hidden"
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", justifyContent: "center", height: "100vh" }}
        >
          <Box
            sx={{ width: { xs: "100%", sm: "80%" }, textAlign: "left" }}
            className="py-10"
          >
            <img src="/logopic.png" alt="Logo" style={{ maxWidth: "200px" }} />
            <div className="py-20">
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  fontSize: { xs: "1.8rem", md: "44px" },
                }}
                className="font-pally text-[#0C3373]"
              >
                OTP Authentication
              </Typography>
              {/* <Typography variant="body1" sx={{ mb: 3, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              Please enter the four-digit verification code sent to{" "}
              <Typography sx={{ color: "#0294D3", display: "inline-block" }}>{email}</Typography>
            </Typography> */}
              <Typography
                variant="body1"
                sx={{ mb: 3, fontSize: { xs: "0.9rem", sm: "1rem" } }}
              >
                Please enter the 4-digit verification code that was sent to your
                email.{" "}
                <p className="text-[#0C3373] font-semibold text-start">
                  Verification code was sent to:{" "}
                  <span className="text-gray-500">
                    on {email || "your email"}
                  </span>
                </p>
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                <OtpInput
                  value={otp}
                  onChange={handleOtpChange}
                  numInputs={4}
                  renderSeparator={<span style={{ margin: "0 8px" }}>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{
                        width: "64px",
                        height: "64px",
                        margin: "0 6px",
                        textAlign: "center",
                        fontSize: "1.5rem",
                        color: "#0C3373",
                        backgroundColor: "#CDE1FF",
                        border: "none",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                      className="no-spinner"
                    />
                  )}
                  inputType="number"
                  shouldAutoFocus
                />
              </Box>

              <Button
                size="large"
                onClick={handleSubmit}
                disabled={loading || otp.length < 4}
                className={`w-1/2 bg-[#ff7300] text-white py-2 h-[56px] text-base rounded-full flex items-center justify-center mx-auto mt-10 
    ${
      otp.length < 4
        ? "opacity-50 cursor-not-allowed relative"
        : "hover:bg-[#ff7300]"
    }`}
              >
                {otp.length < 4 && (
                  <div className="absolute inset-0 bg-white opacity-20 rounded-full"></div>
                )}
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Confirm"
                )}
              </Button>

              <Typography
                variant="body1"
                sx={{ mb: 4, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                className="text-center py-4"
              >
                Didn’t receive the OTP?{" "}
                <Typography
                  onClick={handleResendOtp}
                  component="span"
                  sx={{ color: "#ff7300", cursor: "pointer" }}
                >
                  Resend OTP
                </Typography>
              </Typography>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
              >
                <Alert
                  onClose={() => setSnackbarOpen(false)}
                  severity={snackbarSeverity}
                  sx={{ width: "100%" }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </div>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Box>
            <img
              src="/otpside.webp"
              alt="Sign in"
              className="h-full w-full object-contain"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default OtpAuthentications;
