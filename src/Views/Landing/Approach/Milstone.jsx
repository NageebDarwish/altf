const Milestone = () => {
  return (
    <div className="container py-12 text-center">
      {/* Title */}
      <h2 className="text-textsmallheading md:text-[72px] font-bold text-heading font-pally mb-6 flex items-center justify-center">
        <span className="mr-2 font-bold">
          <img
            src="/Group 1261153820.png"
            className="w-8 h-8 md:w-16 md:h-16"
            alt=""
          />
        </span>
        Milestones
      </h2>

      {/* Milestone Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-left pt-8">
        {/* Milestone Items */}
        <div>
          <h3 className="text-[44px] font-bold text-heading font-pally">
            20 hours
          </h3>
          <p className="text-[#0C3373] text-md mt-2 font-HelveticaNeue">
            Hitting 20 hours is a game-changer. The first few videos may feel
            challenging, but consistency is key. Watch daily, even for 15–30
            minutes, and you’ll be amazed at how quickly Arabic starts to click.
            Focus entirely on building a strong daily habit of comprehensible
            input.
          </p>
        </div>
        <div>
          <h3 className="text-[44px] font-bold text-heading font-pally">
            200 hours
          </h3>
          <p className="text-[#0C3373] text-md mt-2 font-HelveticaNeue">
            By this stage, you’ll need fewer visuals to grasp meaning and can
            follow slow, focused speech on general topics. Keep prioritizing
            comprehensible input and avoid reading or speaking, even if it’s
            tempting—your foundation is still developing.
          </p>
        </div>
        <div>
          <h3 className="text-[44px] font-bold text-heading font-pally">
            1000 hours
          </h3>
          <p className="text-[#0C3373] text-md mt-2 font-HelveticaNeue">
            You’ll understand most Arabic media. If you feel ready, you can
            start reading and speaking. However, if clear pronunciation is a
            priority, consider delaying these activities to further solidify
            your foundation.
          </p>
        </div>
        <div>
          <h3 className="text-[44px] font-bold text-heading font-pally">
            2000 hours
          </h3>
          <p className="text-[#0C3373] text-md mt-2 font-HelveticaNeue">
            You’ll effortlessly understand nearly all native-level content,
            including humor, idiomatic expressions, and subtle nuances. At this
            stage, you’ll be ready to confidently use Arabic in conversations,
            writing, and professional settings.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {/* <div className="mt-6 relative w-full bg-gray-200 h-4 rounded-lg overflow-hidden">
        <div className="absolute left-0 w-1/4 h-full bg-heading font-pally"></div>
      </div> */}
      <div className="py-12">
        <img src="/Timeline.png" alt="" />
      </div>

      {/* Footer Message */}
      <p className="text-dashboardPrimary text-2xl font-pally font-bold my-8">
        Be patient and trust the process—your fluency will develop naturally as
        your input hours grow.
      </p>
    </div>
  );
};

export default Milestone;
