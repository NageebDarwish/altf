import { Box } from "@mui/material";
import StruggleToInspiration from "./StruggleToInspiration";
import StoryCard from "./StoryCard";
import StoryTop from "./StoryTop";
import Aribicborn from "./Aribicborn";
import StartLarning from "../components/Content/StartLarning";
import image from "../../../assets/Home/irfan.jpg";
import { useEffect, useState } from "react";
import Container from "../../../components/common/Container";
const Story = () => {
  const [activeSection, setActiveSection] = useState("section1");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (
          rect.top < window.innerHeight * 0.5 &&
          rect.bottom > window.innerHeight * 0.2
        ) {
          currentSection = section.getAttribute("id");
        }
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
      <div className="mb-8 md:mb-12">
        <StoryTop
          activeSection={activeSection}
          setActiveSection={activeSection}
          scrollToSection={scrollToSection}
        />
      </div>

      <section id="section2" className="mb-8 md:mb-12">
        <StoryCard
          title={"Falling in love with spanish and a new way of learning"}
          descriptions={[
            "Years later, Hasan visited Mexico for the first time. The warmth of the people and the beauty of their language captivated him. Determined to learn Spanish, he began searching for ways to immerse himself in Spanish. By this point, he was more aware of the importance of listening for language acquisition, thanks to his experience and the raising popularity of listening based learning.",
            "This time, Hasan committed fully to structured listening courses like Pimsleur and Paul Noble. Although he made some progress, these courses felt monotonous and were easy to give up on. The lack of engaging content made it hard to stay motivated, and the slow progress left him feeling uninspired and stuck. Over a year later, and despite multiple trips to Mexico, Hasan could barely say “Hola” or “¿Cómo estás?”",
          ]}
          flexDirection={"row"}
          // bgColor={theme.palette.color.missionBackground}
          bgColor="#FFEBDB"
          image={"/choop (1) 1.jpg"}
        />
      </section>

      <section id="section3" className="mb-8 md:mb-12">
        <StruggleToInspiration />
      </section>

      <section id="section4" className="mb-8 md:mb-12">
        <StoryCard
          title={"A vision for arabic learners"}
          descriptions={[
            `As Hasan reflected on his journey with Spanish, his thoughts kept returning to Arabic—his first love and lifelong passion. Before immersing himself in Spanish, Hasan had spent years exploring ancient Arabic poetry, memorizing four of the Mu'allaqat—a collection of pre-Islamic poems known for their eloquence and timeless themes of love, courage, and tribal honor.`,
            `These poems, considered masterpieces of Arabic literature, are not only revered for their linguistic beauty but also for preserving the cultural and historical essence of the Arab world. Hasan’s deep connection to this rich literary tradition underscored his lifelong passion for the Arabic language and its heritage. For Hasan, Arabic wasn’t just a language; it was his calling, his obsession, and a core part of his identity. `,
          ]}
          flexDirection={"row"}
          image={"/IMG_0847 1.webp"}
        />
      </section>

      <div className="mb-8 md:mb-12">
        <StoryCard
          ok={"yes"}
          title={"A vision for arabic learners"}
          descriptions={[
          `Yet, when he searched for comprehensible input content in Arabic, he found only a sparse collection of timid attempts—nothing like the rich, curated libraries he had relied on to learn Spanish. "Why wasn’t this method available for Arabic?" Hasan wondered, his frustration growing with each fruitless search. He couldn’t understand why a language as rich and widely spoken as Arabic lacked the same engaging and effective resources he had found for Spanish. `,
          `It felt unfair that aspiring Arabic learners were left with outdated methods and fragmented content. This frustration ignited a determination in Hasan—not just to fill this gap but to revolutionize how Arabic could be acquired, making it as accessible and enjoyable as learning Spanish had been for him. `,
          `Hasan couldn’t help but recall the trauma of studying English and French in school—the rigid grammar rules, forceful memorization, and joyless repetition. It became painfully clear that many aspiring Arabic learners likely faced the same struggles. Traditional methods had stripped away the beauty and connection of language learning, reducing it to a burdensome chore or a superficial streak. `,
          `Hasan’s mission crystallized: to create a platform where aspiring learners could absorb Arabic as naturally and enjoyably as he had absorbed Spanish. He envisioned a space that celebrated the richness of Arabic, its stories, and its culture—a platform where learning felt as effortless and engaging as tuning into a favorite show.`,
        ]}
          flexDirection={"row-reverse"}
          image={"/IMG_0676 1.webp"}
        />
      </div>

      {/* <ArabicLetter /> */}
      <section id="section5" className="mb-8 md:mb-12">
        <Aribicborn />
      </section>

      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <StartLarning />
        </Container>
      </Box>

      {/* <Footer /> */}
    </div>
  );
};

export default Story;
