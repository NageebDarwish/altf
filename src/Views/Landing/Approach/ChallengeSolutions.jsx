import Container from "../../../components/common/Container";

const ChallengeSolutions = () => {
  return (
    <Container className="py-8 md:py-12">
      <div className="mx-auto text-center mb-10">
        <h2 className="md:text-4xl text-2xl font-pally font-bold text-[#0C3373]">
          Challenges and solutions
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-8 lg:space-y-0 relative">
        <div className="max-w-lg text-center lg:text-left z-30">
          <h3 className="md:text-2xl text-xl font-bold font-pally text-heading mb-1">
            Overwhelming native media
          </h3>
          <div className="bg-[#FFF7E6]  p-4 w-full sm:w-[600px] rounded-[24px] shadow-md">
            <p className="text-[#0C3373] text-xl  font-HelveticaNeue leading-relaxed">
              Native media can be a powerful tool for receiving input. However,
              for beginners, such input will often be incomprehensible and
              therefore ineffective.
            </p>
          </div>
        </div>

        <div className="relative lg:left-[-350px] z-0 top-8 lg:top-[93px]">
          <img
            src="/arrowicon.png"
            alt="Arrow icon"
            className="w-[250px] sm:w-[320px] lg:w-[400px] "
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8">
        <div className="relative">
          <img
            src="/MWP.png"
            alt="Person watching media"
            className="h-[250px] w-[570px]  "
          />
        </div>

        <div className="max-w-2xl text-center sm:text-left">
          <h3 className="text-2xl font-bold font-pally text-heading mb-1">
            Solution
          </h3>
          <div className=" border-2 border-[#1CC932] max-w-[600px] p-4 rounded-[24px] shadow-md">
            <p className="text-[#0C3373] text-md md:text-xl font-HelveticaNeue leading-relaxed">
              Start with comprehensible input videos specifically designed for
              your level. These videos ensure that the language is accessible
              and engaging, helping you build a solid foundation without feeling
              overwhelmed.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-7 lg:flex-row items-center lg:items-start justify-between space-y-8 lg:space-y-0 relative">
        <div className="max-w-lg z-30  text-center lg:text-left">
          <h3 className="text-2xl font-bold font-pally text-heading mb-1">
            Staying motivated
          </h3>
          <div className="bg-[#DBFFDF] p-4 rounded-[24px] w-full sm:w-[600px] shadow-md">
            <p className="text-[#0C3373] text-lg md:text-xl font-HelveticaNeue leading-relaxed">
              Since you are not actively producing the language, progress while
              using comprehensible input may feel subtle at first.
            </p>
          </div>
        </div>

        <div className="relative lg:left-[-350px] z-0 top-8 lg:top-[93px]">
          <img
            src="/arrowicon.png"
            alt="Arrow icon"
            className="w-[250px] sm:w-[320px] lg:w-[400px] "
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-8">
        <div className="relative">
          <img
            src="/push.png"
            alt="Person watching media"
            className="h-[250px] w-[570px]  "
          />
        </div>

        <div className="max-w-2xl text-center mt-6 sm:text-left">
          <h3 className="text-2xl font-bold font-pally text-heading mb-1">
            Solution
          </h3>
          <div className="border-2 border-green-400 p-4 rounded-[24px] shadow-md mb-4">
            <p className="text-[#0C3373] text-md md:text-xl font-HelveticaNeue leading-relaxed">
              Benchmark your progress by revisiting videos from different
              levels. For example, go back to re-watch a video that seemed too
              difficult a few weeks or months ago and notice how much more you
              can understand now. Celebrate small wins along the way and trust
              the cumulative process of language acquisition.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-7 gap-5 lg:flex-row items-center lg:items-start justify-between space-y-8 lg:space-y-0 relative">
        <div className="max-w-lg z-30 text-center lg:text-left">
          <h3 className="text-2xl font-bold font-pally text-heading mb-1">
            Finding suitable input
          </h3>
          <div className="bg-[#FFF7E6] p-4 rounded-[24px] w-full sm:w-[600px] shadow-md">
            <p className="text-[#0C3373] text-md md:text-xl font-HelveticaNeue leading-relaxed">
              Access to meaningful, comprehensible input can sometimes be
              limited.
            </p>
          </div>
        </div>

        <div className="relative lg:left-[-350px] top-8 z-0 lg:top-[93px]">
          <img
            src="/arrowicon.png"
            alt="Arrow icon"
            className="w-[250px] sm:w-[320px] lg:w-[400px] "
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-16">
        <div className="relative">
          <img
            src="/butt.png"
            alt="Person watching media"
            className="h-[250px] w-[570px]  "
          />
        </div>

        <div className="max-w-2xl text-center sm:text-left mb-4">
          <h3 className="text-2xl font-bold font-pally text-heading mb-1">
            Solution
          </h3>
          <div className=" border-2 border-green-400  p-4 rounded-[24px] shadow-md">
            <p className="text-[#0C3373] text-md md:text-xl font-HelveticaNeue leading-relaxed">
              Comprehensible input content is becoming more available over time.
              At Arabic All The Time, we are committed to building the largest
              library of Arabic comprehensible input videos on the internet.
              With a premium membership, you gain access to two exclusive videos
              added to our library daily. Plus, enjoy hundreds of videos in our
              ever-expanding collection designed to make Arabic acquisition
              intuitive and enjoyable.
            </p>
          </div>
        </div>
      </div>

      {/* Repeat structure for other sections with the same flex adjustments */}

      <div className="py-6 px-6 sm:px-16 bg-[#FFF0A1] mt-8 rounded-[16px]">
        <h3 className="text-heading font-pally font-bold text-2xl md:text-4xl mb-1">
          Conclusion
        </h3>
        <p className="text-heading font-HelveticaNeue font-[500] text-md md:text-xl">
          Language acquisition is a gradual process, much like rolling a
          snowball. Each moment of exposure adds to your foundation, leading to
          effortless fluency over time. By immersing yourself in engaging,
          meaningful content and trusting the process, you'll make Arabic a
          natural part of your life—just like your first language.
        </p>
      </div>
    </Container>
  );
};

export default ChallengeSolutions;
