import React, { useState } from "react";
import "./Guidepopup.css";
import { BiFontSize } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";
import { RiSpeakLine, RiTranslate2 } from "react-icons/ri";
import { BsPersonHeart, BsPlayCircle } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";
import { PiCellSignalHighBold } from "react-icons/pi";
const GuidePopup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "new") {
      setStep(1);
    } else {
      navigate("/");
      setShowPopup(false);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep((prevStep) => prevStep + 1);
    } else {
      setShowPopup(false);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : prevStep));
  };

  const handleSkip = () => {
    navigate("/dashboard/resources");
  };

  const handlenavigate = () => {
    navigate("/dashboard/resources");
  };

  const handleNavigateToTeachingMethod = () => {
    navigate("/resources/our-method");
    setShowPopup(false);
  };

  const handleNavigateToMethodPage = () => {
    navigate("/videos");
    setShowPopup(false);
  };

  const images = [
    { src: "/pop1.png", height: "280px", width: "394px" },
    { src: "/pop2.png", height: "161px", width: "246px" },
    { src: "/pop3.png", height: "161px", width: "246px" },
    { src: "/pop4.png", height: "161px", width: "246px" },
    { src: "/pop5.png", height: "234px", width: "310px" },
  ];
  return (
    showPopup && (
      <>
        <div className="overlay" onClick={handleSkip}></div>
        <div className="welcome-popup">
          {step === step && (
            <>
              <div className="flex items-center justify-between mb-4">
                <img
                  src="/logopic.png"
                  alt=""
                  className="h-[48px] w-[120px] md:h-[64px] md:w-[167px] object-contain"
                />
                <h1
                  onClick={handleSkip}
                  className="cursor-pointer text-xl md:text-xl text-gray-500 border rounded-full p-1 border-gray-500"
                >
                  <RxCross2 />
                </h1>
              </div>
              <div className="flex items-center justify-center mb-2">
                <img
                  src={images[step % images.length].src}
                  alt=""
                  className="w-1/4 max-w-full"
                  style={{
                    maxWidth: images[step % images.length].width,
                    maxHeight: images[step % images.length].height,
                  }}
                />
              </div>
            </>
          )}

          {step === 0 && (
            <div className="options">
              <div className="flex flex-col px-4 md:px-24 gap-4 text-[12px] md:text-[20px] text-heading items-center justify-center">
                <h1 className="leading-[24px] md:leading-[28px] text-center">
                  Enjoy the largest library of Arabic comprehensible input
                  videos, crafted to make learning Arabic fun and effortless.
                </h1>
                <h1 className="leading-[24px] md:leading-[28px] text-center">
                  Would you like to learn a bit about comprehensible input, or
                  are you ready to start watching videos now?
                </h1>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col px-4 md:px-24 gap-4 text-heading items-center justify-center">
              <h1 className="text-[18px] md:text-[26px] font-bold font-pally text-center">
                What is comprehensible input?
              </h1>
              <div className="flex flex-col gap-4 border rounded-[16px] border-[#8FFF9D] w-full">
                <h1 className="text-[12px] md:text-[20px] border-b border-[#8FFF9D] p-4 text-center md:text-left">
                  Comprehensible input is content you can mostly understand. It
                  is usually made clear through pictures, hand gestures, facial
                  expressions, and the context of the story.
                </h1>
                <h1 className="text-[12px] md:text-[20px] p-4 text-center md:text-left">
                  You will acquire everything you need to become fluent in
                  Arabic—vocabulary, grammar, and pronunciation— just by
                  watching videos. No memorization, dictionaries, or exercises
                  needed!
                </h1>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col px-4 md:px-24 gap-2 text-heading items-center justify-center">
              <h1 className="text-[18px] md:text-[26px] font-bold font-pally mt-2 text-center">
                Things you should do!
              </h1>
              <div className="flex flex-col gap-4 p-2 md:p-4 w-full">
                <ul className="text-[12px] md:text-[20px] flex flex-col gap-3 md:gap-4">
                  <li className="border flex gap-3 rounded-[16px] border-btnbackground p-3 md:p-4">
                    <HiOutlineEmojiSad className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" /> 
                    <span>Get comfortable with not understanding every detail</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-btnbackground p-3 md:p-4">
                    <RiTranslate2 className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Focus on the context and overall meaning of the video</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-btnbackground p-3 md:p-4">
                    <HiOutlineEmojiSad className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Watch videos appropriate to your level</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-btnbackground p-3 md:p-4">
                    <RiSpeakLine className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Watch videos that you enjoy</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-btnbackground p-3 md:p-4">
                    <BsPlayCircle className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Benchmark your progress by revisiting videos</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col px-4 md:px-24 gap-4 text-heading items-center justify-center">
              <h1 className="text-[24px] md:text-[26px] font-bold font-pally text-center">
                Things You Shouldn't Do!
              </h1>
              <div className="flex flex-col gap-4 p-2 md:p-4 w-full">
                <ul className="text-[12px] md:text-[20px] flex flex-col gap-3 md:gap-4">
                  <li className="border flex gap-3 rounded-[16px] border-[#1CC932] p-3 md:p-4">
                    <HiOutlineEmojiHappy className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" /> 
                    <span>Don't worry if you don't understand everything</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-[#1CC932] p-3 md:p-4">
                    <FaHeadphones className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Don't translate words you don't understand</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-[#1CC932] p-3 md:p-4">
                    <PiCellSignalHighBold className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Don't try to memorize words or analyze grammar</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-[#1CC932] p-3 md:p-4">
                    <BsPersonHeart className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Don't take notes or repeat after the speaker</span>
                  </li>
                  <li className="border flex gap-3 rounded-[16px] border-[#1CC932] p-3 md:p-4">
                    <BsPlayCircle className="mt-1 md:mt-2 flex-shrink-0 text-xl md:text-xl" />
                    <span>Don't watch something too difficult</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col px-4 md:px-24 gap-4 text-heading items-center justify-center">
              <h1 className="text-[24px] md:text-[26px] font-bold font-pally text-center">
                Comprehensible input really works!
              </h1>
              <h1 className="text-[12px] md:text-[20px] text-center">
                Read about the science behind comprehensible input and its
                proven success, or dive straight into learning Arabic by
                watching your first video now!
              </h1>
              <div className="flex flex-col gap-4 p-4 w-full">
                <button
                  className="border border-btnbackground text-btnbackground text-[12px] md:text-[20px] px-4 py-2 rounded-full w-full md:w-auto"
                  onClick={() => navigate("/approach")}
                >
                  Learn More About Our Approach
                </button>
                <button
                  className="bg-btnbackground text-[12px] md:text-[20px] text-white px-4 py-2 rounded-full w-full md:w-auto"
                  onClick={handlenavigate}
                >
                  Resources
                </button>
              </div>
            </div>
          )}

          <div
            style={{
              margin: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {step === 0 && (
              <>
                <button
                  className="border border-btnbackground text-btnbackground text-[12px] md:text-[20px] px-4 md:px-6 py-2 rounded-full"
                  onClick={() => navigate("/dashboard/videos")}
                >
                  Start Watching Now
                </button>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-2 md:h-3 w-2 md:w-3 rounded-full ${
                        step === index ? "bg-[#1CC932]" : "bg-[#ACFFB6]"
                      }`}
                    />
                  ))}
                </div>
                <button
                  className="bg-btnbackground text-[12px] md:text-[20px] text-white px-4 md:px-6 py-2 rounded-full"
                  onClick={handleNext}
                >
                  Tell Me More!
                </button>
              </>
            )}

            {(step === 1 || step === 2 || step === 3) && (
              <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 sm:gap-8 mt-4">
                {/* Previous Button */}
                <button
                  className="border border-btnbackground text-btnbackground text-[12px] sm:text-[20px] px-4 sm:px-6 py-2 rounded-full w-full sm:w-auto"
                  onClick={handlePrevious}
                >
                  Previous
                </button>

                {/* Step Indicator Dots */}
                <div className="flex gap-2 justify-center">
                  {[0, 1, 2, 3].map((index) => (
                    <div
                      key={index}
                      className={`h-2 sm:h-3 w-2 sm:w-3 rounded-full transition-all duration-300 ${
                        step === index ? "bg-[#1CC932]" : "bg-[#ACFFB6]"
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  className="bg-btnbackground text-[12px] sm:text-[20px] text-white px-4 sm:px-6 py-2 rounded-full w-full sm:w-auto"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    )
  );
};

export default GuidePopup;
