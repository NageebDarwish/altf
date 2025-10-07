import React, { useEffect, useState } from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Container from "../../../components/common/Container";

const StoryTop = ({
  activeSection,
  setActiveSection,
  scrollToSection = { scrollToSection },
}) => {
  return (
    <Container className="mt-12">
      <div className="flex flex-col gap-6 lg:flex-row-reverse items-start bg-white text-gray-800">
      {/* Left Section */}
      <div className="lg:w-2/4 w-full">
        <div className="bg-[#0C3373] flex flex-col lg:flex-row rounded-xl text-white p-4 sm:p-6 gap-4 sm:gap-6 justify-between shadow-lg relative">
          <div className="relative w-full flex-1 flex justify-start">
            <img
              src="/picture.png"
              alt="Hasan"
              className="w-full h-auto lg:h-[304px] rounded-sm object-cover"
            />

            <div className="absolute bottom-0 left-0 w-full h-[100px] max-w-[264px] bg-gradient-to-t rounded-lg from-black to-transparent"></div>

            <div className="absolute bottom-3 left-3 text-white">
              <p className="font-bold font-pally text-2xl">Hasan</p>
              <p className="text-md font-bold font-he">Founder</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:gap-4 flex-1">
            <h3 className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-[44px] font-pally font-bold mb-4">
              Our story
            </h3>
            <p className="mt-3 sm:mt-6 font-HelveticaNeue text-base sm:text-xl font-[500] text-white">
              From the challenges of traditional language learning to
              discovering the most effective approach for acquiring a new
              language.
            </p>
            {/* Icons */}
            <div className="flex gap-3 sm:gap-4 mt-3 justify-start">
              <a
                href="https://www.youtube.com/@ArabicAllTheTime"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineYoutube className="text-lg sm:text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
              </a>
              <a
                href="https://www.tiktok.com/@arabicallthetime"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTiktok className="text-lg sm:text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/arabicallthetime/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-lg sm:text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
              </a>
              <a
                href="https://x.com/ArabicAllTime"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter className="text-lg sm:text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61567346062115#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CiFacebook className="text-lg sm:text-xl md:text-2xl text-white hover:text-gray-200 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>

        {/* Story Overview Section */}
        <div className="flex flex-col items-start gap-3 text-left mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-heading font-pally mb-6">
            Our story
          </h2>
          {/* <p
            onClick={() => scrollToSection("section1")}
            className={`cursor-pointer font-HelveticaNeue mb-3 py-3 pl-3 text-md ${activeSection === id ? "border-l-4 font-bold border-heading text-heading" : "hover:text-heading text-heading/50"}`}
          >
            From struggle to inspiration
          </p> */}

          <div className="flex flex-col relative md:flex-row justify-between items-start space-y-4 md:space-y-0">
            <ul className="text-heading/50 flex flex-col gap-3 sm:gap-5 font-HelveticaNeue space-y-2 sm:space-y-3 text-sm sm:text-md pl-3 text-left">
              {[
                { id: "section1", text: "From struggle to inspiration" },
                {
                  id: "section2",
                  text: "Falling in love with Spanish and a new way of learning",
                },
                { id: "section3", text: "A life-changing discovery" },
                { id: "section4", text: "A vision for Arabic learners" },
                { id: "section5", text: "Arabic All The Time was born" },
              ].map(({ id, text }) => (
                <li
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`cursor-pointer ${
                    activeSection === id
                      ? "border-l-4 font-bold border-heading text-heading pl-3"
                      : "hover:text-heading"
                  }`}
                >
                  {text}
                </li>
              ))}
            </ul>

            <img
              src="/maps.png"
              alt="World Map"
              className="absolute -right-60 w-[230px] h-[200px] bottom-[90px] hidden lg:block"
            />
          </div>
        </div>

        {/* Profile Image */}
        <img
          src="/mapsApp.png"
          alt="Hasan"
          className="w-full rounded-sm object-cover object-center"
        />
      </div>

      {/* Right Section */}

      <div className="lg:w-3/5 w-full">
        <section id="section1">
          <h2 className="text-lg sm:text-textsmallheading font-semibold md:text-[44px] font-pally text-heading text-left mb-6">
            From struggle to inspiration
          </h2>
          <p className="mt-3 sm:mt-4 text-heading font-HelveticaNeue text-base sm:text-xl font-[400] leading-6 sm:leading-7">
            Hasan, the founder of Arabic All The Time, never envisioned he would
            create a platform to revolutionize language acquisition. Growing up
            in Syria, Hasan experienced firsthand how traditional language
            learning methods could feel like a burdensome chore—where students
            attended classes to learn about the language rather than actually
            learning the language. In school, he recalls memorizing long
            pre-written essays in French just to pass exams, often without
            understanding a single word. Despite years of study and his
            ‘excellent’ grades, Hasan learned a lot about English and French but
            could barely say words like “door,” “apple,” and <br />
            “orange.”
          </p>
          <p className="mt-3 sm:mt-4 text-heading font-HelveticaNeue text-base sm:text-xl font-[400] leading-6 sm:leading-7">
            But life had bigger plans. Fleeing Syria during the war, Hasan found
            himself in a new world where mastering English became essential to
            rebuilding his life and pursuing education. His early attempts
            relied on apps like Duolingo and Babbel, but they left him
            frustrated and stuck. Memorizing words out of context and
            deliberately practicing grammar rules didn’t result in any
            noticeable language progression, despite all the streaks and
            experience points he collected. "Watch movies and listen to the
            radio," he was told. However, progress was very slow; looking back
            now, he realizes it was because movies and native media were too
            advanced for him to comprehend.
          </p>

          <p className="mt-3 sm:mt-4 text-heading font-HelveticaNeue text-base sm:text-xl font-[400] leading-6 sm:leading-7">
            Everything changed when Hasan immersed himself in conversations with
            native English speakers after moving to the United States. Within
            just three months of pure immersion—practicing with volunteers and
            revisiting movies now that his comprehension had improved—Hasan’s
            English proficiency skyrocketed, preparing him for college-level
            courses.
          </p>
          <button className="bg-orange-500 font-[500] text-xs sm:text-sm md:text-btntextsize font-HelveticaNeue text-white/90 px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-orange-600 transition duration-300 w-full sm:w-auto mt-4">
            Read More About Hasan's Inspiring Journey in the United States
          </button>
        </section>
      </div>
      </div>
    </Container>
  );
};

export default StoryTop;
