import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { GrLinkNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ResetModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [step, setStep] = useState(0); // 0: email, 1: otp, 2: password, 3: success
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://admin.arabicallthetime.com/api/forgotPassword", {
        email: email
      });
      
      if (response.data.success) {
        toast.success("OTP sent to your email successfully!");
        setStep(1);
      } else {
        toast.error(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeOtp = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDownOtp = (e, index) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      toast.error("Please enter complete OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://admin.arabicallthetime.com/api/verifyOtp", {
        email: email,
        otp: otpCode,
        type: "forgot_password"
      });
      console.log(response,'responsesndjkcndjk')
      
      if (response.data.success) {
        toast.success("OTP verified successfully!");
        setVerificationToken(response.data.payload || otpCode);
        setOtp(["", "", "", ""]);
        setStep(2);
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://admin.arabicallthetime.com/api/newPassword", {
        email: email,
        password: newPassword,
        password_confirmation: confirmPassword,
        verification_token: verificationToken
      });
      
      if (response.data.success) {
        toast.success("Password changed successfully!");
        setStep(3);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post("https://admin.arabicallthetime.com/api/forgotPassword", {
        email: email
      });
      
      if (response.data.success) {
        toast.success("OTP resent successfully!");
        setOtp(["", "", "", ""]);
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDone = () => {
    setStep(0);
    setEmail("");
    setOtp(["", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setVerificationToken("");
    onClose();
    navigate("/sign-in");
  };

  const handleClose = () => {
    setStep(0);
    setEmail("");
    setOtp(["", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setVerificationToken("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-5 z-50 ">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-[594px]">
        {step !== 3 && (
          <div className="flex justify-between items-center">
            <h2 className="text-[24px] text-primary font-semibold font-pally">
              {step === 0 ? "Forgot Password" : step === 1 ? "Verify OTP" : step === 2 ? "Create new password" : ""}
            </h2>
            <button onClick={handleClose} className="p-2 rounded-lg bg-[#E4EFFF]">
              <RxCross1 className="text-2xl text-primary p-1" />
            </button>
          </div>
        )}

        <div className="flex flex-col gap-6 py-4">
          <img
            src={
              step === 0
                ? "/resetpic.png"
                : step === 1
                ? "/resetpic.png"
                : step === 2
                ? "/password.png"
                : "/verify.png"
            }
            alt="Step Image"
            className={`object-contain mx-auto ${step === 0 || step === 1
              ? "h-[114px] w-[127px]"
              : step === 2
              ? "h-[135px] w-[206px]"
              : "h-[123px] w-[123px]"
            }`}
          />

          {step === 3 ? (
            <>
              <p className="text-primary font-HelveticaNeue text-[32px] font-semibold text-center">
                You've successfully changed your password.
              </p>
              <button
                onClick={handleDone}
                className="w-[60%] mx-auto font-HelveticaNeue bg-orange-500 text-white py-3 rounded-full font-medium text-lg"
              >
                Done
              </button>
            </>
          ) : step === 0 ? (
            <>
              <p className="text-primary text-[16px] text-start">
                Please enter your email address to receive a verification code.
              </p>
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold text-[#0C3373]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 rounded-lg bg-[#F8FAFC] border-2 w-full text-primary text-lg outline-primary"
                />
              </div>
              <button
                onClick={handleEmailSubmit}
                disabled={loading || !email}
                className={`w-[60%] mx-auto flex items-center justify-center gap-3 text-white py-3 rounded-full font-medium text-lg ${
                  loading || !email
                    ? "bg-orange-400 cursor-not-allowed"
                    : "bg-[#F28327]"
                }`}
              >
                {loading ? "Sending..." : "Send OTP"}
                {!loading && <GrLinkNext className="bg-[#FFFFFF33] rounded-[8px] text-3xl p-1" />}
              </button>
            </>
          ) : step === 1 ? (
            <>
              <p className="text-primary text-[16px] text-start">
                Please enter the 4-digit verification code that was sent to your email.
              </p>
              <p className="text-[#0C3373] font-semibold text-start">
                Verification code was sent to:{" "}
                <span className="text-gray-500">{email}</span>
              </p>

              <div className="flex gap-4 items-center justify-center mt-3">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    value={value}
                    onChange={(e) => handleChangeOtp(e, index)}
                    onKeyDown={(e) => handleKeyDownOtp(e, index)}
                    type="text"
                    maxLength="1"
                    className="p-3 rounded-lg bg-[#CDE1FF] border-2 w-12 text-primary sm:w-16 text-center text-xl outline-primary"
                  />
                ))}
              </div>

              <button
                onClick={handleOtpVerification}
                disabled={otp.some((digit) => digit === "") || loading}
                className={`w-[60%] mx-auto flex items-center justify-center gap-3 text-white py-3 rounded-full font-medium text-lg ${
                  otp.some((digit) => digit === "") || loading
                    ? "bg-orange-400 cursor-not-allowed"
                    : "bg-[#F28327]"
                }`}
              >
                {loading ? "Verifying..." : "Continue"}
                {!loading && <GrLinkNext className="bg-[#FFFFFF33] rounded-[8px] text-3xl p-1" />}
              </button>

              <p className="text-center text-sm text-primary font-semibold mt-2">
                Haven't got the email yet?{" "}
                <span 
                  onClick={handleResendOtp} 
                  className="text-orange-500 cursor-pointer"
                >
                  {loading ? "Resending..." : "Re-send code"}
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="text-primary text-[16px] text-start font-[500]">
                Please enter a new password. Your new password must be different from the previous password.
              </p>
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold text-[#0C3373]">
                  New password
                </label>
                <input
                  type="password"
                  placeholder="Write your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="p-3 rounded-lg bg-[#F8FAFC] border-2 w-full text-primary text-lg outline-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold text-[#0C3373]">
                  Confirm new password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-3 rounded-lg bg-[#F8FAFC] border-2 w-full text-primary text-lg outline-primary"
                />
              </div>
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}

              <button
                onClick={handlePasswordReset}
                disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                className={`w-[60%] mx-auto flex items-center justify-center gap-3 text-white py-3 rounded-full font-medium text-lg ${
                  loading || !newPassword || !confirmPassword || newPassword !== confirmPassword
                    ? "bg-orange-400 cursor-not-allowed"
                    : "bg-[#F28327]"
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
                {!loading && <GrLinkNext className="bg-[#FFFFFF33] rounded-[8px] text-3xl p-1" />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetModal;