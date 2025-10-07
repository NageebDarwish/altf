import React from 'react'
import Languagelearnigcustom from '../LanguageLearning/Languagelearnigcustom'
import { IoIosArrowDown, IoMdTime } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { GiJusticeStar } from 'react-icons/gi';
import FilterCustom from '../../../components/FilterCustom/FilterCustom';
import { CiTimer } from 'react-icons/ci';

const PopularPost = () => {
    const posts = [
        {
            id: 1,
            user: 'Name the user',
            time: '5 min ago',
            level: 'Level 2',
            levelColor: 'bg-yellow-400',
            question: 'How can I learn in this method?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
            likes: 155,
            btn1heading: "30 day challenge",
            btn2heading: "Traveling",
            comments: 15,
        },
        {
            id: 2,
            user: 'Name the user',
            time: '5 min ago',
            level: 'AATT Guide',
            levelColor: 'bg-yellow-600',
            question: 'How can I learn in this method?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
            likes: 155,
            btn1heading: "30 day challenge",
            btn2heading: "Traveling",
            comments: 15,
        },
        {
            id: 3,
            user: 'Name the user',
            time: '5 min ago',
            level: 'Level 1',
            levelColor: 'bg-blue-500',
            question: 'How can I learn in this method?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
            likes: 155,
            comments: 15,
            btn1heading: "30 day challenge",
            btn2heading: "Traveling",
        },
        {
            id: 3,
            user: 'Name the user',
            time: '5 min ago',
            level: 'Level 2',
            levelColor: 'bg-yellow-400',
            question: 'How can I learn in this method?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
            likes: 155,
            comments: 15,
            btn1heading: "30 day challenge",
            btn2heading: "Traveling",
        },
        {
            id: 3,
            user: 'Name the user',
            time: '5 min ago',
            level: 'AATT Guide',
            levelColor: 'bg-yellow-600',
            question: 'How can I learn in this method?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
            likes: 155,
            comments: 15,
            btn1heading: "30 day challenge",
            btn2heading: "Traveling",
        },
        {
            id: 3,
            user: 'Name the user',
            time: '5 min ago',
            level: 'Level 1',
            levelColor: 'bg-blue-500',
            question: 'How can I learn in this method?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla',
            likes: 155,
            comments: 15,
            btn1heading: "30 day challenge",
            btn2heading: "Traveling",
        }
    ];

    const options = [
        {option:"Sort By"},
        {icon:<CiTimer />, option:"Newest"},
        {icon:<IoMdTime />, option:"Oldest"}

    ]
    return (
        <>
            <div className='bg-white'>
                <div className='px-4 py-2'>
                <FilterCustom icon={<GiJusticeStar size={22} className='mt-2' />} heading={"Popular posts"} options={options}/>

                </div>
                <Languagelearnigcustom posts={posts} />
            </div>
        </>
    )
}

export default PopularPost
