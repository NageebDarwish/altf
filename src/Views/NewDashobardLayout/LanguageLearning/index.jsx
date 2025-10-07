// LandingLearning.js
import React, { useEffect, useState } from 'react';
import AatCommunity from './AatCommunity';
import Landinglearning from '../Landinglearning';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTopicCounts } from '../../../utils/helper/hooks/useTopicCounts';
import useSWR from 'swr';
const fetcher = (url) => request({ method: "get", url }).then((res) => res.data.payload);


const LandingLearning = () => {
  const { topic } = useParams();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const isAuthenticated = useSelector((state) => state.user.token);
  const { data: allPosts, error } = useSWR(
    isAuthenticated ? 'api/get/all/posts' : null,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 30000,
    }
  );

  useEffect(() => {
    if (allPosts) {
      if (topic) {
        const filtered = allPosts.filter(post =>
          post.tags?.some(tag => tag.name === topic)
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(allPosts);
      }
    }
  }, [topic, allPosts]);

  const formatTopicName = (name) => {
    if (!name) return "All Posts";
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div style={{ backgroundColor: "#f3f2f7" }} className="relative flex flex-1 overflow-y-auto w-full h-[calc(90vh)] bg-cover bg-center">
      <main className={`relative z-20 flex flex-col gap-4 xl:flex-row text-black w-full`}>
        <div className="flex-1 py-6 rounded-lg shadow-sm">
          {!isAuthenticated ? (
            <div className="text-center text-lg py-8 font-semibold text-gray-600">
              Please log in to see this data.
            </div>
          ) : (
            <Landinglearning
              posts={filteredPosts}
              setPosts={setFilteredPosts}
              loading={!allPosts && !error}
              topic={formatTopicName(topic)}
            />
          )}
        </div>
        <aside className="block w-auto xl:w-[350px] mx-2 mt-6">
          <div className="bg-white p-3 rounded-lg shadow-md">
            <AatCommunity />
          </div>
        </aside>
      </main>
    </div>
  );
};

export default LandingLearning;