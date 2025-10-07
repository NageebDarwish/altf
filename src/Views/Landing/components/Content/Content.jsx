import { useEffect, useRef } from "react";
import Herosection from "./Herosection";
import Herosection2 from "./Herosection2";
import Team from "./Team";
import Community from "./Community";
import FrequentlyQuestion from "./FrequentlyQuestion";
import InputSection from "./InputSection";
import Approach from "./Approach";
import { useSelector } from "react-redux";
// import StripPaymenets from "../../../StripPaymenets/StripPaymenets";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// const stripePromise = loadStripe('pk_test_51QAEB8AtWbxh2ZowY7HddQTYPIVEBiPmJ7jGoo7QNwxWPfKq2gdsi3hCRpp7qdpHgIObEa1sranqkxZvhxgLZxAc00B3fVpCXV');
const Content = () => {
  // Create a reference for InputSection
  const inputSectionRef = useRef(null);
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const isPremium = useSelector((state) => state?.user?.user?.is_premium);

  // Function to scroll to InputSection
  const scrollToInputSection = () => {
    if (inputSectionRef.current) {
      inputSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="bg-white">
        {/* Pass the function as a prop */}
        <section className="py-8 md:py-12 lg:py-16">
          <Herosection scrollToInput={scrollToInputSection} />
        </section>
        <section className="py-8 md:py-12 lg:py-16">
          <Herosection2 />
        </section>
        {/* <div className="px-4">
        <Herosection3 />
      </div> */}
        {/* <ApprochLanding/> */}
        <section className="py-8 md:py-12 lg:py-16 sm:block hidden">
          <Approach />
        </section>
        <section className="py-8 md:py-12 lg:py-16 sm:block hidden">
          <Team />
        </section>
        <section className="py-8 md:py-12 lg:py-16">
          <Community />
        </section>
        <section className="py-8 md:py-12 lg:py-16">
          <FrequentlyQuestion />
        </section>

        {/* Attach ref to InputSection */}
        <section ref={inputSectionRef} className="py-8 md:py-12 lg:py-16">
          <InputSection />
        </section>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Content;
