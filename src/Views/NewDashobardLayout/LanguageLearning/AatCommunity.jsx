import React, { useEffect, useState } from 'react'
import { BsFillFileRuledFill } from 'react-icons/bs'
import { CiCircleInfo } from 'react-icons/ci'
import { GiStarsStack } from 'react-icons/gi'
import { HiMiniSpeakerWave } from 'react-icons/hi2'
import { request } from '../../../services/axios'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

const AatCommunity = () => {
    const token = useSelector((state) => state.user.token)
    const [loading, setLoading] = useState(true);
    const [Stars, setStars] = useState([]);
    useEffect(() => {
        fetchData("api/statics", setStars);
    }, []);
    const fetchData = async (url, setter) => {
        setLoading(true)
        try {
            const result = await request(
                {
                    url: url,
                    method: "get",
                },
                false
            );
            setter(result?.data?.payload);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    };



    const levelColorMap = {
        "Level 1": "bg-green-500",
        "Level 2": "bg-blue-500",
        "Level 3": "bg-yellow-500",
        "Level 4": "bg-purple-500",
        "Level 5": "bg-pink-500",
        "Level 6": "bg-indigo-500",
        "Level 7": "bg-teal-500",
        "Level 8": "bg-orange-500",
        "Level 9": "bg-cyan-500",
        "Level 10": "bg-red-500",
    };

    const getLevelColor = (levelName) => {
        return levelColorMap[levelName] || "bg-gray-600";
    };


    return (
        <>
            <div className='flex flex-col gap-4 px-2 py-4'>
                <div className='flex flex-col gap-4'>
                    <h1 className='flex gap-2 text-dashboardparasize md:text-dashboardheadingsize font-bold font-pally text-heading'><CiCircleInfo className='mt-1' />AATT Community</h1>
                    <p className='text-sm text-gray-500'>Welcome to our community! This is a space where we answer questions, exchange insights and celebrate progress together.</p>
                </div>

                <hr />
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl font-bold text-dashboardparasize md:text-dashboardheadingsize text-heading font-pally flex gap-2'><BsFillFileRuledFill className='mt-1' />Rules</h1>
                    <ul className="flex flex-col gap-4 text-[#7C7C7C]">
                        <li className="flex items-start gap-2">
                            <span className="bg-[#F2CC08] text-black px-2 text-[14px] font-semibold rounded-full">1.</span> Keep it Relevant: Share and discuss topics related to Arabic acquisition, culture, and immersion.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-[#F2CC08] text-black px-2 text-[14px] font-semibold rounded-full">2.</span> Be Kind & Supportive: Everyone is on their own Arabic journey, so let’s keep the community welcoming, encouraging, and positive for all!
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="bg-[#F2CC08] text-black px-2 text-[14px] font-semibold rounded-full">3.</span> Keep It Authentic – Avoid self-promotion, sales, or unrelated content.
                        </li>
                    </ul>

                </div>
                <hr />
                <div>
                    <h1 className="text-dashboardparasize md:text-dashboardheadingsize font-bold font-pally text-heading flex gap-2">
                        <GiStarsStack className="mt-1" />Superstars
                    </h1>
                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            {/* <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div> */}
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="mt-2 space-y-6">
                            {Stars?.top_active_users?.map((user, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <img
                                        src="/doggirl.png"
                                        alt={`Profile ${index + 1}`}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="text-lg font-medium text-gray-800">{user?.name}</span>
                                    <span className={`text-xs text-white px-3 py-1 rounded-full ${getLevelColor(user?.progress_level?.name)}`}>
                                        {user?.progress_level?.name || "level 1"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                </div>


            </div>
        </>
    )
}

export default AatCommunity
