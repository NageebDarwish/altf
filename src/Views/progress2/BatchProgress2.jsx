const BatchProgress2 = ({userDetails}) => {
    const data = [
        { img: "/badges/Asset 2.webp", title: 'Star Gazer', description: 'Watched 1 series' },
        { img: "/badges/Asset 3.webp", title: 'Lunar voyager', description: 'Watched 10 series' },
        { img: "/badges/Asset 4.webp", title: 'Solar explorer', description: 'Watched 50 series' },
        { img: "/badges/Asset 5.webp", title: 'Celestial navigator', description: 'Watched 100 series' },
        { img: '/badges/Asset 6.webp', title: 'First light', description: '1 hour watched' },
        { img: "/badges/Asset 7.webp", title: 'Steady glow', description: '20 hours watched' },
        { img: "/badges/Asset 8.webp", title: 'Rising dawn', description: '100 hours watched' },
        { img: "/badges/Asset 9.webp", title: 'Radiant horizon', description: '500 hours watched' },
        { img: "/badges/Asset 10.webp", title: 'Eternal sun', description: '1,000 hours watched' },
        { img: "/badges/Asset 11.webp", title: 'New moon', description: '3-day streak' },
        { img: "/badges/Asset 12.webp", title: "Week's orbit", description: '7-day streak' },
        { img: "/badges/Asset 14.webp", title: 'Lunar cycle', description: '30-day streak' },
        { img: "/badges/Asset 15.webp", title: 'Centennial orbit', description: '100-day streak' },
        { img: "/badges/Asset 16.webp", title: 'Solar year', description: 'One year streak' },
        { img: "/badges/Asset 17.webp", title: 'The First spark', description: 'First comment' },
        { img: "/badges/Asset 18.webp", title: 'Celestial guide', description: 'Popular discussion thread' },
        { img: "/badges/Asset 19.webp", title: 'Constellation connector', description: 'Receiving 100 likes' },
        { img: "/badges/Asset 20.webp", title: 'Desert star', description: '50 posts' },
        { img: "/badges/Asset 21 (1).webp", title: 'First ray', description: 'Watched a video within 24 hours of release' },
        { img: "/badges/Asset 22.webp", title: 'Eclipse viewer', description: 'Watched all Super Beginner videos' },
        { img: "/badges/Asset 23.webp", title: 'Cultural explorer', description: 'Watched 50 "Culture" videos' },
        { img: "/badges/Asset 24.webp", title: 'Cultural ambassador', description: 'Watched 100 "Culture" videos' },
        { img: "/badges/Asset 25.webp", title: 'Eternal light', description: 'Premium Member' },
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
                                <img 
                                    src={val.img} 
                                    alt={val.title} 
                                    className="object-contain w-full h-full" 
                                    loading="lazy"
                                    width="84"
                                    height="84"
                                />
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