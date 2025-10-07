import PageHeader from "../../../components/PageHeader";
import Values from "./components/Values";
import TeamAbout from "./components/TeamAbout";
import StartLarning from "../components/Content/StartLarning";
import AboutMession from "./components/AboutMession";
import AboutStory from "./components/AboutStory";
import AboutOurVesion from "./components/AboutOurVesion";
import { useEffect } from "react";
import { Container } from "@components/common";
import { useSelector } from "react-redux";

const AboutUS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);


  return (
    <>
      <div className="py-4">
        <PageHeader
          breadcrumbs={["Home", "About Us"]}
          title="About Us"
          description="A team of language enthusiasts dedicated to making Arabic learning effortless, enjoyable, and immersive—anytime, anywhere."
        />

        <div className="flex flex-col">
          <AboutMession
            title="Our mission"
            btnlabel="Support Our Mission"
            description1="To provide an entertaining, immersive learning experience through comprehensible input. We believe in mastering Arabic without studying it—by simply watching, listening, and engaging with content that is both enjoyable and informative."
            img="/immersepic.webp"
            description2="For us, Arabic is more than a language—it's a gateway to the warmth, hospitality, generosity, and richness of Arab culture waiting to be explored, and we invite you to experience it, one story at a time."
          />

          <AboutStory
            title="Our story"
            btnlabel="Read Our Story"
            description1="Arabic All The Time was born out of Hasan's transformative journey - one that started with the challenges of traditional language learning and led to the discovery of a revolutionary approach."
            img="/lapgirl.webp"
            btnlink="/story"
            description2="Learn how this journey inspired a mission to make Arabic learning natural, effortless, and accessible for everyone."
            reverse={true}
          />

          <AboutOurVesion
            title="Our vision"
            btnlabel="Join Our Community"
            btnlink="/newdashboard/home"
            description1="To become the leading platform for natural Arabic acquisition, inspiring a global community to connect with the beauty and richness of the Arabic language and culture through effortless, enjoyable, and immersive experiences."
            img="/vesion.webp"
          />

          <Values />

          <TeamAbout />
        </div>
        
        { !isAuthenticated &&
        <>
          <div className="bg-[#F28327] w-full h-[130px]"></div>
          <div className="relative">
            <div className="w-full transform -translate-y-20">
              <StartLarning />
            </div>
          </div>
        </>
        }
      </div>
    </>
  );
};

export default AboutUS;
