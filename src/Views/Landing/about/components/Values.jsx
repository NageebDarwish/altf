import ValueCard from "./ValueCard";
import Container from "../../../../components/common/Container";

const Values = () => {
  const cards = [
    {
      title: "Accessibility",
      description:
        "We make Arabic approachable and enjoyable for everyone, creating an inclusive experience that's fun and engaging.",
      backgroundUrl: "/value1.png",
    },
    {
      title: "Immersion",
      description:
        "Through authentic, culturally rich content, we foster language absorption in a way that feels natural and intuitive, allowing Arabic to unfold effortlessly.",
      backgroundUrl: "/value2.png",
    },
    {
      title: "Innovation",
      description:
        "By integrating proven language acquisition principles into our content, we deliver an experience as captivating as a favorite show.",
      backgroundUrl: "/value3.png",
    },
    {
      title: "Community",
      description:
        "Our community is a vibrant space to connect, grow, and celebrate Arabic together. Join us as we share the language, culture, and every step of this journey.",
      backgroundUrl: "/value5.png",
    },
    {
      title: "Cultural integrity",
      description:
        "We celebrate the richness of Arab culture, from its diverse dialects and traditions to its shared values of warmth and hospitality.",
      backgroundUrl: "/value4.png",
    },
  ];

  return (
    <Container className="py-8 md:py-12">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-textsmallheading md:text-textheading font-pally lg:text-textheading text-heading text-center font-bold">
          Our values
        </h1>
      </div>

      {/* Content Section */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <ValueCard
              key={index}
              title={card.title}
              description={card.description}
              backgroundUrl={card.backgroundUrl}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Values;
