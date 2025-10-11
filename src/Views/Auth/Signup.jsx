import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/reducers/action";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

const Signup = () => {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleOpenModal = () => {
    if (!emailError && !passwordError && email && password) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setIsAgreed(false);
  };

  const handleSignup = async () => {
    setLoading(true); // Start loading
    try {
      const response = await dispatch(
        registerUser({ fullname, email, password })
      );
      toast.success(response.data.message || "Registration successful!");
      navigate("/otp-authentication", {
        state: { email: email },
      });
    } catch (error) {
      // Extract error message properly - don't set error object directly
      const errorData = error?.response?.data?.payload || {};
      const errorMessage =
        errorData.email ||
        errorData.password ||
        errorData.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed.";

      // Set error message as string, not object
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleConfirmSignup = () => {
    handleCloseModal();
    handleSignup();
  };

  const isButtonDisabled =
    !email ||
    !password ||
    !fullname ||
    loading ||
    emailError ||
    passwordError ||
    !isCheckboxChecked;

  return (
    <>
      <header className="relative bg-white bg-opacity-50 mt-6 md:mt-12 backdrop-blur-lg ml-4 md:ml-12 pt-4 md:pt-6 flex justify-center items-center ">
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
          <div className="flex-[2] px-4 md:px-12 lg:px-20 md:py-4">
            <h1 className="font-pally text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-bold  py-2 md:py-4 text-[#0C3373]">
              Create your account
            </h1>
            <p className="font-HelveticaNeue text-[#0C3373] text-sm md:text-base lg:text-[16px] mb-4">
              Do you want to learn Arabic naturally and effortlessly? Let&apos;s
              get started!
            </p>

            <div className="flex flex-col gap-2 md:gap-3 my-3 md:my-4">
              <label className="text-[#0C3373] text-sm md:text-[16px] font-bold">
                Full Name
                <span className="ms-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className="px-3 md:px-4 py-3 md:py-4 border border-[#D1D5DB] rounded-lg md:rounded-[12px] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#1F509E] placeholder-[#0C3373B2] text-sm md:text-base"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="flex flex-col gap-2 md:gap-3">
              <label className="text-[#0C3373] text-sm md:text-[16px] font-bold">
                Email Address
                <span className="ms-1 text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                className={`px-3 md:px-4 py-3 md:py-4 border border-[#D1D5DB] rounded-lg md:rounded-[12px] bg-[#F8FAFC] focus:outline-none focus:ring-2 ${
                  error
                    ? "focus:ring-red-600 placeholder-red-600 border-red-600"
                    : "focus:ring-[#1F509E] placeholder-[#0C3373B2]"
                } text-sm md:text-base`}
                placeholder="Enter your email"
                required
              />
              {error && (
                <span className="text-red-500 text-xs md:text-sm">{error}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 md:gap-3 mt-4">
              <label className="text-[#0C3373] text-sm md:text-[16px] font-bold">
                Password
                <span className="ms-1 text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                className="px-3 md:px-4 py-3 md:py-4 border border-[#D1D5DB] rounded-lg md:rounded-[12px] bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#1F509E] placeholder-[#0C3373B2] text-sm md:text-base"
                placeholder="Choose your password"
                required
              />
              {passwordError && (
                <span className="text-red-500 text-xs md:text-sm">
                  {passwordError}
                </span>
              )}
            </div>

            <div className="flex gap-2 md:gap-3 mt-4 items-start">
              <input
                type="checkbox"
                id="termsCheckbox"
                onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                required
                className="mt-1"
              />
              <label
                htmlFor="termsCheckbox"
                className="text-[#0C3373] text-sm md:text-base font-medium"
              >
                <span className="hover:text-[#1F509E]">
                  I agree to{" "}
                  <Link
                    className="font-semibold underline"
                    to={"/privacy-policy"}
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <div className="flex items-start justify-between my-4">
              <button
                onClick={handleConfirmSignup}
                className="w-full font-medium py-3 md:py-4 rounded-lg md:rounded-full bg-dashboardPrimary hover:bg-dashboardPrimary/80 text-white text-sm md:text-base lg:text-[20px] flex items-center justify-center px-4 md:px-6 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || isButtonDisabled}
              >
                {loading ? (
                  <CircularProgress
                    size={20}
                    color="inherit"
                    className="mr-2"
                  />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            <div className="my-4">
              <p className="text-[#0C3373B2] text-left text-sm md:text-base font-medium">
                Already have an account?
                <Link
                  to="/sign-in"
                  className="text-dashboardPrimary hover:text-dashboardPrimary/80 font-bold"
                >
                  Log In
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

export default Signup;
