import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import PostCustom from "./PostCustom";
import Post2Custom from "./Post2Custom";
import AllPost from "./AllPost";
import { useSelector } from "react-redux";
import axios from "axios";

const FeaturedPost = () => {
  const token = useSelector((state) => state.user.token);

  // State for all posts and featured posts
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for featured posts sections
  const [featuredPost, setFeaturedPost] = useState(null);
  const [secondaryPosts, setSecondaryPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://admin.arabicallthetime.com/api/blogs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const allPostsData = response?.data?.payload?.all || [];
        const latestPostsData = response?.data?.payload?.latest || [];

        setAllPosts(allPostsData);
        setVisiblePosts(allPostsData.slice(0, 6));

        // Set featured posts from latest posts
        if (latestPostsData.length > 0) {
          setFeaturedPost(latestPostsData[0]);
        }
        if (latestPostsData.length > 1) {
          setSecondaryPosts(latestPostsData.slice(1, 3));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  const handleLoadMore = () => {
    if (!showAll) {
      setVisiblePosts(allPosts);
      setShowAll(true);
    }
  };

  if (loading)
    return (
      <div className="pt-10 flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-5">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-pally text-heading mb-6">
            Featured Post
          </h1>
          {featuredPost && <PostCustom {...featuredPost} />}
        </div>
        <div className="lg:col-span-7">
          <div className="flex flex-col gap-6 lg:gap-8 lg:mt-16">
            {secondaryPosts.map((post, index) => (
              <Post2Custom key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
      <div className="">
        <AllPost
          visiblePosts={visiblePosts}
          allPosts={allPosts}
          showAll={showAll}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </div>
  );
};

export default FeaturedPost;
