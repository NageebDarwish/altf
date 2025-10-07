const GradualComprehension = () => {
  const cards = [
    {
      title: "Vocabulary growth",
      descriptions: [
        "Words recognized in specific contexts gradually become part of active understanding.",
        "Repeated exposure in varied contexts deepens familiarity, leading to effortless recall.",
      ],
    },
    {
      title: "Intuitive grammar development",
      descriptions: [
        "Without studying rules, you’ll begin recognizing patterns naturally.",
        "Complex sentence structures become instinctively clear, giving you a sense of what “sounds right.”",
      ],
    },
    {
      title: "Improved focus and engagement",
      descriptions: [
        "Growing comprehension allows you to engage with longer content without fatigue.",
        "An increased attention span reflects greater comfort with the language.",
      ],
    },
    {
      title: "Gradual comprehension gains",
      descriptions: [
        "Initially, you may pick up isolated words or basic phrases.",
        "With repeated exposure, you’ll grasp longer sections, even without understanding every word.",
      ],
    },
  ];

  return (
    <div className="bg-[#FFF8D94D] py-16 px-6 sm:px-10 lg:px-20">
      {/* Section Title */}
      <h2 className="text-center font-pally lg:text-4xl text-2xl font-bold text-heading mb-10">
        Signs you’re making progress
      </h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-[24px] px-8 py-12 border border-[#1CC93233]"
          >
            <h3 className="md:text-[32px] font-pally font-bold text-heading mb-2">
              {card.title}
            </h3>
            <ul className="list-none pl-4 text-gray-600">
              {card.descriptions.map((desc, descIndex) => (
                <li
                  key={descIndex}
                  className="text-lg leading-relaxed font-HelveticaNeue text-heading flex items-start"
                >
                  <span className="font-bold mr-2 text-heading">•</span>
                  {desc}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradualComprehension;
