const EngageList = () => {
  return (
    <div className="container py-12 text-center relative">
      <h2 className="text-textsmallheading md:text-[44px] font-bold font-pally text-heading mb-8">
        Engage through active listening
      </h2>
      <div className="relative flex flex-col lg:flex-row items-center justify-center">
        {/* Centered Image */}
        <img
          src="/data.webp"
          alt="Listening"
          className="w-full lg:w-1/2 rounded-lg shadow-lg"
        />

        {/* Left Box - Stacked on Mobile, Overlapping on Desktop */}
        <div className="lg:absolute lg:left-1/4 lg:transform lg:-translate-x-1/2 bg-white bg-opacity-70 p-4 shadow-lg rounded-lg border border-green-400 max-w-lg bottom-12 backdrop-blur-md my-2">
          <h3 className="text-2xl font-bold text-heading font-pally flex items-center">
            <span role="img" className="mr-3" aria-label="Listening">
              <img src="/image 38.webp" alt="" />
            </span>{" "}
            Beyond background listening
          </h3>
          <p className="text-[#0C3373] text-xl font-HelveticaNeue text-left mt-1">
            While passive listening familiarizes you with the rhythm and sounds,
            active listening transforms exposure into lasting comprehension.
          </p>
        </div>

        {/* Right Box - Stacked on Mobile, Overlapping on Desktop */}
        <div className="lg:absolute lg:right-1/4 lg:transform lg:translate-x-1/2 bg-white bg-opacity-70 p-4 shadow-lg rounded-lg border border-orange-400 max-w-lg top-8 backdrop-blur-md">
          <h3 className="text-2xl font-bold text-heading font-pally flex items-center">
            <span role="img" aria-label="Engagement" className="mr-3">
              <img src="public/image 36.webp" alt="" />
            </span>{" "}
            Focused engagement
          </h3>
          <p className="text-[#0C3373] text-xl font-HelveticaNeue text-left mt-1">
            Active listening means fully focusing on understanding the speaker’s
            message. Instead of fixating on individual words or phrases, your
            attention should be on comprehending the overall meaning they are
            trying to convey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EngageList;
