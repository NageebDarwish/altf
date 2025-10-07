const content = [
  {
    title: "Studying",
    image: "/Rectangle 236.png",
    points: [
      "Emphasizes memorization, grammar rules, and structured drills.",
      "Relies on translation and deliberate recall, which hinders fluency.",
      "Focuses on output (e.g., speaking or writing) rather than comprehension.",
      "You learn a lot about the language, but you don’t learn the language itself.",
    ],
  },
  {
    title: "Acquisition",
    image: "/Rectangle 233.webp",
    points: [
      "Subconscious process, similar to how children learn their first language.",
      "Relies on exposure to comprehensible content, allowing fluency to emerge gradually and organically.",
      "Develops intuitive understanding of vocabulary, grammar, and pronunciation through context.",
      "You acquire the language just like native speakers did.",
    ],
  },
];

import Container from "../../../components/common/Container";

const Vs = () => {
  return (
    <>
      <Container className="py-8 md:py-16">
        <h1 className="text-center font-pally lg:text-4xl font-bold text-heading text-2xl">
          Studying Vs Acquisition
        </h1>
      </Container>
      <div
        className="relative w-full py-10 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/vs.png')" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {content.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center ${
                index % 2 === 0
                  ? "lg:flex-row lg:gap-10"
                  : "lg:flex-row-reverse"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className={` md:w-[400px] md:h-[410px] relative ${
                  index % 2 === 0 ? "lg:-top-24" : "lg:top-24"
                }`}
              />
              <div className="px-2 md:px-10">
                <h2 className="md:text-3xl text-2xl font-pally font-bold">
                  {item.title}
                </h2>
                <ul className="list-disc pl-5 text-[16px] text-gray-200">
                  {item.points.map((point, i) => (
                    <li className="text-[20px] font-HelveticaNeue" key={i}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Vs;
