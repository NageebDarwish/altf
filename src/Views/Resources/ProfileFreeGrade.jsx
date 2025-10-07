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
const ProfileFreeGrade = () => {
  const navigate=useNavigate()
  const onGoPremiumClick=()=>{
    navigate('/pricing-page')
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-6">
          <h1 className="text-[24px] font-bold font-pally text-primary py-10">Membership Settings</h1>
          <div className="border rounded-2xl bg-white shadow-md p-6  lg:w-[394px] h-auto">

            <span className="text-[12px] px-4 py-2 rounded-full border border-[#C9DEFC] bg-gradient-to-r from-[#C9DEFC] to-[#FCFCFC] font-bold font-HelveticaNeue text-primary">Free plan</span>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-green-500 font-pally text-[44px] px-5 py-5 font-bold">
                Free
              </h3>
              <p className="text-3xl font-bold text-[48px] text-heading">$0</p>
              <p className="mb-2 font-HelveticaNeue text-[14px] font-bold text-heading mt-6">
                Start for Free
              </p>
            </div>
            <div className="bg-[#FAFCFF] w-full p-6 rounded-lg flex flex-col h-full">
              <ul className="text-heading font-HelveticaNeue space-y-4 text-sm text-left flex-grow">
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Free videos
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Progress tracking
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Community forums
                </li>
                <li className="text-[#CAD4E3] mt-2 line-through font-bold">
                  Exclusive videos added daily
                </li>
                <li className="text-[#CAD4E3] line-through font-bold">Premium video series</li>
                <li className="text-[#CAD4E3] line-through font-bold">Ability to watch videos offline</li>
              </ul>
              <button
                className="bg-transparent  text-xl font-HelveticaNeue text-[#6d85ab] underline px-4 py-3 rounded-full mt-9 w-full  transition"
              >
                Delete My Account
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
              Upgrade to Premium plan
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: '20px' }}>
              {benefits.map((benefit, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    p: 2,
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "start", md: "start" },
                    // width: { xs: "100%", md: "976px" },
                    width: {
                      md: index % 3 === 0
                        ? "350px"
                        : index % 3 === 1
                          ? "400px"
                          : index % 3 === 2
                            ? "350px"
                            : "1067px"
                    },
                    mt: 1,
                    textAlign: "left",
                    boxShadow: "0 12px 16px rgba(0, 0, 0, 0.1)",
                    marginLeft: { md: index % 2 === 0 ? "0px" : "auto" },
                    marginRight: { md: index % 2 !== 0 ? "0px" : "auto" },
                  }}
                >
                  <div className="flex justify-between gap-10">
                    <Typography className="font-pally text-xl text-heading" >
                      <h1 className=" text-[16px] font-bold" > {benefit.title}</h1>
                      <h1 className="font-HelveticaNeue text-[14px]"> {benefit.description}</h1>
                    </Typography>
                    <BsFillCheckCircleFill className="text-3xl text-[#50AB50] mt-4" />
                  </div>
                </Paper>
              ))}
            </Box>

          </Box>
          <div className="relative rounded-md overflow-hidden md:left-20 p-4 w-full md:w-[394px]">
            <img src="/profilebg.png" alt="Premium Background" className="md:w-[394px] h-[185px]" />
            <div className="absolute top-0  left-0 w-full h-full flex flex-col items-center justify-center  text-white md:p-6">
              <p className="text-[20px] font-semibold mb-4 text-center">
                Upgrade to <span className="text-yellow-400">Premium</span> to learn <br /> Arabic faster!
              </p>
              <button
                onClick={onGoPremiumClick}
                className="bg-orange-500 border-4 border-[#FCBB86] hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full">
                Go Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default ProfileFreeGrade;