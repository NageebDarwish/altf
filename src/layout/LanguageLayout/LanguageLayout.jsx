import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LanguageHeader from "./LanguageHeader";
import { IoMenu } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdLock } from "react-icons/md";

const LanguageLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const isNewDashboard = location.pathname !== "/newdashboard/createpost";
    const isPremium = useSelector((state) => state?.user?.user?.is_premium)
    const [showModal, setShowModal] = useState(false);


    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark h-screen flex flex-col">
            <LanguageHeader />

            <button
                onClick={() => setSidebarOpen(prev => !prev)}
                className="fixed top-20 left-0 z-[50] md:hidden p-2 ml-2 bg-gray-800 text-white rounded"
            >
                {sidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
            </button>

            <div className="flex flex-1 overflow-hidden z-30">
                <div className="overflow-y-auto"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}

                >
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                </div>

                <div
                    style={{ backgroundColor: "#f3f2f7", scrollbarWidth: "none", msOverflowStyle: "none" }}
                    className="relative flex flex-1 overflow-y-auto w-full h-[calc(90vh)] bg-cover bg-center"
                >
                    <main className={`relative z-20 flex flex-col w-full text-black`}>
                        <div className={`flex-1 rounded-lg shadow-sm ${isNewDashboard ? "p-3 xs:pl-6" : "p-6"}`}>
                            {/* {isPremium == 1 ? (
                                <Outlet />
                            ) : (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white max-w-md w-full mx-4 p-8 rounded-2xl shadow-2xl text-center">
                                        <h2 className="text-2xl flex font-extrabold gap-2 text-center items-center justify-center text-gray-800 mb-4">Premium Feature <MdLock className="mt-1" /></h2>
                                        <p className="text-gray-600 mb-6">
                                            This content is only available for premium users. Unlock exclusive access by upgrading now.
                                        </p>
                                        <button
                                            onClick={() => navigate("/pricing-page")}
                                            className="bg-gradient-to-r from-[#e89035] to-[#e8710f] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:from-[#e8710f] hover:to-[#e89035] transition duration-300"
                                        >
                                            Buy Premium
                                        </button>
                                    </div>
                                </div>
                            )} */}
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LanguageLayout;
