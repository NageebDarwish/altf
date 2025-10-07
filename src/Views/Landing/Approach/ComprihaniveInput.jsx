import BenefitsSection from "./BenefitsSection";
import Container from "../../../components/common/Container";

const ComprihaniveInput = () => {
  return (
    <Container className="py-8 md:py-12">
      {/* Centered Title Section */}
      <div className="flex flex-col items-center justify-center text-left mx-auto px-2 sm:px-4 md:px-6">
        <h1 className="font-pally text-xl md:text-[44px] font-bold text-heading">
          Comprehensible input
        </h1>
        <p className="font-HelveticaNeue text-xl font-[500] text-heading mt-12 md:w-1/2">
          At Arabic All The Time, we firmly believe that receiving
          comprehensible input is the easiest, fastest, and most effective way
          to acquire Arabic, bypassing the need for rote memorization or grammar
          drills.
        </p>
      </div>

      {/* Content Section */}
      <div className="py-10">
        <div className="border border-[#EAECF0] rounded-2xl">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 text-center md:text-left px-8 py-12">
            {/* Right Side - Text */}
            <div className="w-full md:w-[55%]">
              <h1 className="font-pally text-heading font-bold text-3xl">
                What is it?
              </h1>
              <p className="font-HelveticaNeue text-heading font-[500] md:text-xl text-lg mt-2 text-left">
                Comprehensible input refers to language that is slightly beyond
                your current level of understanding but still makes sense when
                supported by context, gestures, or visual cues. This concept,
                introduced by Dr. Stephen Krashen, forms the backbone of natural
                language acquisition.
              </p>
              <br />
              <p className="font-HelveticaNeue text-heading font-[500] md:text-xl text-lg text-left">
                Extensive research has confirmed its effectiveness in helping
                learners acquire a new language naturally, just as they acquired
                their first language. Studies have shown that exposure to
                comprehensible input not only facilitates understanding but also
                promotes long-term retention and intuitive language use.
              </p>
            </div>

            {/* Left Side - Image */}
            <div className="rounded-2xl w-full md:w-[45%]">
              <img
                src="/waitRect.png"
                alt="Image 1"
                className="w-full h-[400px] rounded-lg"
              />
            </div>
          </div>
          <BenefitsSection />
        </div>
      </div>
    </Container>
  );
};

export default ComprihaniveInput;
