import Container from "../../../components/common/Container";

const Introductions = () => {
  return (
    <Container className="py-8 md:py-12">
      <div className="flex flex-col md:flex-row items-center gap-5 text-left md:text-left">
        {/* Left Side - Image */}
        <div className="flex-1 rounded-2xl w-full md:w-[45%]">
          <img
            src="/wait.png"
            alt="Image 1"
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* Right Side - Text */}
        <div className="flex-1 w-full md:w-[55%] pl-0 md:pl-8">
          <h1 className="font-pally text-[#0C3373] font-bold text-2xl md:text-4xl">
            Introduction
          </h1>
          <p className="leading-7 font-HelveticaNeue text-xl font-[500] text-[#0C3373] mt-6">
            Imagine understanding Arabic as easily as your native language—no
            grammar drills or flashcards, just an enjoyable and immersive
            experience. Welcome to Arabic All The Time, where we make videos
            that transform your Arabic acquisition journey into a relaxing
            experience!
          </p>
          <p className="leading-7 font-HelveticaNeue text-xl font-[500] text-[#0C3373]">
            By using comprehensible input, the foundation of natural language
            acquisition, you’ll learn Arabic just like you learned your first
            language. Our videos use images, hand gestures, facial expressions,
            and slow, focused speech to make content understandable and engaging
            for all levels
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Introductions;
