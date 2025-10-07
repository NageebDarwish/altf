import Container from "../../../components/common/Container";

const ImmersThroughVideos = () => {
  const videos = [
    {
      img: "/AdobeStock_1029622247 (1).png",
      title: "Engaging & enjoyable",
      description:
        "Our videos bring Arabic to life with gestures, facial expressions, and visual aids, helping you follow along naturally and enjoyably at any level.",
    },
    {
      img: "/AdobeStock_1029622247 (1) (1).png",
      title: "Culturally rich content",
      description:
        "Our stories immerse you in Arab culture, connecting you to its warmth, hospitality, and rich traditions, while deepening your cultural understanding.",
    },
    {
      img: "/AdobeStock_1029622247 (1) (2).png",
      title: "Diverse levels & progression",
      description:
        "From super beginner videos with clear visuals to advanced content introducing nuanced vocabulary, our material helps you progress smoothly at your own pace.",
    },
  ];

  return (
    <Container className="py-8 md:py-12 text-center">
      <h2 className="text-xl sm:text-2xl md:text-[44px] font-pally font-bold text-heading  mb-8">
        Immerse through videos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {videos.map((video, index) => (
          <div
            key={index}
            className="bg-white hover:shadow-lg border rounded-lg text-left"
          >
            <img
              src={video.img}
              alt={video.title}
              className="w-full h-[278px] object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold font-pally text-heading mb-2">
                {video.title}
              </h3>
              <p className="text-[#0C3373] text-lg font-HelveticaNeue">
                {video.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ImmersThroughVideos;
