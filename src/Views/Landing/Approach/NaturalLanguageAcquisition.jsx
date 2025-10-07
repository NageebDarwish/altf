const steps = [
  {
    title: "Passive absorption",
    description:
      "Your brain subconsciously absorbs patterns, words, and sentence structures simply by hearing them in context. This allows language acquisition to happen effortlessly.",
    borderColor: "border-[#FDC9A0]",
    image: "/st1.png",
  },
  {
    title: "Direct understanding",
    description:
      "When using comprehensible input, there’s no need to translate every word into your native language. Your brain creates direct connections between the sounds you hear and the concepts they represent.",
    borderColor: "border-[#C6FFCD]",
    image: "/st4.png",
  },
  {
    title: "Context based comprehension",
    description:
      "As you focus on a message of the video, visual cues and situational context help bridge gaps in understanding, even when you don’t know every word.",
    borderColor: "border-[#FFF0A1]",
    image: "/attachment (15) 1.png",
  },
  {
    title: "Cumulative learning effect",
    description:
      "Each exposure to words and phrases deepens understanding over time. Repeated encounters solidify vocabulary and phrases into active language skills.",
    borderColor: "border-[#B3D1FF]",
    image: "/attachment (14) 1.png",
  },
];

import Container from "../../../components/common/Container";

const NaturalLanguageAcquisition = () => {
  return (
    <Container className="py-8 md:py-12 font-helvetica">
      <h1 className="font-bold mb-3 text-center text-2xl md:text-4xl font-pally text-heading">
        Natural language acquisition
      </h1>
      <p className="text-left mb-8 max-w-3xl mx-auto text-paracolor font-[500] text-md md:text-lg font-HelveticaNeue text-heading leading-7">
        Our brains are wired to acquire language effortlessly through exposure,
        not study. Just as you acquired your native language by listening and
        observing, comprehensible input helps you absorb Arabic intuitively.
        You’ll pick up vocabulary, grammar, and pronunciation by hearing them in
        context—no translation or memorization required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center mt-3 ">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-3xl shadow-lg border-4 ${
              step.borderColor
            } text-start py-12 flex flex-col gap-1.5 transform ${
              index === 1 ? "md:translate-y-12" : ""
            } ${index === 3 ? "md:translate-y-12" : ""}`}
          >
            <img src={step.image} alt="img" className="w-12" />
            <h2 className="font-bold mb-2 font-pally text-heading text-2xl mt-3">
              {step.title}
            </h2>
            <p className="font-HelveticaNeue text-heading text-lg md:text-xl">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default NaturalLanguageAcquisition;
