import React, { useEffect } from 'react'
import Languagelearnigcustom from '../LanguageLearning/Languagelearnigcustom'
import { IoIosArrowDown, IoMdTime } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import FilterCustom from '../../../components/FilterCustom/FilterCustom';
import { CiTimer } from 'react-icons/ci';
import { request } from '../../../services/axios';
import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setTopicCounts } from '../../../store/reducers/topicCountsSlice';
const MyAnswer = () => {
  const [allmyanswer, setallmyanswer] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.user.token)


  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await request({
        method: "get",
        url: "api/get/all/myanswers",
      });
      setallmyanswer(res.data.payload);
      dispatch(setTopicCounts({
        answers: res.data.payload.length
      }));
      console.log(res.data.payload, 'allmyanswer')
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

  const options = [
    { option: "Sort By" },
    { icon: <CiTimer />, option: "Newest" },
    { icon: <IoMdTime />, option: "Oldest" }

  ]
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
            Home /  Personal  /  <span className='text-btnbackground'>My Answers</span>
          </h1>
        </div>
        <div className='bg-white'>
          <div className='px-4 py-2'>
            <FilterCustom heading={"My Answers"} options={options} />
          </div>
          {loading ? (
            <div className="text-center text-4xl py-8 font-semibold text-gray-600"><CircularProgress /></div>
          ) : (
            <Languagelearnigcustom posts={allmyanswer} setPosts={setallmyanswer} />
          )}
        </div>
      </div>

    </>
  )
}

export default MyAnswer
