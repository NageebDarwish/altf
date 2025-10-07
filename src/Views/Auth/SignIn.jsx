import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/reducers/action";
import { CircularProgress } from "@mui/material";
import Policy from "./Policy";
import ResetModal from "./ResetModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");

  const data = useSelector((state) => state?.admin?.user);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      valid = false;
    } else {
      setEmailError(""); // Clear if valid
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError(""); // Clear if valid
    }

    if (!valid) return;

    const userData = { email, password };
    setLoading(true);

    dispatch(loginUser(userData))
      .then((response) => {
        const token = response.data.payload.token;
        const userData = response.data.payload.user;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(userData));
        }

        dispatch({
          type: "ADD_USER",
          payload: response?.data?.payload,
        });

        if (response.data.payload.user.is_verified === "1") {
          localStorage.setItem(
            "isAuthenticated",
            response.data.payload.user.is_verified
          );
          localStorage.setItem("videoType", "premium");
          navigate("/dashboard/videos");
        } else {
          navigate("/otp-authentication");
        }

        setErrorMessage(response.data.message || "Login successfully!");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        if (error == "Error: Please verify your email to login.")
          return navigate("/otp-authentication");
        // Extract error message properly
        const errorData = error?.response?.data?.payload || {};
        const errorMessage =
          errorData.email ||
          errorData.password ||
          errorData.message ||
          error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again";

        // Set error message as string, not object
        setError(errorMessage || error);
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <header className="relative bg-white bg-opacity-50 mt-6 md:mt-12 backdrop-blur-lg ml-4 md:ml-12 pt-4 md:pt-6 flex justify-center items-center">
        <div className="absolute inset-0 flex justify-start items-center">
          <img
            src="/logopic.png"
            alt="Logo"
            className="blur-[3px] h-12 md:h-16 w-32 md:w-40 opacity-90"
          />
        </div>
      </header>

      <div className="md:absolute top-3 flex justify-center items-center w-full px-4 md:px-6 lg:mt-0 md:mt-8 mt-4">
        <div className="flex justify-center flex-col lg:flex-row rounded-2xl md:rounded-[50px] bg-white overflow-hidden border border-[#1F509E] w-full max-w-[960px] mx-auto">
          <div className="flex-[2] px-4 py-6 md:px-12 lg:px-20 md:py-4 lg:py-6">
            <h1 className="font-pally text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold mb-2 md:mb-4 py-2 md:py-4 text-[#0C3373]">
              Welcome back!
            </h1>
            <p className="font-HelveticaNeue text-[#0C3373] text-sm md:text-base lg:text-[16px] my-3 md:my-4 lg:my-6">
              Continue learning Arabic - naturally and effortlessly!
            </p>

            <div className="flex flex-col gap-2 md:gap-3">
              <span className="text-[#0C3373] text-sm md:text-[16px] font-bold">
                Email Address
                <span className="ms-1 text-red-500">*</span>
              </span>
              <input
                type="email"
                className="px-3 md:px-4 py-3 md:py-4 border border-[#D1D5DB] bg-[#F8FAFC] rounded-lg md:rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#1F509E] placeholder-[#0C3373B2] text-sm md:text-base"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                  if (error) setError("");
                }}
              />
              {emailError && (
                <span className="text-red-600 text-xs md:text-sm mt-1">
                  {emailError}
                </span>
              )}
              {error && (
                <span className="text-red-500 text-xs md:text-sm mt-1">
                  {error}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 md:gap-3 mt-4 md:mt-6">
              <span className="text-[#0C3373] text-sm md:text-[16px] font-bold">
                Password
                <span className="ms-1 text-red-500">*</span>
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                className="px-3 md:px-4 py-3 md:py-4 border border-[#D1D5DB] rounded-lg md:rounded-[12px] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#1F509E] placeholder-[#0C3373B2] text-sm md:text-base"
                placeholder="Choose your password"
                required
              />
              {passwordError && (
                <span className="text-red-600 text-xs md:text-sm mt-1">
                  {passwordError}
                </span>
              )}
            </div>

            <div className="flex flex-wrap-reverse gap-3 md:gap-4 items-center justify-between py-4 md:py-6">
              <button
                className="w-full font-medium py-3 md:py-4 rounded-lg md:rounded-full bg-dashboardPrimary hover:bg-dashboardPrimary/80 text-white text-sm md:text-base lg:text-[20px] flex items-center justify-center px-4 md:px-6 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSignIn}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress
                    size={20}
                    color="inherit"
                    className="mr-2"
                  />
                ) : (
                  "Log In"
                )}
              </button>

              <p
                onClick={() => setModalOpen(true)}
                className="text-[#1F509E] hover:text-[#0C3373] cursor-pointer font-bold text-sm md:text-base whitespace-nowrap"
              >
                Forgot Password?
              </p>
              <ResetModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
              />
            </div>

            <div className="mt-4 md:mt-6">
              <p className="text-[#0C3373B2] text-left text-sm md:text-base font-medium">
                Don&apos;t have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-dashboardPrimary hover:text-dashboardPrimary/80 font-bold"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 bg-[#002f6c] flex-col items-center justify-center text-white p-4 md:p-6 relative w-full lg:w-64">
            <img
              src="/mylogo.webp"
              alt="Logo"
              className="w-full max-w-[180px]"
            />

            <div className="absolute bottom-0 right-0">
              <img
                src="/shape.png"
                alt="Shape"
                className="w-16 md:w-20 lg:w-24"
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer className={"mx-auto w-[240px]"} autoClose={3000} />
    </>
  );
};

export default SignIn;
