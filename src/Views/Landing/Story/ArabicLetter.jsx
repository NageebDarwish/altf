import { colors } from "@mui/material";
import React from "react";

const ArabicLetter = () => {
  const data = [
    {
      content:
        " He couldn’t understand why a language as rich and widely spoken as Arabic lacked the same engaging and effective resources he had found for Spanish.",
    },
    {
      content:
        "It felt unfair that aspiring Arabic learners were left with outdated methods and fragmented content. This frustration ignited a determination in Hasan—not just to fill this gap but to revolutionize how Arabic could be acquired, making it as accessible and enjoyable as learning Spanish had been for him.",
    },
    {
      content:
        "Hasan couldn’t help but recall the trauma of studying English and French in school—the rigid grammar rules, forceful memorization, and joyless repetition. It became painfully clear that many aspiring Arabic learners likely faced the same struggles. Traditional methods had stripped away the beauty and connection of language learning, reducing it to a burdensome chore or a superficial streak.",
    },
    {
      content:
        "Hasan’s mission crystallized: to create a platform where aspiring learners could absorb Arabic as naturally and enjoyably as he had absorbed Spanish. He envisioned a space that celebrated the richness of Arabic, its stories, and its culture—a platform where learning felt as effortless and engaging as tuning into a favorite show.",
    },
  ];

  return (
    <div className="px-2 md:px-20 py-10 font-helvetica">
      <div className="grid grid-cols-1 md:grid-cols-12 mt-3 gap-3">
        <div className="col-span-12 md:col-span-6">
          <img
            src="/smilephone6.png"
            alt="Image"
            className="object-contain mt-4 w-full h-auto"
          />
        </div>

        <div className="col-span-12 md:col-span-6 gap-4">
          <div className="py-4 px-4">
            <h4 className="text-heading font-extrabold text-[35px] font-pally mb-12">
              A vision for Arabic learners
            </h4>
          </div>
          <ul className=" pl-5 space-y-4">
            {data.map((item, index) => (
              <li
                key={index}
                className="text-heading  font-HelveticaNeue text-sm font-semibold"
              >
                {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 mt-3 gap-3">
        <div className="col-span-12 md:col-span-6 gap-4">
          <ul className=" pl-5 space-y-4">
            {data.map((item, index) => (
              <li
                key={index}
                className="text-heading font-HelveticaNeue text-sm font-semibold"
              >
                {item.content}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 md:col-span-6">
          <img
            src="/smilephone6.png"
            alt="Image"
            className="object-contain mt-4 w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ArabicLetter;
