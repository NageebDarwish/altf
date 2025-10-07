import React from "react";
import FilterCustom from "../../components/FilterCustom/FilterCustom";
import { CiTimer } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import LanguagelearningCustom from '../../Views/NewDashobardLayout/LanguageLearning/Languagelearnigcustom'
import { CircularProgress } from "@mui/material";

const Landinglearning = ({ posts, loading ,topic,setPosts}) => {
  if (loading) return <div className="p-4 flex items-center justify-center text-4xl"><CircularProgress/></div>;
  if (!posts || posts.length === 0) return <div className="p-4 flex items-center justify-center text-4xl">No posts found !</div>;
  console.log(posts,'posts')

    const options = [
    {option:"Sort By"},
    {icon:<CiTimer />, option:"Newest"},
    {icon:<IoMdTime />, option:"Oldest"}

]

  return (
    <div className='flex flex-col gap-4'>
        <div className='bg-white p-4 rounded-lg'>
          <h1 className='sm:text-2xl text-largeLight font-bold font-HelveticaNeue'>
            Home / Topics / <span className='text-btnbackground'>{topic}</span>
          </h1>
        </div>
        <div className='bg-white'>
          <div className=''>
          <FilterCustom heading={"Language Learning Posts"} options={options}/> 
          </div>
          <LanguagelearningCustom posts={posts} setPosts={setPosts} />
        </div>
      </div>
  );
};

export default Landinglearning;