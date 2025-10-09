// HomePost.js
import React from "react";
import useSWR from "swr";
import Languagelearnigcustom from "../LanguageLearning/Languagelearnigcustom";
import { IoMdTime } from "react-icons/io";
import { BsPinAngleFill } from "react-icons/bs";
import { TbMessageDots } from "react-icons/tb";
import FilterCustom from "../../../components/FilterCustom/FilterCustom";
import { CiTimer } from "react-icons/ci";
import { fetcher } from "../../../services/axios";
import { CircularProgress } from "@mui/material";
import HomeCards from "./HomeCards";
import { useSelector } from "react-redux";
import { useTopicCounts } from "../../../utils/helper/hooks/useTopicCounts";

const HomePost = () => {
  const isLoggedIn = useSelector((state) => state.user.token);
  const { error: topicCountsError } = useTopicCounts(); // This will keep topic counts updated
  
  const { data: allPosts, error, isValidating, mutate } = useSWR(
    isLoggedIn ? "api/get/all/posts" : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: true,
    }
  );

  const options = [
    { option: "Sort By" },
    { icon: <CiTimer />, option: "Newest" },
    { icon: <IoMdTime />, option: "Oldest" },
  ];

  if (!isLoggedIn) {
    return (
      <div className="text-center text-lg py-8 font-semibold text-gray-600">
        Please log in to see this data.
      </div>
    );
  }

  if (error || topicCountsError) {
    return <div className="text-center text-red-500">Error loading posts.</div>;
  }

  if (!allPosts) {
    return (
      <div className="text-center text-4xl py-8 font-semibold text-gray-600">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white p-4 rounded-[9px]">
        <h1 className="flex gap-1 font-HelveticaNeue sm:text-dashboardheadingsize py-3 text-heading font-bold">
          <BsPinAngleFill className="mt-1" /> Highlights
        </h1>
        <HomeCards />
      </div>
      <div className="bg-white rounded-[9px]">
        <div className="px-4 py-2">
          <FilterCustom
            icon={<TbMessageDots className="mt-1" />}
            optionicon={[]}
            heading={"Community feed"}
            options={options}
          />
        </div>
        <Languagelearnigcustom posts={allPosts} setPosts={mutate} />
      </div>
    </div>
  );
};

export default HomePost;