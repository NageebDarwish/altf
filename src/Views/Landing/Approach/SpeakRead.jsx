import React from 'react';

const SpeakRead = () => {
    const cardData = [
        {
            icon: '/value5.png',
            title: 'Speaking',
            description: 'We encourage learners to avoid speaking early on, as doing so can lead to unnatural patterns. Waiting to speak until you have a strong listening foundation allows Arabic’s natural rhythm and structure to settle into your mind, making speaking easier and more authentic when the time is right.',
        },
        {
            icon: '/value4.png',
            title: 'Reading',
            description: 'The Arabic script is unique, and jumping into reading without an internalized sense of pronunciation can hinder fluency. Our approach recommends reading only after achieving a significant level of listening experience, ensuring you recognize sounds accurately and naturally.',
        },
    ];

    return (
        <div className="bg-[#fdf4eb] py-10 px-6 sm:px-20 font-helvetica">
            <div className="mx-auto grid grid-cols-12 gap-6">
                <div className="col-span-12 sm:col-span-6">
                    <div>
                        <h2 className="flex text-smallscreenheading md:text-headingsize font-bold text-headingcolor mb-4">
                            <img src="/value6.png" alt="" className="h-6 w-10 object-contain mt-3" />
                            Immerse through videos
                        </h2>
                        <p className="text-lg text-paracolor mb-6">
                            Arabic All The Time provides a wide variety of videos that bring the language to life. This isn’t passive watching—it’s an immersive experience where every gesture, visual cue, and situational context helps make Arabic more intuitive.
                        </p>
                    </div>
                </div>
                <div className="col-span-12 sm:col-span-6">
                    {/* <img
                        src="/video.png"
                        alt="Immersive experience"
                        className="rounded-lg h-80 w-full object-contain"
                    /> */}
                </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-20">
                {cardData.map((card, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4">
                        <div>
                            <h3 className="flex text-xl font-bold text-headingcolor mb-2 sm:mb-0">
                                <img src={card.icon} alt="" className="h-6 w-10 object-contain mt-1" /> 
                                {card.title}
                            </h3>
                            <p className="text-paracolor">{card.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SpeakRead;
