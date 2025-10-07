import Vs from "./Vs";
import GradualComprehension from "./GradualComprehension";
import ApprochHeroSections from "./ApprochHeroSections";
import Introductions from "./Introductions";
import NaturalLanguageAcquisition from "./NaturalLanguageAcquisition";
import SpackingReading from "./SpackingReading";
import ComprihaniveInput from "./ComprihaniveInput";
import ImmressThroughVedios from "./ImmressThroughVedios";
import EngageList from "./EngageList";
import Milstone from "./Milstone";
import ChallengeSolutions from "./ChallengeSolutions";
import StartLarning from "../components/Content/StartLarning";
import { useEffect } from "react";
import useRouter from "../../../utils/useRouter";
import { useSelector } from "react-redux";

const Approach = () => {
  const { location } = useRouter();
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="bg-white">
      <ApprochHeroSections />
      <Introductions />
      <div>
        <Vs />

        <NaturalLanguageAcquisition />
        <SpackingReading />
        <ComprihaniveInput />

        <ImmressThroughVedios />
        <EngageList />
        <Milstone />
        <GradualComprehension />
        <ChallengeSolutions />
      </div>

     {!isAuthenticated && 
     <>
        <div className="bg-[#F29142] h-[169px]"></div>
        <div className="relative z-40 flex items-center justify-center -top-24">
          <StartLarning />
        </div>
      </>
      }
    </div>
  );
};

export default Approach;
