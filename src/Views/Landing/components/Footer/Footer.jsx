import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram, FaLinkedin, FaTiktok, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiFacebookCircleFill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation

const Footer = ({ sendFiltersToAPI }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const handlenavigate = () => {
    console.log("Navigating to /dashboard/videos");
    navigate("/dashboard/videos");
  };

  const handleFilterClick = () => {
    navigate("/dashboard/videos");
  };

  return (
    <>
      {/* Footer Main Section */}
      <div className="flex flex-wrap items-start justify-between pt-10 rounded-t-[48px] bg-heading md:p-6 gap-6 lg:gap-10 md:px-12 px-4">
        {/* First Section - Wider */}
        <div className="flex flex-col gap-3 flex-1 ">
          <img
            src="/footerlogoo.png"
            alt=""
            className="w-28 md:w-64 object-contain"
          />
          <p className="text-md md:text-xl text-white font-[500] font-HelveticaNeue">
            Making Arabic learning effortless, enjoyable, and immersive—anytime,
            anywhere.
          </p>
          <div className="flex items-start justify-start">
            <button
              onClick={handlenavigate}
              className="mt-6 text-xl font-HelveticaNeue bg-dashboardPrimary text-white px-6 py-4 rounded-full hover:bg-hoverbtn transition"
            >
              Start Watching Now
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="grid grid-cols-3 lg:grid-cols-4">
            <div className="text-white flex flex-col gap-5 flex-1 min-w-[150px] relative">
              <p className="md:text-2xl text-xl font-pally font-bold relative">
                Main links
                <span className="absolute bottom-0 left-0 w-14 h-[4px] rounded-lg bg-[#3B73CC]"></span>
              </p>
              <Link
                to={"/"}
                className={`text-sm hover:text-btnbackground md:text-[16px] font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Home
              </Link>
              <Link
                to={"/about"}
                className={`text-sm hover:text-btnbackground md:text-[16px] font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/about"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                About
              </Link>
              <Link
                to={"/approach"}
                className={`text-sm hover:text-btnbackground md:text-[16px] font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/approach"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Approach
              </Link>
              <Link
                to={"/pricing-page"}
                className={`text-sm hover:text-btnbackground md:text-[16px] font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/pricing-page"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Pricing
              </Link>
              <Link
                to={"/story"}
                className={`text-sm hover:text-btnbackground md:text-[16px] font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/story"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Story
              </Link>
              {/* <Link to={"/"} className="text-sm md:text-[16px] hover:text-gray-200 font-HelveticaNeue cursor-pointer">Pricing</Link> */}
            </div>
            <div className="text-white flex flex-col gap-5 flex-1 min-w-[150px] relative">
              <p className="md:text-2xl text-xl font-pally font-bold relative">
                Content
                <span className="absolute bottom-0 left-0 w-14 h-[4px] rounded-lg bg-[#3B73CC]"></span>
              </p>
              <button
                onClick={() => handleFilterClick(1)}
                className="cursor-pointer hover:text-btnbackground font-HelveticaNeue md:text-[16px] text-left"
              >
                Beginner
              </button>
              <button
                onClick={() => handleFilterClick(3)}
                className="cursor-pointer hover:text-btnbackground font-HelveticaNeue md:text-[16px] text-left"
              >
                Intermediate
              </button>
              <button
                onClick={() => handleFilterClick(5)}
                className="cursor-pointer hover:text-btnbackground font-HelveticaNeue md:text-[16px] text-left"
              >
                Advanced
              </button>
            </div>
            <div className="text-white flex flex-col  gap-5 flex-1 min-w-[150px] relative">
              <p className="md:text-2xl text-xl font-pally font-bold relative">
                Resources
                <span className="absolute bottom-0 left-0 w-[50%] h-[4px] rounded-lg bg-[#3B73CC]"></span>
              </p>
              <Link
                to={"/newdashboard/home"}
                className={`text-sm hover:text-btnbackground font-HelveticaNeue md:text-[16px] ${
                  location.pathname === "/newdashboard/home"
                    ? "text-orange-400"
                    : ""
                }`}
              >
                Community
              </Link>
              <Link
                to={"/blogs"}
                className={`text-sm hover:text-btnbackground font-HelveticaNeue md:text-[16px] ${
                  location.pathname === "/blogs" ? "text-orange-400" : ""
                }`}
              >
                Blog
              </Link>
              <Link
                to={"/faqs"}
                className={`text-sm hover:text-btnbackground font-HelveticaNeue md:text-[16px] ${
                  location.pathname === "/faqs" ? "text-orange-400" : ""
                }`}
              >
                FAQ'S
              </Link>
              <Link
                to={"/dashboard/WelcomePopup"}
                className={`text-sm hover:text-btnbackground font-HelveticaNeue md:text-[16px] ${
                  location.pathname === "/dashboard/WelcomePopup"
                    ? "text-orange-400"
                    : ""
                }`}
              >
                User Guide
              </Link>
              <Link
                to={"/contact"}
                className={`text-sm hover:text-btnbackground font-HelveticaNeue md:text-[16px] ${
                  location.pathname === "/contact" ? "text-orange-400" : ""
                }`}
              >
                Contact Us
              </Link>
            </div>
            {/* dashboard Section */}
            <div className="text-white hidden lg:flex flex-col  gap-5 flex-1 min-w-[150px] relative">
              <p className="text-2xl font-pally font-bold relative">
                Dashboard
                <span className="absolute bottom-0 left-0 w-20 h-[4px] rounded-lg bg-[#3B73CC]"></span>
              </p>
              <Link
                to={"/dashboard/videos"}
                className={`text-sm md:text-[16px] hover:text-btnbackground font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/dashboard/videos"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Videos
              </Link>
              <Link
                to={"/dashboard/series"}
                className={`text-sm md:text-[16px] hover:text-btnbackground font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/dashboard/series"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Series
              </Link>
              <Link
                to={"/dashboard/library"}
                className={`text-sm md:text-[16px] hover:text-btnbackground font-HelveticaNeue cursor-pointer ${
                  location.pathname === "/dashboard/library"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Library
              </Link>
              <Link
                to={"/dashboard/progress"}
                className={`text-sm md:text-[16px] font-HelveticaNeue hover:text-btnbackground cursor-pointer ${
                  location.pathname === "/dashboard/progress"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Progress
              </Link>
              <Link
                to={"/dashboard/resources"}
                className={`text-sm md:text-[16px] font-HelveticaNeue hover:text-btnbackground cursor-pointer ${
                  location.pathname === "/dashboard/resources"
                    ? "text-orange-400"
                    : "hover:text-btnbackground"
                }`}
              >
                Resources
              </Link>
            </div>{" "}
          </div>
          <div className="flex md:hidden gap-5 mt-10 md:mt-0">
            <a
              href="https://www.youtube.com/@ArabicAllTheTime"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiOutlineYoutube className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
            </a>
            <a
              href="https://www.tiktok.com/@arabicallthetime"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/arabicallthetime/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
            </a>
            <a
              href="https://x.com/ArabicAllTime"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567346062115#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CiFacebook className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
            </a>
          </div>
        </div>

        {/* Contact Section */}
      </div>

      {/* Footer Bottom Section */}
      <div className=" md:px-20 flex flex-wrap font-HelveticaNeue items-center justify-between border-t border-white bg-[#0c3374] text-center p-3 py-4 gap-2 md:gap-0 md:py-8 text-white text-sm">
        <div className="flex items-center gap-2">
          <Link
            to={"/terms-and-conditions"}
            className="text-md font-semibold border-r pr-2"
          >
            Terms and Conditions
          </Link>
          <Link to={"/privacy-policy"} className="text-md font-semibold">
            Privacy Policy
          </Link>
        </div>
        <h1 className="text-[14px] font-bold">© 2025. All Right Reserved</h1>
        <div className="md:flex hidden gap-5 mt-2 md:mt-0">
          <a
            href="https://www.youtube.com/@ArabicAllTheTime"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineYoutube className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
          </a>
          <a
            href="https://www.tiktok.com/@arabicallthetime"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/arabicallthetime/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
          </a>
          <a
            href="https://x.com/ArabicAllTime"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61567346062115#"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CiFacebook className="text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
