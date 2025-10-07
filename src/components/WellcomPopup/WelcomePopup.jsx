import React, { useState } from "react";
import "./WelcomePopup.css";
import { BiFontSize } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineEmojiHappy, HiOutlineEmojiSad } from "react-icons/hi";
import { RiSpeakLine, RiTranslate2 } from "react-icons/ri";
import { BsPersonHeart, BsPlayCircle } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";
import { PiCellSignalHighBold } from "react-icons/pi";
const WelcomePopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  console.log(showPopup);
  // const handleOptionSelect = (option) => {
  //   setSelectedOption(option);
  //   if (option === "new") {
  //     setStep(1);
  //   } else {
  //     navigate("/");
  //     setShowPopup(false);
  //   }
  // };

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
    setShowPopup(false);
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
    { src: "/pop1.webp", height: "280px", width: "380px" },
    { src: "/pop2.webp", height: "150px", width: "241px" },
    { src: "/pop3.webp", height: "128px", width: "194px" },
    { src: "/pop4.webp", height: "128px", width: "195px" },
    { src: "/pop5.webp", height: "234px", width: "310px" },
  ];

  return (
    showPopup && (
      <>
        <div className="overlay" onClick={handleSkip}></div>
        <div className="welcome-popup">
          <div className="relative overflow-y-scroll scrollbar-hide">
            {step === step && (
              <>
                <div className="flex items-end justify-end absolute right-0">
                  <h1
                    onClick={handleSkip}
                    className="cursor-pointer z-[99999999999] text-2xl text-gray-500 border rounded-full p-1 border-gray-500"
                  >
                    <RxCross2 />
                  </h1>
                </div>
                <div className="flex fixed left-0 right-0 z-50 md:z-10 w-full items-center justify-between bg-white px-6">
                  <img
                    src="/logopic.png"
                    alt=""
                    className="h-20 w-20 md:h-[64px]  md:w-[167px] object-contain"
                  />
                </div>
                <div className="flex items-center justify-center md:pt-0 pt-20 z-20 relative">
                  <img
                    src={images[step % images.length].src}
                    alt=""
                    className="object-contain"
                    style={{
                      height: images[step % images.length].height,
                      width: images[step % images.length].width,
                    }}
                  />
                </div>
              </>
            )}

            {step === 0 && (
              <div className="options">
                <div className="flex flex-col px-1 md:px-24 gap-4 pb-0 text-[12px] md:text-[18px] text-heading items-center justify-center">
                  <h1 className="md:leading-[28px]">
                    Enjoy the largest library of Arabic comprehensible input
                    videos, crafted to make learning Arabic fun and effortless.
                  </h1>
                  <h1 className="md:leading-[28px]">
                    Would you like to learn a bit about comprehensible input, or
                    are you ready to start watching videos now?
                  </h1>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col mb-12 px-1 md:px-24 gap-4 pb-12  text-heading items-center justify-center">
                <h1 className="text-[20px] md:text-[32px] font-bold font-pally">
                  What is comprehensible input?
                </h1>
                <div className="flex flex-col gap-4 border rounded-[16px] border-[#8FFF9D]">
                  <h1 className="text-[12px] md:text-[18px] border-b border-[#8FFF9D] p-4">
                    Comprehensible input is content you can mostly understand.
                    It is usually made clear through pictures, hand gestures,
                    facial expressions, and the context of the story.
                  </h1>
                  <h1 className="text-[12px]  md:text-[18px] p-4">
                    You will acquire everything you need to become fluent in
                    Arabic—vocabulary, grammar, and pronunciation— just by
                    watching videos. No memorization, dictionaries, or exercises
                    needed!
                  </h1>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col px-1 md:px-24 mb-20 gap-4 text-heading items-center justify-center z-50 relative">
                <h1 className="text-[20px] md:text-[32px] font-bold font-pally mt-4">
                  Things you should do!
                </h1>
                <div className="flex flex-col gap-4">
                  <ul className="text-[12px] md:text-[20px] flex flex-col gap-4">
                    <li className="border flex gap-3 rounded-[16px] border-btnbackground px-4 py-2">
                      {" "}
                      <HiOutlineEmojiSad className="mt-2 text-2xl md:text-xl" />{" "}
                      Get comfortable with not understanding every detail
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-btnbackground px-4 py-2">
                      {" "}
                      <RiTranslate2 className="mt-2 text-2xl md:text-xl" />
                      Focus on the context and overall meaning of the video
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-btnbackground px-4 py-2">
                      {" "}
                      <HiOutlineEmojiSad className="mt-2 text-2xl md:text-xl" />
                      Watch videos appropriate to your level
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-btnbackground px-4 py-2">
                      {" "}
                      <RiSpeakLine className="mt-2 text-2xl md:text-xl" />
                      Watch videos that you enjoy
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-btnbackground px-4 py-2">
                      {" "}
                      <BsPlayCircle className="mt-2 text-2xl md:text-xl" />
                      Benchmark your progress by revisiting videos{" "}
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col px-1 md:px-24 mb-20 gap-4 text-heading items-center justify-center z-50 relative">
                <h1 className="text-[20px] md:text-[32px] font-bold font-pally">
                  Things You Shouldn’t Do!
                </h1>
                <div className="flex flex-col gap-4">
                  <ul className="text-[12px] md:text-[20px] flex flex-col gap-4">
                    <li className="border flex gap-3 rounded-[16px] border-[#1CC932] px-4 py-2">
                      {" "}
                      <HiOutlineEmojiHappy className="mt-2 text-2xl md:text-xl" />{" "}
                      Don't worry if you don't understand everything
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-[#1CC932] px-4 py-2">
                      {" "}
                      <FaHeadphones className="mt-2 text-2xl md:text-xl" />
                      Don’t translate words you don’t understand
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-[#1CC932] px-4 py-2">
                      {" "}
                      <PiCellSignalHighBold className="mt-2 text-2xl md:text-xl" />
                      Don’t try to memorize words or analyze grammar
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-[#1CC932] px-4 py-2">
                      {" "}
                      <BsPersonHeart className="mt-2 text-2xl md:text-xl" />
                      Don’t take notes or repeat after the speaker
                    </li>
                    <li className="border flex gap-3 rounded-[16px] border-[#1CC932] px-4 py-2">
                      {" "}
                      <BsPlayCircle className="mt-2 text-2xl md:text-xl" />
                      Don’t watch something too difficult
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col px-1 md:px-24 gap-4 text-heading items-center justify-center">
                <h1 className="text-[20px] md:text-[32px] font-bold font-pally">
                  Comprehensible input really works!
                </h1>
                <h1 className="text-[12px] md:text-[20px]">
                  Read about the science behind comprehensible input and its
                  proven success, or dive straight into learning Arabic by
                  watching your first video now!
                </h1>
                <div className="flex flex-col gap-4 p-4">
                  <button
                    className="border border-btnbackground text-btnbackground text-[10px] md:text-[20px] px-4 py-2 rounded-full"
                    onClick={() => navigate("/approach")}
                  >
                    Learn More About Our Approach
                  </button>
                  <button
                    className="bg-btnbackground text-[10px] md:text-[20px] text-white px-4 py-2 rounded-full"
                    onClick={handleSkip}
                  >
                    Start Watching Now
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
              className="fixed left-0 right-0 bottom-0 bg-white z-50 px-1 md:px-6 py-2"
            >
              {step === 0 && (
                <>
                  <button
                    className="border border-btnbackground text-btnbackground text-[10px] md:text-[20px] px-2 md:px-6 py-2 rounded-full"
                    onClick={handleSkip}
                  >
                    Start Watching Now
                  </button>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map((index) => (
                      <div
                        key={index}
                        className={`h-3 w-3 rounded-full ${
                          step === index ? "bg-[#1CC932]" : "bg-[#ACFFB6]"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    className="bg-btnbackground text-[10px] md:text-[20px] text-white px-2 md:px-6 py-2 rounded-full"
                    onClick={handleNext}
                  >
                    Tell Me More!
                  </button>
                </>
              )}

              {(step === 1 || step === 2 || step === 3) && (
                <div className="flex  flex-row items-center justify-between w-full gap-4 sm:gap-8 mt-6">
                  {/* Previous Button */}
                  <button
                    className="border border-btnbackground text-btnbackground text-[10px] md:text-[20px] px-2 md:px-6 py-2 rounded-full w-full sm:w-auto"
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
                    className="bg-btnbackground text-[10px] md:text-[20px] text-white px-2 md:px-6 py-2 rounded-full w-full sm:w-auto"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default WelcomePopup;
