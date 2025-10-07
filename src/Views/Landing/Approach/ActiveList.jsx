import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import ValueCard from '../about/components/ValueCard';

const ActiveList = () => {
    const cards = [
        {
            title: 'Focused engagement',
            description: "Active listening is tuning in with full attention, letting the sounds and context of Arabic sink in deeply. Unlike passive listening, where audio might just be background noise, active listening gives each word a place in your memory.",
            backgroundUrl: '/ear.png',
        },
        {
            title: 'Natural absorption',
            description: "Every moment of focused listening strengthens your ability to recall words and understand phrases intuitively. This engagement builds familiarity with Arabic’s unique sounds and flows, unlike passive listening, which doesn’t lead to true comprehension.",
            backgroundUrl: '/value3.png',
        },
        {
            title: 'Beyond background listening',
            description: "Passive listening, like letting audio play in the background, helps you tune into the rhythm and sounds of Arabic. However, it’s active listening—where you fully engage with each video—that turns exposure into lasting comprehension and gradually equips you to speak the language yourself.",
            backgroundUrl: '/speaker.png',
        },
    ];

    const theme = useTheme();

    return (
        <div className='py-10 px-5 font-helvetica'>
            <div className="grid grid-cols-12 gap-6">
                {/* Left Section */}
                <div className="col-span-12 sm:col-span-6">
                    <Box sx={{ py: 8, backgroundColor: "#ffff" }}>
                        {/* Title Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                component="h1"
                                fontWeight="bold"
                                gutterBottom
                                sx={{
                                    width: "max-content",
                                    pb: 1.4,
                                    fontSize: { md: "30px", sm: "20px", xs: "16px" } 
                                }}
                                className='text-smallscreenheading md:text-headingsize text-headingcolor'
                            >
                                Engage through active listening
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "16px",
                                }}
                                className='text-paracolor'
                            >
                                While watching brings the language to life, active listening deepens your understanding. It’s not about letting sounds wash over you but about immersing yourself fully to capture the meaning within context.
                            </Typography>
                        </Box>
                        {/* Content Section */}
                        <div className="flex flex-col gap-8">
                            {cards.map((card, index) => (
                                <ValueCard
                                    key={index}
                                    title={card.title}
                                    description={card.description}
                                    backgroundUrl={card.backgroundUrl}
                                />
                            ))}
                        </div>
                    </Box>
                </div>

                {/* Right Section */}
                <div className="col-span-12 sm:col-span-6 md:p-10 p-4">
                    <img src="/activepic.png" alt="Illustration" className="object-contain w-full" />
                </div>
            </div>
        </div>
    );
};

export default ActiveList;
