import Container from "../../../components/common/Container";

const benefits = [
  {
    title: "Easy:",
    description:
      "Comprehensible input makes learning accessible—simply watch videos that match your level and let your brain absorb the language naturally.",
    color: "text-green-500",
  },
  {
    title: "Fun:",
    description:
      "By removing the stress, anxiety, and rigid structure of traditional methods, comprehensible input allows you to enjoy the process of language acquisition through engaging and entertaining content.",
    color: "text-orange-500",
  },
  {
    title: "Effective:",
    description:
      "Science shows that comprehensible input is the only way humans truly acquire language. It mimics the way children learn their first language, making it the most reliable method for long-term fluency.",
    color: "text-yellow-500",
  },
  {
    title: "Fast:",
    description:
      "While its benefits are cumulative, comprehensible input is the fastest route to achieving lasting fluency. With consistent exposure, you'll progress naturally and efficiently, building confidence and mastery over time.",
    color: "text-blue-500",
  },
];

const BenefitsSection = () => {
  return (
    <Container className="py-8 md:py-12 font-helvetica">
      <h2
        
        className="font-pally text-heading text-3xl font-bold"
      >
        Benefits
      </h2>
      <div
        className="flex flex-col items-center gap-5"
      >
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg flex flex-col sm:flex-row items-start md:items-start mt-1 text-left shadow-lg ${
              index % 4 === 0
                ? "md:w-[748px]"
                : index % 4 === 1
                ? "md:w-[976px]"
                : index % 4 === 2
                ? "md:w-[1008px]"
                : "md:w-[1067px]"
            } ${index % 2 === 0 ? "md:ml-0" : "md:ml-auto"} ${
              index % 2 !== 0 ? "md:mr-0" : "md:mr-auto"
            }`}
          >
            <p
              className="font-pally text-xl text-heading"
            >
              <span
                className={`text-2xl font-bold ${benefit.color}`}
              >
                {" "}
                {benefit.title}
              </span>{" "}
              <span className="font-HelveticaNeue"> {benefit.description}</span>
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BenefitsSection;
