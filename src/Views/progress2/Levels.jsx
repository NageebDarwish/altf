import { useState } from "react";
import LevelCard from "./LevelCard";

const levelsData = [
  {
    title: "Level 1",
    hours: "0-20",
    words: "~0",
    description:
      "You can understand native speakers on common topics, but slang and complex discussions are still tricky. You rely less on context and start picking up idioms naturally. Watch Upper Intermediate videos and avoid speaking for now if you care about having a clear accent.",
    image: "/one.png",
  },
  {
    title: "Level 2",
    hours: "21-50",
    words: "~500",
    description:
      "You are getting used to the sounds of the language and can watch longer videos without feeling strained. Continue watching Super Beginner videos. Avoid reading, writing, and speaking for now.",
    image: "/two.png",
  },
  {
    title: "Level 3",
    hours: "51-100",
    words: "~1000",
    description:
      "You understand some basic words and short phrases, and you enjoy the process more. Focus on increasing your daily input time. You can start watching Beginner videos or continue watching Super Beginner videos. Avoid reading, writing, and speaking for now.",
    image: "/three.png",
  },
  {
    title: "Level 4",
    hours: "101-200",
    words: "~2000",
    description:
      "You can understand topics aimed at learners and rely less on visual cues. You start picking up grammar intuitively. Watch Beginner videos and avoid reading, writing, and speaking for now.",
    image: "/four.png",
  },
  {
    title: "Level 5",
    hours: "201-300",
    words: "~3000",
    description:
      "You can understand patient native speakers on familiar topics and find yourself naturally producing some words and phrases. You can start watching Intermediate videos or continue watching Beginner videos. Avoid speaking even if it’s tempting.",
    image: "/five.png",
  },
  {
    title: "Level 6",
    hours: "301-400",
    words: "~4000",
    description:
      "You can understand faster speech and can increasingly produce words and phrases. Try to increase the number of hours you watch as you can find more interesting content. Watch Intermediate videos and avoid speaking even if it’s tempting",
    image: "/six.png",
  },
  {
    title: "Level 7",
    hours: "401-500",
    words: "~5000",
    description:
      "You can understand native speakers on common topics, but slang and complex discussions are still tricky. You rely less on context and start picking up idioms naturally. Watch Upper Intermediate videos and avoid speaking for now if you care about having a clear accent.",
    image: "/seven.png",
  },
  {
    title: "Level 8",
    hours: "501-600",
    words: "~6000",
    description:
      "You can understand most content, including discussions on unfamiliar topics. Speaking might begin emerging naturally, but fluency still depends on passive exposure. Keep watching Upper Intermediate videos and start Advanced videos when ready.",
    image: "/eight.png",
  },
  {
    title: "Level 9",
    hours: "601-700",
    words: "~7000",
    description:
      "You can now hold conversations on a variety of topics. Understanding fast, unscripted speech is much easier, and you can watch native content with minimal difficulty. Focus on reading and speaking and watch Advanced videos.",
    image: "/ten.png",
  },
  {
    title: "Level 10",
    hours: "701+",
    words: "~8000+",
    description:
      "You understand nearly everything you hear. Speaking is fluent and natural, though advanced fields like may still require more vocabulary. Arabic is now a part of your daily life, and you can express yourself with confidence in almost any situation.",
    image: "/nine.png",
  },
];

const Levels = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {levelsData.map((level, index) => (
        <LevelCard
          key={index}
          level={level}
          isOpen={openIndex === index}
          toggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default Levels;
