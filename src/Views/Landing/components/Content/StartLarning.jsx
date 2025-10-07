import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@store/reducers/action";

const StartLearning = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form fields
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Handle signup
  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await dispatch(
        registerUser({ fullname, email, password })
      );
      setErrorMessage(response.data.message || "Registration successful!");
      navigate("/otp-authentication");
    } catch (error) {
      const errorData = error?.response?.data?.payload || {};
      setErrorMessage(
        errorData.email ||
          errorData.password ||
          errorData.message ||
          "Registration failed."
      );
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex justify-center items-center px-3 w-full">
      <div className="max-w-[1100px] flex flex-col md:flex-row rounded-[30px] bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.1)] overflow-hidden w-full">
        {/* Left Side Form */}
        <div className="flex-[2] px-5 md:px-10 py-6">
          <h1 className="font-pally text-heading font-bold text-2xl md:text-3xl mb-2">
            Start Learning
          </h1>
          <p className="text-sm mb-3 text-[#8599b9] font-semibold">
            Do you want to learn Arabic naturally and effortlessly? Let's get
            started!
          </p>

          <div className="bg-[#DBFFDF] text-[#1CC932] px-2 py-1 rounded-[5px] w-fit mb-3 font-bold">
            No credit card required
          </div>

          {/* Full Name Input */}
          <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            id="fullname"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="w-full mb-2 bg-[#F8FAFC] rounded-xl px-4 py-3 text-base font-bold text-[#0C3373] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Email Address Input */}
          <label htmlFor="fullname">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-2 bg-[#F8FAFC] rounded-xl px-4 py-3 text-base font-bold text-[#0C3373] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Choose your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 bg-[#F8FAFC] rounded-xl px-4 py-3 text-base font-bold text-[#0C3373] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center text-[#0C3373] text-base cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            I agree to Terms and Conditions
          </label>

          {/* Sign Up Button & Illustration */}
          <div className="flex justify-between items-center flex-wrap mt-3">
            <button
              onClick={handleSignup}
              disabled={loading}
              className="relative font-medium py-3 rounded-full bg-dashboardPrimary text-white text-sm md:text-xl px-6 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            <img
              src="/make.png"
              alt="Illustration"
              className="hidden md:block w-44 h-auto"
            />
          </div>
        </div>

        {/* Right Side Box (Hidden on Small Screens) */}
        <div className="flex-1 bg-[#002f6c] hidden md:flex flex-col items-center text-white px-2 py-4 relative">
          <img src="/mylogo.webp" alt="Logo" className="w-48 h-auto" />
          <div className="absolute bottom-0 right-0">
            <img src="/shape.png" alt="Shape" className="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartLearning;
