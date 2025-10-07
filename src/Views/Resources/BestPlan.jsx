import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import CookingColombian from '../../Views/WatchSeries/CookingColombian'
import { useDispatch } from "react-redux";
import ToastComp from "../../components/toast/ToastComp";
import { setSeriesList } from "../../store/SeriesSlice/seriesSlice";
import { request } from "../../services/axios";


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
const BestPlan = () => {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await request({
                    url: "api/series",
                    method: "get",
                });

                if (response?.status === 200) {
                    setSeries(response.data.payload);
                    dispatch(setSeriesList(response.data.payload));
                }
            } catch (error) {
                ToastComp({
                    variant: "error",
                    message: "Failed to fetch videos. Please try again later.",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, [dispatch]);

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6">
                    <h1 className="text-[24px] font-bold font-pally text-primary py-10">Membership Settings</h1>

                    <div className="border rounded-2xl bg-heading text-white shadow-md p-7  w-[394px] h-auto relative">
                        <span className="text-[12px] px-4 py-2 rounded-full border border-[#C9DEFC] bg-gradient-to-r from-[#C9DEFC] to-[#FCFCFC] font-bold font-HelveticaNeue text-primary">Yearly Plan</span>
                        <div className="flex flex-col items-center text-center">

                            <img src="/Ellipse 54.png" alt="" className="absolute left-[75px] rounded-lg top-0" />
                            <span className="absolute font-HelveticaNeue top-0 right-6 text-xs text-white px-3 py-1 flex flex-col items-center justify-center w-[30px] h-[80px]">
                                <img src="/Rectangle 5187.png" alt="" className="absolute inset-0 w-full h-full" />
                                <span className="relative left-4 bottom-4 rotate-90 origin-left inline-block">Yearly Plan</span>
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
                    <Box className="px-6 sm:px-[32px] pt-[32px] font-helvetica">
                        <Typography
                            variant="h5"
                            className="font-pally text-heading text-[32px] font-bold"
                        >
                            You have our best plan!
                        </Typography>
                        <Typography
                            variant="h5"
                            className="font-HelveticaNeue text-[#55709d] text-[18px] font-semibold"
                        >
                            Learn Arabic naturally and effortlessly!
                        </Typography>
                        <div className="relative">
                            <div className="pt-10">
                                <img src="/best2.jpeg" alt="" className="w-[441px] h-[298px]" />
                            </div>

                            <div className="absolute sm:top-0 md:top-20 left-0 lg:-bottom-16 md:-left-20 w-full p-4 md:p-10">
                                <div className="absolute lg:block hidden lg:-top-20 lg:-right-44 w-full p-4 md:p-10">
                                    <img src="/progres.png" alt="" className="h-[180px] w-[296px] object-contain" />
                                </div>
                                <div className="flex bg-white rounded-lg shadow-md p-4 md:p-6 ">
                                    <div className="flex flex-col items-start justify-">
                                        <div className="flex items-center">
                                            <div className="bg-orange-100 text-orange-500 w-[128px] text-center rounded-md p-1 mr-4">
                                                <span className="text-xl font-pally font-semibold">22</span>
                                                <p className="text-md font-semibold text-[#3b73cc]">Total Hours</p>
                                            </div>
                                            <div className="flex items-center gap-2 mr-4">
                                                <img src="/flame-icon 1svg 1.png" alt="" className="h-7 w-7" />
                                                <span className="text-xl font-pally font-semibold">34</span>
                                            </div>
                                        </div>

                                        {/* Right Section */}

                                        <div className="flex items-center mt-4">
                                            <div className="relative flex items-center mr-4">
                                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                                                    <img src="/Clip path group (1).png" alt="" className="h-[35px] w-[35px] object-contain" />
                                                </div>
                                                <span className="ml-2 text-xl font-pally font-semibold">75%</span>
                                            </div>
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <img src="/Clip path group.png" alt="" className="h-[35px] w-[35px] object-contain" />
                                                </div>
                                                <span className="ml-2 text-xl font-pally font-semibold">54</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img src="/circle.png" alt="" className="h-[170px] lg:block hidden w-[170px] object-contain" />
                                    </div>

                                </div>
                            </div>
                        </div>

                    </Box>
                    <div className="mt-44 md:mt-4">
                        <CookingColombian series={series} />
                    </div>

                </div>
            </div>

        </>

    );
};

export default BestPlan;