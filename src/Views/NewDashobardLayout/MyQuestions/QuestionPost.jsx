import React, { useEffect, useState } from 'react'
import Languagelearnigcustom from '../LanguageLearning/Languagelearnigcustom'
import { IoIosArrowDown, IoMdTime } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { GiJusticeStar } from 'react-icons/gi';
import FilterCustom from '../../../components/FilterCustom/FilterCustom';
import { CiTimer } from 'react-icons/ci';
import { request } from '../../../services/axios';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setTopicCounts } from '../../../store/reducers/topicCountsSlice';
const QuestionPost = () => {
    const [allquestionpost, setallquestionpost] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
      const isAuthenticated = useSelector((state) => state.user.token)

    const getAllPosts = async () => {
        try {
            setLoading(true);
            const res = await request({
                method: "get",
                url: "api/post",
            });
            setallquestionpost(res.data.payload);
            dispatch(setTopicCounts({
                questions: res.data.payload.length
            }));

        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
       if (isAuthenticated) {
      getAllPosts();
    }
    }, [isAuthenticated]);

     if (!isAuthenticated) {
  return (
    <div className="text-center text-lg py-8 font-semibold text-gray-600">
      Please log in to see this data.
    </div>
  );
}

    console.log(allquestionpost, 'allquestionpost')

    const options = [
        { option: "Sort By" },
        { icon: <CiTimer />, option: "Newest" },
        { icon: <IoMdTime />, option: "Oldest" }

    ]
    return (
        <>


            <div className='flex flex-col gap-4'>

                <div className='bg-white p-4 rounded-lg'>
                    <h1 className='sm:text-2xl font-HelveticaNeue text-heading font-bold'>
                        Home /  Personal  /  <span className='text-btnbackground'>My Questions</span>
                    </h1>
                </div>
                <div className='bg-white'>
                    <div className='px-4 py-2'>
                        <FilterCustom heading={"My Questions"} options={options} />

                    </div>
                    {loading ? (
                        <div className="text-center text-4xl py-8 font-semibold text-gray-600"><CircularProgress /></div>
                    ) : (
                        <Languagelearnigcustom posts={allquestionpost} setPosts={setallquestionpost} />
                    )}
                </div>
            </div>


        </>
    )
}

export default QuestionPost
