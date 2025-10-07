const steps = [
  {
    title: "Speaking",
    description:
      "Speaking too early can result in unnatural habits. Without having acquired Arabic's speaking patterns, your brain tends to fall back on the patterns of your native language. To speak naturally, your brain first needs time to acclimate to the sounds and rhythms of Arabic. By focusing on listening and comprehension first, you create a strong foundation for natural, confident, and lasting fluency.",
    borderColor: "#FF8C8C",
    image: "/image 30.png",
  },
  {
    title: "Reading",
    description:
      "Jumping into Arabic script without a solid foundation in pronunciation can impede fluency. Much like speaking too early, attempting to read prematurely compels your brain to produce sounds it hasn’t fully acquired, resulting in inaccurate pronunciations. By delaying reading and focusing on listening to hundreds of hours first, you ensure the accurate internalization of Arabic sounds and rhythms.",
    borderColor: "#A5E6A2",
    image: "/image 29.png",
  },
];

const SpackingReading = () => {
  return (
    <div className="container py-8 md:py-12 font-helvetica">
      <h1 className="font-bold mt-12 md:mt-0 mb-6 md:mb-8 text-center text-smallscreenheading md:text-[44px] text-heading font-pally">
        Why delay speaking and reading?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
        {steps.map((step, index) => (
          <div key={index} className="mb-3 sm:mb-0">
            <div className="bg-gradient-to-br from-[#FFF7FA] to-[#F7F7FF] p-3 rounded-2xl h-auto flex flex-col items-center justify-center text-left">
              <img src={step.image} alt="img" className="w-12 mb-2.5" />
              <h2 className="font-pally text-heading text-2xl font-bold">
                {step.title}
              </h2>
              <p className="font-HelveticaNeue text-heading text-lg">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpackingReading;
