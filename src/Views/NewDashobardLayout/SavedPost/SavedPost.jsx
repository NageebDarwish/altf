import React, { useEffect, useState } from 'react'
import Languagelearnigcustom from '../LanguageLearning/Languagelearnigcustom'
import { IoIosArrowDown, IoMdTime } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import FilterCustom from '../../../components/FilterCustom/FilterCustom';
import { CiTimer } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { setTopicCounts } from '../../../store/reducers/topicCountsSlice';
const SavedPost = () => {
   

    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.token)
    const token = useSelector((state) => state.user.token)

    const fetchSavedPosts = async () => {

        try {
            setLoading(true);
            const response = await axios.get(
                'https://admin.arabicallthetime.com/api/get/all/saved-posts',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            // console.log(response.data.payload,"res.data.payload")
            if (response?.data?.success) {
                setPost(response.data.payload);
                dispatch(setTopicCounts({
                    saved: response.data.payload.length
                }));
            } else {
                console.error('Failed to fetch saved posts.');
            }

            console.log(response, 'response');
        } catch (error) {
            console.error('Error fetching saved posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
         if (isAuthenticated) {
             fetchSavedPosts();
    }
    }, [isAuthenticated]);

    const options = [
        { option: "Sort By" },
        { icon: <CiTimer />, option: "Newest" },
        { icon: <IoMdTime />, option: "Oldest" }

    ]
    console.log(post, 'post')
     if (!isAuthenticated) {
  return (
    <div className="text-center text-lg py-8 font-semibold text-gray-600">
      Please log in to see this data.
    </div>
  );
}
    return (
        <>
          
                <div className='flex flex-col gap-4'>
                    <div className='bg-white p-4 rounded-lg'>
                        <h1 className='sm:text-2xl text-heading font-HelveticaNeue font-bold'>
                            Home /  Personal  /  <span className='text-btnbackground'> Saved posts</span>
                        </h1>
                    </div>
                    <div className='bg-white'>
                        <FilterCustom heading={"Saved Posts"} options={options} />
                          {loading ? (
                <div className="text-center text-4xl py-8 font-semibold text-gray-600"><CircularProgress /></div>
            ) : (
                        <Languagelearnigcustom posts={post} setPosts={setPost} refresh={fetchSavedPosts} />
                    )}
                    </div>
                </div>
        </>
    )
}

export default SavedPost
