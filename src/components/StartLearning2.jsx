import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser, updateUserData } from "../store/reducers/action";
import { useSnackbar } from "notistack";
import axios from "axios";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
const stripeElementStyle = {
  base: {
    fontSize: "16px",
    color: "#0C3373",
    fontWeight: "bold",
    fontFamily: "Poppins, sans-serif",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

const StartLarning2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const { plan } = location.state || {};
  const totalAmount =
    plan?.cycle === "monthly"
      ? plan?.price
      : plan?.cycle === "yearly"
      ? plan?.price * 12
      : 0;
  const stripe = useStripe();
  const elements = useElements();
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [clientSecret, setClientSecret] = useState(""); // You missed this before

  const [paymentError, setPaymentError] = useState("");
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userdata = useSelector((state) => state.user.user);

  // State for form fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardValue, setCardvalue] = useState("");
  const [userId, setUserId] = useState(null);

  const [userCustomerId, setUserCustomerId] = useState(null);
  const planId = plan?.id;
  const userid = useSelector((state) => state?.user?.user?.id);
  const tokensubs = useSelector((state) => state?.user?.token);

  const [token, setToken] = useState(null);
  const [authError, setAuthError] = useState(null);
  const validateForm = () => {
    const newErrors = {
      fullname: "",
      email: "",
      password: "",
    };

    let isValid = true;

    if (!fullname.trim()) {
      newErrors.fullname = "Full name is required.";
      isValid = false;
    }

    // if (!email.trim()) {
    //   newErrors.email = "Email is required.";
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   newErrors.email = "Enter a valid email address.";
    //   isValid = false;
    // }

    // if (!password.trim()) {
    //   newErrors.password = "Password is required.";
    //   isValid = false;
    // } else if (password.length < 6) {
    //   newErrors.password = "Password must be at least 6 characters.";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const cardStyle = {
    style: {
      base: {
        color: "#0C3373",
        fontSize: "16px",
        height: "200px",
        fontFamily: "Helvetica Neue, sans-serif",
        "::placeholder": {
          color: "#8599b9",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const fieldContainerStyle = {
    marginBottom: "20px",
    width: "80%",
  };
  const fieldContainerStyleExpireData = {
    width: "40%",
  };
  // const storedToken =useSelector((state) => state.user.token)
  useEffect(() => {
    const fetchToken = () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
          throw new Error("No authentication token found");
        }

        // Optional: Validate token format
        if (typeof storedToken !== "string" || storedToken.length < 30) {
          throw new Error("Invalid token format");
        }

        setToken(storedToken);
      } catch (error) {
        console.error("Token retrieval error:", error);
        setAuthError(error.message);
        // Optional: Redirect to login if no token
        // navigate('/login');
      }
    };

    fetchToken();
  }, []);

  const [intentKey, setIntentKey] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);

  const updateUserInStore = (updatedUserData) => {
    // You'll need to create this action in your Redux store
    // This is a common pattern to update user data after subscription
    dispatch({
      type: "UPDATE_USER_DATA",
      payload: updatedUserData,
    });
  };

  const handleSignup = async () => {
    if (!isAuthenticated && !validateForm()) return;
    setLoading(true);
    setPaymentError("");
    setErrorMessage("");
    setSnackbarOpen(false);

    try {
      let userId, userToken, userName, userExsist;

      // Step 1: Register User (only if not authenticated)
      if (!isAuthenticated) {
        const registerResponse = await dispatch(
          registerUser({ fullname, email, password })
        );
        userExsist = registerResponse?.data?.exists;
        userName = registerResponse?.data.data?.fullname;
        userToken = registerResponse?.data?.token; // Extract token from response


        if (userExsist === true) {
          enqueueSnackbar("User Already Exist", {
            variant: "success",
          });
        }

        if (!registerResponse || registerResponse?.error) {
          throw new Error("Registration failed.");
        }

        userId = registerResponse.data.data.id;
        setUserId(userId);
      } else {
        // User is already authenticated, use existing user data
        userExsist = false; // Assuming authenticated user doesn't need to check existence
        userName = fullname; // Use the current fullname
        userToken = tokensubs;
        userId = userid;
      }

      const isFreePlan = location.pathname === "/free-membership-plan";
      const isPremiumPlan = location.pathname === "/primium-membership-plan";

      if (isFreePlan) {
        // Free Membership Flow
        const subscriptionData = {
          payment_method_id: 2,
          amount: 0,
          email,
          cardholder_name: fullname,
          plan_id: planId,
          user_id: userId,
          stripe_customer_id: 3,
        };

        // Add token if user doesn't exist or is authenticated
        if (
          (userExsist === false && userToken) ||
          (isAuthenticated && userToken)
        ) {
          subscriptionData.token = userToken;
        }

        const subscribeResponse = await axios.post(
          "https://admin.arabicallthetime.com/api/subscription",
          subscriptionData,
          {
            headers:
              (userExsist === false && userToken) ||
              (isAuthenticated && userToken)
                ? {
                    Authorization: `Bearer ${userToken}`,
                  }
                : {},
          }
        );

        if (!subscribeResponse.data.success) {
          throw new Error("Free subscription creation failed.");
        }

        enqueueSnackbar("Free subscription successful!", {
          variant: "success",
        });

        if (isAuthenticated) {
          // If already authenticated, redirect to dashboard or appropriate page
          const updatedUserData = {
            ...userdata,
            is_premium: 1,
            subscription_status: "active",
          };
          dispatch(updateUserData(updatedUserData)); // Use the proper action
          navigate("/dashboard/videos"); // or wherever authenticated users should go
        } else if (userExsist === true) {
          navigate("/sign-in");
        } else if (userExsist === false) {
          // Send token with navigation for new users
          navigate("/otp-authentication", {
            state: {
              token: userToken,
              email: email,
              userId: userId,
            },
          });
        }
        return;
      }

      if (isPremiumPlan) {
        // Premium Membership Flow
        if (!stripe || !elements) {
          throw new Error("Stripe has not loaded yet.");
        }

        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
          throw new Error("Card element not found.");
        }

        // Step 2: Create PaymentMethod
        const paymentMethodResult = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            name: fullname,
            email: email,
          },
        });

        if (paymentMethodResult.error) {
          throw new Error(paymentMethodResult.error.message);
        }

        enqueueSnackbar("Payment method created!", { variant: "success" });
        const paymentMethodId = paymentMethodResult.paymentMethod.id;

        // Step 3: Create Payment Intent
        const stripeResponse = await axios.post(
          "https://admin.arabicallthetime.com/api/stripe",
          {
            price: totalAmount,
            name: userdata?.fullname || userName,
            email: userdata?.email || email,
            payment_method_id: paymentMethodId,
          }
        );

        const { clientSecret, customerId } = stripeResponse.data;
        setIntentKey(clientSecret);
        setUserCustomerId(customerId);

        // Step 4: Confirm Payment
        const confirmResult = await stripe.confirmCardPayment(clientSecret);

        if (confirmResult.error) {
          throw new Error(confirmResult.error.message);
        }

        const paymentIntent = confirmResult.paymentIntent;
        const PaymentID = paymentIntent.id;

        // Step 5: Subscribe
        const subscriptionData = {
          payment_method_id: PaymentID,
          amount: totalAmount,
          email: email,
          cardholder_name: fullname,
          plan_id: planId,
          user_id: userId,
          stripe_customer_id: customerId,
        };

        // Add token if user doesn't exist or is authenticated
        if (
          (userExsist === false && userToken) ||
          (isAuthenticated && userToken)
        ) {
          subscriptionData.token = userToken;
        }

        const subscribeResponse = await axios.post(
          "https://admin.arabicallthetime.com/api/subscription",
          subscriptionData,
          {
            headers:
              (userExsist === false && userToken) ||
              (isAuthenticated && userToken)
                ? {
                    Authorization: `Bearer ${userToken}`,
                  }
                : {},
          }
        );

        if (!subscribeResponse.data.success) {
          throw new Error("Subscription creation failed.");
        }

        enqueueSnackbar("Premium subscription successful!", {
          variant: "success",
        });

        if (isAuthenticated) {
          // If already authenticated, redirect to dashboard or appropriate page
          const updatedUserData = {
            ...userdata,
            is_premium: 1,
            subscription_status: "active",
            plan_id: planId,
          };
          dispatch(updateUserData(updatedUserData)); // Use the proper action
          navigate("/dashboard/videos"); // or wherever authenticated users should go
        } else if (userExsist === true) {
          navigate("/sign-in");
        } else if (userExsist === false) {
          // Send token with navigation for new users
          navigate("/otp-authentication", {
            state: {
              token: userToken,
              email: email,
              userId: userId,
            },
          });
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      enqueueSnackbar(error.message, { variant: "error" });

      const errorData = error?.response?.data?.payload || {};
      setErrorMessage(
        error.response?.data?.payload?.email ||
          error.response?.data?.payload?.message ||
          error.message ||
          "Registration or payment failed."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      {/* Top Background Section */}
      <Box
        sx={{
          height: "15vh",
          background: "#F28327",
          width: "100%",
        }}
      />

      {/* Main Form Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "full",
          px: "20px",
          mt: -6,
        }}
      >
        <Box
          sx={{
            width: "1050px",
            height: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            borderRadius: "50px",
            backgroundColor: "#fff",
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <div className="w-full lg:w-[500px] xl:w-[773px] py-3">
            <Box
              sx={{
                flex: 2,
                pl: { xs: 2, sm: 5, md: 14 },
                pt: { xs: 3, sm: 4, md: 5 },
              }}
            >
              <Typography className="font-pally mb-1 text-heading py-3 sm:text-2xl font-bold text-xl md:text-textheading">
                {location.pathname === "/primium-membership-plan"
                  ? "Go Premium"
                  : "Start learning"}
              </Typography>
              <Typography
                sx={{ fontSize: "14px", mb: 3, mt: 3, color: "#8599b9" }}
                className="font-HelveticaNeue font-semibold"
              >
                Do you want to learn Arabic naturally and effortlessly? Let's
                get started!
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#DBFFDF",
                  color: "#1CC932",
                  paddingX: "20px",
                  paddingY: "10px",
                  borderRadius: "5px",
                  width: "fit-content",
                  mb: 3,
                }}
                className="font-HelveticaNeue font-bold"
              >
                {location.pathname === "/primium-membership-plan"
                  ? "Cancel anytime"
                  : "No credit card required"}
              </Box>
              {isAuthenticated == false && (
                <>
                  {/* Full Name Input */}
                  <Typography
                    sx={{
                      fontSize: "16px",
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
                    placeholder="Enter your full name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    error={Boolean(errors.fullname)}
                    helperText={errors.fullname}
                    sx={{
                      mb: 2,
                      height: "54px",
                      backgroundColor: "#F6F7F9",
                      borderRadius: "12px",
                      maxWidth: { sm: "520px", xl: "500px", xs: "313px" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#0C3373",
                      },
                    }}
                  />

                  {/* Email Address Input */}
                  <Typography
                    sx={{
                      fontSize: "16px",
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
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={{
                      mb: 2,
                      height: "54px",
                      backgroundColor: "#F6F7F9",
                      maxWidth: { sm: "520px", xl: "500px", xs: "313px" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#0C3373",
                      },
                    }}
                  />

                  {/* Password Input */}
                  <Typography
                    sx={{
                      fontSize: "16px",
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
                    placeholder="Choose your password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    sx={{
                      mb: 2,
                      height: "54px",
                      backgroundColor: "#F6F7F9",
                      borderRadius: "12px",
                      maxWidth: { sm: "520px", xl: "500px", xs: "313px" },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#0C3373",
                      },
                    }}
                  />
                </>
              )}

              {location.pathname === "/primium-membership-plan" && (
                <>
                  <div style={fieldContainerStyle}>
                    <label style={{ display: "block", marginBottom: "10px" }}>
                      Card Number
                    </label>
                    <div
                      style={{
                        padding: "12px",
                        backgroundColor: "#F8FAFC",
                        borderRadius: "6px",
                        height: "54px",
                      }}
                    >
                      <CardNumberElement options={cardStyle} />
                    </div>
                  </div>

                  {/* Expiry and CVC */}
                  <div style={{ display: "flex", gap: 4, width: "80%" }}>
                    <Box sx={{ flex: 1 }} style={{ width: "200px" }}>
                      <label style={{ display: "block", marginBottom: "10px" }}>
                        Expiry Date
                      </label>
                      <div
                        style={{
                          padding: "12px",
                          backgroundColor: "#F6F7F9",
                          borderRadius: "6px",
                          height: "54px",
                        }}
                      >
                        <CardExpiryElement options={cardStyle} />
                      </div>
                    </Box>

                    <Box sx={{ flex: 1, ...fieldContainerStyle }}>
                      <label style={{ display: "block", marginBottom: "10px" }}>
                        CVC
                      </label>
                      <div
                        style={{
                          padding: "12px",
                          backgroundColor: "#F6F7F9",
                          borderRadius: "6px",
                          height: "54px",
                        }}
                      >
                        <CardCvcElement options={cardStyle} />
                      </div>
                    </Box>
                  </div>

                  {paymentError && (
                    <Typography color="error" sx={{ my: 2 }}>
                      {paymentError}
                    </Typography>
                  )}
                </>
              )}

              <FormControlLabel
                control={<Checkbox />}
                label="I agree to Terms and Conditions"
                sx={{ color: "#0C3373", fontWeight: "700px", fontSize: "16px" }}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={handleSignup}
                  variant="contained"
                  className="font-[500] py-4 rounded-full bg-dashboardPrimary text-sm md:text-[20px] flex items-center justify-center px-6"
                  sx={{ position: "relative", textTransform: "none" }}
                >
                  {loading ? (
                    <CircularProgress
                      size={24}
                      color="inherit"
                      sx={{ marginRight: 1 }}
                    />
                  ) : (
                    "Add Premium "
                  )}
                </Button>
                <img
                  src="/make.webp"
                  alt="Illustration"
                  style={{ width: "244px", height: "183px" }}
                />
              </Box>
            </Box>
          </div>

          {/* Right Side Box */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "#002f6c",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#fff",
              px: 2,
              py: 4,
              position: "relative",
              width: "234px",
            }}
            className="lg:block hidden"
          >
            <img
              src="/mylogo.webp"
              alt="Logo"
              style={{ width: "203px", height: "90px" }}
            />
            <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
              <img
                src="/shape.png"
                alt="Shape"
                style={{ width: "80px", maxWidth: "100%" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        {/* Error Snackbar (toast) */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity="error"
            onClose={() => setSnackbarOpen(false)}
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>

        {/* Rest of your JSX */}
        <Box sx={{ height: "15vh", background: "#F28327", width: "100%" }} />
        {/* ... */}
      </Box>
    </Box>
  );
};

export default StartLarning2;
