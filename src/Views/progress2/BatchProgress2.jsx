import React from 'react';
import { useSelector } from 'react-redux';

const BatchProgress2 = ({userDetails}) => {
    const data = [
        { img: "/Star Gazer-min.svg", title: 'Star Gazer', description: 'Watched 1 series' },
        { img: "/Lunar cycle.svg", title: 'Lunar voyager', description: 'Watched 10 series' },
        { img: "/Solar Explorer-min.svg", title: 'Solar explorer', description: 'Watched 50 series' },
        { img: "/Celestial Navegator-min.svg", title: 'Celestial navigator', description: 'Watched 100 series' },
        { img: '/First Light.svg', title: 'First light', description: '1 hour watched' },
        { img: "/Steady Glow-min.svg", title: 'Steady glow', description: '20 hours watched' },
        { img: "/Rising Dawon-min.svg", title: 'Rising dawn', description: '100 hours watched' },
        { img: "/Radiant horizon.svg", title: 'Radiant horizon', description: '500 hours watched' },
        { img: "/Eternal sun.svg", title: 'Eternal sun', description: '1,000 hours watched' },
        { img: "/New Moon.svg", title: 'New moon', description: '3-day streak' },
        { img: "/Weeks Orbit-min.svg", title: "Week's orbit", description: '7-day streak' },
        { img: "/Lunar cycle.svg", title: 'Lunar cycle', description: '30-day streak' },
        { img: "/centennial orbit (1).svg", title: 'Centennial orbit', description: '100-day streak' },
        { img: "/Solar Year-min.svg", title: 'Solar year', description: 'One year streak' },
        { img: "/The First Spark-min.svg", title: 'The First spark', description: 'First comment' },
        { img: "/Celestial Guid-min (1).svg", title: 'Celestial guide', description: 'Popular discussion thread' },
        { img: "/Constellation  Connector-min.svg", title: 'Constellation connector', description: 'Receiving 100 likes' },
        { img: "/Desert Star-min.svg", title: 'Desert star', description: '50 posts' },
        { img: "/First Ray.svg", title: 'First ray', description: 'Watched a video within 24 hours of release' },
        { img: "/Eclipsa  Viewer.svg", title: 'Eclipse viewer', description: 'Watched all Super Beginner videos' },
        { img: "/cultural explorer.svg", title: 'Cultural explorer', description: 'Watched 50 "Culture" videos' },
        { img: "/cultural Ambassador.svg", title: 'Cultural ambassador', description: 'Watched 100 "Culture" videos' },
        { img: "/Eternal light.svg", title: 'Eternal light', description: 'Premium Member' },
    ];

    const badges = userDetails.badges;
    console.log(badges,'badgessdkcmdkcmsdk')
     const allBadges = [
        ...(userDetails?.badges || []),
        ...(userDetails?.badge_modals?.map(modal => {
            const badge = userDetails.badges?.find(b => b.id.toString() === modal.badge_id);
            return badge ? { ...badge, modalId: modal.id } : null;
        }).filter(Boolean) || [])
    ];

    const isBadgeEarned = (badgeTitle) => {
        return allBadges.some(badge => 
            badge.name?.toLowerCase() === badgeTitle.toLowerCase()
        );
    };

    return (
        <div className='bg-white rounded-[13px] p-6 shadow-lg'>
            <p className='text-heading font-bold font-pally text-[32px] mb-6'>Badges</p>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
                {data.map((val, ind) => {
                    const isEarned = isBadgeEarned(val.title);

                    return (
                        <div
                            key={ind}
                            className={`flex flex-col items-center p-4 rounded-[12px] shadow-md ${isEarned ? 'bg-blue-100' : 'bg-white'
                                }`}
                        >
                            <div className='bg-[#D9D9D9] h-[84px] w-[84px] rounded-full flex items-center justify-center overflow-hidden'>
                                {/* Uncomment when you have images */}
                                {/* <img 
                                    src={val.img} 
                                    alt={val.title} 
                                    className="object-contain w-full h-full" 
                                    loading="lazy"
                                    width="84"
                                    height="84"
                                /> */}
                            </div>
                            <p className='font-bold text-heading font-pally text-center text-[26px] mt-3'>{val.title}</p>
                            <p className='font-thin text-heading font-HelveticaNeue text-[14px] text-center'>
                                {val.description}
                            </p>
                            {isEarned && (
                                <div className="mt-2 text-sm font-semibold text-blue-600">
                                    ✓ Earned
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BatchProgress2;