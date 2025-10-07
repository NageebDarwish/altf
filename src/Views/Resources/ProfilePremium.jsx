import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const benefits = [
  {
    title: "Premium videos added daily",
    description: "Enjoy two exclusive videos daily!",
  },
  {
    title: "Premium video series",
    description: "Exclusive video series for premium members!",
  },
  {
    title: "Ability to watch videos offline",
    description: "Watch videos anytime, anywhere!",
  },

];
const ProfilePremium = () => {
   const navigate=useNavigate()
    const onTryClick=()=>{
      navigate('/pricing-page')
    }
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-6">
          <h1 className="text-[24px] font-bold font-pally text-primary py-10">Membership Settings</h1>

          <div className="border rounded-2xl bg-heading text-white shadow-md p-7  w-[394px] h-auto relative">
            <span className="text-[12px] px-4 py-2 rounded-full border border-[#C9DEFC] bg-gradient-to-r from-[#C9DEFC] to-[#FCFCFC] font-bold font-HelveticaNeue text-primary">Monthly Plan</span>
            <div className="flex flex-col items-center text-center">

              <img src="/Ellipse 54.png" alt="" className="absolute left-[75px] rounded-lg top-0" />
              <span className="absolute font-HelveticaNeue top-0 right-6 text-xs text-white px-3 py-1 flex flex-col items-center justify-center w-[30px] h-[80px]">
                <img src="/Rectangle 5187.png" alt="" className="absolute inset-0 w-full h-full" />
                <span className="relative bottom-4 left-5 rotate-90 origin-left inline-block">Monthly Plan</span>
              </span>

              <h3 className="text-yellow-400 font-pally text-xl md:text-[44px] py-8 px-5 font-bold z-30">
                Premium
              </h3>
              <p className="text-xl sm:text-2xl text-[#FFF1E6] font-semibold text-center px-3 py-3">



                Your Premium membership gives you access to:

              </p>
              <p className="mb-3 font-HelveticaNeue text-[#B6C2D5] text-[14px] font-bold  mt-2">Get More With Premium</p>
            </div>
            <div className="bg-white p-6 w-full rounded-md flex flex-col h-full">
              <ul className="text-[#0C3373] font-HelveticaNeue space-y-3 text-sm sm:text-base text-left flex-grow font-bold">
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Our entire video library
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Advanced progress tracking
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Community forums
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Premium videos added daily
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Premium video series
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Ability to watch videos offline
                </li>
              </ul>
              <button
                className="bg-transparent text-[10px] font-HelveticaNeue text-[#6d85ab] underline px-4 rounded-full mt-9 w-full  transition"
              >
                Manage My Membership
              </button>

            </div>
          </div>

        </div>
        <div className="col-span-12 lg:col-span-6">
          <Box className="font-helvetica">
            <Typography
              variant="h5"
              className="font-pally text-heading text-[32px] font-bold"
            >
              Upgrade to Yearly plan
            </Typography>
            <Typography
              variant="h5"
              className="font-HelveticaNeue text-[#55709d] text-[18px] font-semibold"
            >
              Switch to a yearly membership and save 33%!
            </Typography>
            <div className="mt-4 rounded-md bg-[#0C3373] p-4 relative">
              <div className="bg-[#e63946] text-white text-xs font-semibold py-1 px-2 rounded-tl-md rounded-br-md absolute top-0 left-0">
                Recommended plan
              </div>
              <div className="absolute -top-3 -right-4">
                <BsFillCheckCircleFill className="text-2xl text-[#2CE243] " />

              </div>
              <div className="flex items-center justify-between mt-6">
                <Typography className="font-bold text-lg text-white">
                  Yearly Membership
                </Typography>
                <Typography className="font-bold text-lg text-white">
                  $9.99/MONTH
                </Typography>
              </div>
            </div>
            <div className="mt-6 rounded-md bg-white border border-[#1cc932] w-[90%] mx-auto p-4 relative">
              <span className="bg-[#1cc932] text-white text-xs font-semibold py-1 px-2 rounded-tl-md rounded-br-md top-0 absolute left-0 ">
                Current plan
              </span>
              <div className="flex items-center justify-between mt-6">
                <Typography className="font-semibold text-lg text-primary">
                  Monthly Membership
                </Typography>
                <Typography className="font-bold text-lg text-primary">
                  $14.99/MONTH
                </Typography>
              </div>
            </div>

          </Box>
          <div className="relative rounded-md overflow-hidden p-4 mt-6">
            <img src="/profilebg.png" alt="Premium Background" className="w-full h-[185px]" />
            <div className="absolute top-0  w-full h-full flex flex-col items-center justify-center  text-white p-6">
              <p className="text-[24px] font-semibold font-pally mb-4 text-center">
                Purchase a yearly membership <br /> and <span className="text-yellow-400">save 33%.</span>
              </p>
              <button
                onClick={onTryClick}
                className="bg-orange-500 border-4 border-[#FCBB86] hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full">
                Try Now
              </button>
            </div>
          </div>
        </div>
      </div>

    </>

  );
};

export default ProfilePremium;