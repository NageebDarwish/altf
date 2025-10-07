import { useNavigate } from "react-router-dom";

const Approach = () => {
  const approachData = [
    {
      title: "Watch videos",
      desc: "Dive into our comprehensible Arabic videos designed for your level.",
      borderColor: "#47F15D",
    },
    {
      title: "Focus on meaning",
      desc: "Pay attention to the overall message, not individual words.",
      borderColor: "#F9DA38",
    },
    {
      title: "Avoid notes or repetition",
      desc: "Don’t interrupt your flow by taking notes or repeating after the speaker.",
      borderColor: "#2CE243",
    },
    {
      title: "Skip subtitles",
      desc: "Let context guide you instead of relying on translations.",
      borderColor: "#FF7300",
    },
    {
      title: "Challenge yourself appropriately",
      desc: "Watch videos that are slightly above your level but not overwhelming.",
      borderColor: "#B3D1FF",
    },
    {
      title: "Don’t translate or memorize",
      desc: "Trust the process—words will stick naturally through exposure.",
      borderColor: "#FDC9A0",
    },
  ];

  const navigate = useNavigate();

  const handlenavigate = () => {
    navigate("/approach");
  };

  return (
    <div className="sm:flex hidden flex-col items-center text-center py-16 px-6 lg:px-20 font-helvetica bg-[#E4EFFF4D]">
      {/* Title & Description */}
      <h1 className="text-2xl md:text-5xl font-pally font-bold py-4 text-[#0C3373]">
        Our approach
      </h1>
      <p className="text-lg md:text-[20px] font-[500] text-left font-HelveticaNeue text-[#0C3373]/70 mt-3 max-w-3xl">
        Comprehensible input is the fastest and most effective way to acquire a
        new language naturally. Backed by decades of research, this intuitive
        approach allows you to absorb Arabic effortlessly, just like you
        absorbed your first language.
      </p>

      {/* Subtitle */}
      <h2 className="text-xl md:text-textsmallheading font-semibold font-pally text-orange-500 mt-8">
        Here&apos;s how it works:
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full max-w-6xl">
        {approachData.map((item, index) => (
          <div
            key={index}
            style={{ border: `1px solid ${item.borderColor}` }}
            className={` p-8 bg-white rounded-[16px] shadow-sm`}
          >
            <h3 className="text-lg text-start md:text-xl font-bold font-pally text-[#0C3373]">
              {item.title}
            </h3>
            <p className="text-heading/70 text-[16px] mt-2 text-start font-HelveticaNeue">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Call-to-Action Button */}
      <button
        onClick={handlenavigate}
        className="mt-8 text-btntextsize bg-dashboardPrimary font-HelveticaNeue text-white px-6 py-4 rounded-full hover:bg-orange-600 transition"
      >
        Learn More About Our Approach
      </button>
    </div>
  );
};

export default Approach;
