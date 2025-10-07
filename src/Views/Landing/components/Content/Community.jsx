import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { RiDoubleQuotesR } from "react-icons/ri";
import { Container } from "@components/common";

const Community = () => {
  const testimonials = [
    {
      feedback:
        "Comprehensible input is a game-changer. I’ve never made so much progress in Arabic as I have in the last four months, just by watching videos with no subtitles. At first, I struggled with my short attention span for the language, but by sticking to content I enjoyed, my comprehension has skyrocketed.",
      name: "Callum J",
      image: "/culm.png",
    },
    {
      feedback:
        "This is incredible! Arabic is becoming fun and easy. Once a difficult, foreign language, Arabic is gradually becoming intuitive to me. I’m very grateful I discovered comprehensible input! Sending hugs 🤗 from Brazil.",
      name: "Luiza V",
      image: "/luiza.jpg",
    },
    {
      feedback:
        "At first, it felt overwhelming as I didn’t know any Arabic. But within 3 weeks of watching videos, everything started to click. It’s very satisfying. It’s incredible how natural it feels!",
      name: "Adam C",
      image: "/adam.jpg",
    },
    {
      feedback:
        "I’ve tried so many apps and courses, but it always got boring at one point. This method is much easier and more fun. I just watch videos and enjoy the process. Not sure how this works but somehow, I’m understanding more and more every day.",
      name: "Armaan A",
      image: "/arman.png",
    },
    {
      feedback:
        "The idea of learning Arabic has always been intimidating. At face, Arabic seems very complex, but once I discovered comprehensible input I never looked back. It’s by far the easiest and most fun way to learn a language.",
      name: "Arianne Z",
      image: "/ariaana.jpg",
    },
    {
      feedback:
        "I used to think I needed a teacher and textbooks to learn, but this method has proven me wrong. By simply listening and watching videos, I’ve built a strong foundation and can now follow slow conversations. I’m so excited to keep going!",
      name: "William H",
      image: "/wiliam.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const avatarPositions = [
    { top: "20%", left: "25%", size: 96 },
    { bottom: "20%", left: "17%", size: 72 },
    { top: "45%", left: "10%", size: 80 },
    { top: "20%", right: "17%", size: 72 },
    { bottom: "25%", right: "15%", size: 62 },
    { top: "45%", right: "5%", size: 96 },
  ];

  return (
    <div
      className="bg-[#f5f9ff] relative flex flex-col items-center before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-16 md:before:h-24 lg:before:h-32 before:bg-gradient-to-b before:from-transparent before:to-white after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-8 md:after:h-12 lg:after:h-16 after:bg-gradient-to-t after:from-transparent after:to-white"
      style={{
        backgroundImage:
          window.innerWidth <= 1100
            ? "none"
            : `url('/Group 6.png'), url('/Group 5.png')`,
        backgroundPosition: "820px 220px, 360px 490px",
        backgroundSize: "300px, 300px",
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <Container className="sm:w-fit w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0C3373] text-center font-pally mb-8 md:mb-12">
          Our community
        </h1>

      {avatarPositions.map((pos, index) => (
        <img
          key={index}
          src={testimonials[index % testimonials.length].image}
          alt="avatar"
          className="absolute lg:block hidden object-cover rounded-full border-2 border-gray-300 shadow-lg"
          style={{
            position: "absolute",
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            ...pos,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg h-72 sm:h-80 flex justify-center items-center">
        {testimonials.map((testimonial, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % testimonials.length;
          const isPrev =
            index ===
            (currentIndex - 1 + testimonials.length) % testimonials.length;

          return (
            <div
              key={index}
              className={`absolute h-[300px] sm:h-[350px] w-full md:w-[540px] p-4 sm:p-6 bg-white rounded-2xl shadow-lg transition-all duration-500 ${
                isActive
                  ? "z-20 scale-100 opacity-100 top-0"
                  : isNext || isPrev
                  ? "z-10 scale-95 opacity-70 top-4 sm:top-6"
                  : "z-0 scale-90 opacity-40 top-8 sm:top-12"
              }`}
            >
              <div className="flex gap-2 items-center justify-between">
                <div className="flex gap-2">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <h4 className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl font-pally font-bold text-[#0C3373]">
                    {testimonial.name}
                  </h4>
                </div>
                <div className="pr-6 sm:pr-12">
                  <RiDoubleQuotesR color="#EDF0FD" size={60} className="sm:hidden" />
                  <RiDoubleQuotesR color="#EDF0FD" size={90} className="hidden sm:block" />
                </div>
              </div>

              <p className="text-[#0C3373]/70 text-sm sm:text-base md:text-lg lg:text-xl font-HelveticaNeue text-left mt-3 sm:mt-5">
                {testimonial.feedback}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 sm:mt-24 md:mt-32 mb-8 sm:mb-12 flex justify-center items-center space-x-4 sm:space-x-6 relative z-10">
        <button
          onClick={handlePrev}
          className="bg-transparent border text-black p-3 sm:p-4 rounded-full hover:bg-heading transition hover:text-white"
        >
          <FaChevronLeft className="text-xs sm:text-sm" />
        </button>
        <button
          onClick={handleNext}
          className="bg-transparent border text-black p-3 sm:p-4 rounded-full hover:bg-heading transition hover:text-white"
        >
          <FaChevronRight className="text-xs sm:text-sm" />
        </button>
      </div>
        
      </Container>
      <div className="absolute bottom-0">
          <img src="/Path 27584.png" alt="" className="w-full h-auto" />
        </div>
    </div>
  );
};

export default Community;
