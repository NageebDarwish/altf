import TeamAboutCustom from "./TeamAboutCustom";
import Container from "../../../../components/common/Container";

const TeamAbout = () => {
  const teamData = [
    {
      img: "/avatar-4.png",
      name: "Hasan",
      postion: "Founder",
      description:
        "Civil engineer with a passion for traveling and Arabic poetry. Hasan creates engaging content and oversees the platform. Inspired by the power of comprehensible input, Hasan wants to make learning Arabic enjoyable and effortless.",
    },
    {
      img: "/avatar-4 (1).png",
      name: "Aya",
      postion: "Guide",
      description:
        "Media student who loves sports and storytelling. Aya creates entertaining videos for super beginner and beginner learners. Her playful and fun approach brings Arabic to life, making it engaging and accessible for those just starting their journey.",
    },
    {
      img: "/avatar-4 (2).png",
      name: "Batoul",
      postion: "Guide",
      description:
        "Voice artist with a deep passion for Arabic literature. Batoul specializes in producing culturally rich and highly informative videos for intermediate and high-intermediate learners, helping them gain a deeper appreciation for Arab culture.",
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url('/kala shah kala.webp')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "1012px",
      }}
      className="bg-white font-helvetica"
    >
      <Container className="py-12 md:py-16">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-textsmallheading md:text-textheading font-pally font-bold text-heading">
            Our team
          </h1>
          <p className="text-center text-md md:text-xl font-HelveticaNeue font-medium w-full md:w-[60%] text-[#0C3373] leading-[28px]">
            We are a team of language enthusiasts dedicated to creating
            comprehensible input videos to help you master Arabic naturally,
            just like you mastered your first language.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {teamData.map((member, index) => (
            <TeamAboutCustom
              key={index}
              image={member.img}
              name={member.name}
              postion={member.postion}
              description={member.description}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TeamAbout;
