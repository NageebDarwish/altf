import React from "react";

const Video = () => {
    const cardData = [
        {
            icon: '/value7.png',
            title: 'Diverse levels & progression',
            description: 'Videos range from beginner-friendly content with clear visuals and simple language to more complex material as your skills develop. Early on, slower-paced videos help lay a strong foundation, while advanced content introduces nuanced vocabulary and sentence structures for deeper comprehension.',
        },
        {
            icon: '/value4.png',
            title: 'Relatable & culturally rich content',
            description: 'Each video reflects real-life scenarios, daily interactions, and cultural elements, fostering a natural connection with the language. You’re not just watching; you’re experiencing Arabic as it’s spoken in real contexts, where your brain naturally bridges sounds with meaning without the need for translation.',
        },
        {
            icon: '/value1.png',
            title: 'Engaging & enjoyable',
            description: 'Our content is curated not only for its educational value but for enjoyment. The stories, information, and cultural insights captivate your interest, making learning feel like entertainment rather than study.',
        },
    ];
    return (
        <div className="bg-[#fdf4eb] py-10 px-6 sm:px-10 lg:px-20 font-helvetica">
            <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
                <div className="col-span-1 sm:col-span-2 lg:col-span-6">
                    <div>
                        <h2 className="flex text-smallscreenheading md:text-headingsize font-bold text-headingcolor mb-4">
                            <img src="/value6.png" alt="" className="h-6 w-10 object-contain mt-1" /> Immerse through videos
                        </h2>
                        <p className="text-lg sm:text-xl text-paracolor mb-6">
                            Arabic All The Time provides a wide variety of videos that bring the language to life. This isn’t passive watching—it’s an immersive experience where every gesture, visual cue, and situational context helps make Arabic more intuitive.
                        </p>
                    </div>
                </div>
                <div className="col-span-1 sm:col-span-2 lg:col-span-6">
                    <img
                        src="/video.png"
                        alt="Immersive experience"
                        className="rounded-lg w-full h-64 sm:h-80 object-contain"
                    />
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                {cardData.map((card, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        <div>
                            <h3 className="flex text-lg sm:text-xl font-bold text-headingcolor">
                                <img src={card.icon} alt="" className="h-6 w-10 object-contain mt-1" /> {card.title}
                            </h3>
                            <p className="text-paracolor text-base sm:text-lg">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Video;
