import React, { useState, useCallback } from "react";
import {
  HiBookmark,
  HiDotsVertical,
  HiEyeOff,
  HiFlag,
  HiThumbUp,
} from "react-icons/hi";
import { HiHandThumbDown } from "react-icons/hi2";
import PostDropdown from "./PostDropdown";
import TagModal from "../CreatePost/TagModal";
import { useNavigate } from "react-router-dom";
import { formatDateString } from "../../../utils/helper/general";
import { request } from "../../../services/axios";
import {
  getCountTextClasses,
  getDislikeButtonClasses,
  getDislikeCount,
  getLikeButtonClasses,
  getLikeCount,
  isUserDisliked,
  isUserLiked,
} from "../../../utils/helper/count";
import PusherCustom from "../../../utils/helper/hooks/PusherCustom";
import { useSelector } from "react-redux";

const PostItem = ({ post, setPosts, currentUser, refresh }) => {
  const navigate = useNavigate();
  const [loadingStates, setLoadingStates] = useState({});

  const levelColorMap = {
    "Level 1": "bg-green-500",
    "Level 2": "bg-blue-500",
    "Level 3": "bg-yellow-500",
    "Level 4": "bg-purple-500",
    "Level 5": "bg-pink-500",
    "Level 6": "bg-indigo-500",
    "Level 7": "bg-teal-500",
    "Level 8": "bg-orange-500",
    "Level 9": "bg-cyan-500",
    "Level 10": "bg-red-500",
  };

  const getLevelColor = (levelName) => {
    return levelColorMap[levelName] || "bg-gray-600";
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePostClick = () => {
    navigate("/newdashboard/comment", { state: { post } });
  };


  const handlePusherLike = useCallback((data) => {
    console.log(data, 'datadata')
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === parseInt(data.message.post_id)) {
          // If user liked
          if (data.message.is_liked === true || data.message.is_liked === "1") {
            // If user already in dislikes, remove from dislikes
            const updatedDislikes = p.dis_likes.filter(
              dislike => String(dislike.user_id) !== String(data.message.user_id)
            );

            // If user not already in likes, add to likes
            const userAlreadyLiked = p.likes.some(
              like => String(like.user_id) === String(data.message.user_id)
            );

            const updatedLikes = userAlreadyLiked
              ? p.likes
              : [...p.likes, { user_id: data.message.user_id }];

            return {
              ...p,
              likes: updatedLikes,
              dis_likes: updatedDislikes
            };
          }
          // If user unliked
          else {
            return {
              ...p,
              likes: p.likes.filter(
                like => String(like.user_id) !== String(data.message.user_id)
              )
            };
          }
        }
        return p;
      })
    );
  }, [setPosts]);

  const handlePusherDislike = useCallback((data) => {
    console.log(data, 'datadata')
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === parseInt(data.message.post_id)) {
          if (data.message.is_dis_liked === true || data.message.is_dis_liked === "0") {
            const updatedLikes = p.likes.filter(
              like => String(like.user_id) !== String(data.message.user_id)
            );

            const userAlreadyDisliked = p.dis_likes.some(
              dislike => String(dislike.user_id) === String(data.message.user_id)
            );

            const updatedDislikes = userAlreadyDisliked
              ? p.dis_likes
              : [...p.dis_likes, { user_id: data.message.user_id }];

            return {
              ...p,
              likes: updatedLikes,
              dis_likes: updatedDislikes
            };
          }
          else {
            return {
              ...p,
              dis_likes: p.dis_likes.filter(
                dislike => String(dislike.user_id) !== String(data.message.user_id)
              )
            };
          }
        }
        return p;
      })
    );
  }, [setPosts]);

  // Set up Pusher listeners
  PusherCustom("like", `like_added_${post.id}`, handlePusherLike);
  PusherCustom("dis_like", `dis_like_added_${post.id}`, handlePusherDislike);

  const handleLike = useCallback(async (postId) => {
    if (loadingStates[postId]) return;

    // Optimistic UI update
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId) {
          const isLiked = isUserLiked(p.likes, currentUser);
          const isDisliked = isUserDisliked(p.dis_likes, currentUser);

          // If already liked, remove like
          if (isLiked) {
            return {
              ...p,
              likes: p.likes.filter(like => String(like.user_id) !== String(currentUser))
            };
          }
          // If not liked, add like and remove dislike if exists
          else {
            return {
              ...p,
              likes: [...p.likes, { user_id: currentUser, is_liked: "1" }],
              dis_likes: p.dis_likes.filter(dislike => String(dislike.user_id) !== String(currentUser))
            };
          }
        }
        return p;
      })
    );

    setLoadingStates((prev) => ({ ...prev, [postId]: true }));

    try {
      await request({
        method: "get",
        url: `api/post/add/like/${postId}`,
      });
    } catch (error) {
      console.error("Error liking post:", error);
      // Rollback on error
      setPosts(prevPosts =>
        prevPosts.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              likes: p.likes.filter(like => String(like.user_id) !== String(currentUser)),
              // Restore dislike if it was removed
              dis_likes: p.dis_likes // You might need to restore the previous state here
            };
          }
          return p;
        })
      );
    } finally {
      setLoadingStates((prev) => ({ ...prev, [postId]: false }));
    }
  }, [loadingStates, currentUser, setPosts]);

  const handleDislike = useCallback(async (postId) => {
    if (loadingStates[postId]) return;

    // Optimistic UI update
    setPosts(prevPosts =>
      prevPosts.map(p => {
        if (p.id === postId) {
          const isDisliked = isUserDisliked(p.dis_likes, currentUser);
          const isLiked = isUserLiked(p.likes, currentUser);

          // If already disliked, remove dislike
          if (isDisliked) {
            return {
              ...p,
              dis_likes: p.dis_likes.filter(dislike => String(dislike.user_id) !== String(currentUser))
            };
          }
          // If not disliked, add dislike and remove like if exists
          else {
            return {
              ...p,
              dis_likes: [...p.dis_likes, { user_id: currentUser, is_dis_liked: "1" }],
              likes: p.likes.filter(like => String(like.user_id) !== String(currentUser))
            };
          }
        }
        return p;
      })
    );

    setLoadingStates((prev) => ({ ...prev, [postId]: true }));

    try {
      await request({
        method: "get",
        url: `api/post/add/dislike/${postId}`,
      });
    } catch (error) {
      console.error("Error disliking post:", error);
      // Rollback on error
      setPosts(prevPosts =>
        prevPosts.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              dis_likes: p.dis_likes.filter(dislike => String(dislike.user_id) !== String(currentUser)),
              // Restore like if it was removed
              likes: p.likes // You might need to restore the previous state here
            };
          }
          return p;
        })
      );
    } finally {
      setLoadingStates((prev) => ({ ...prev, [postId]: false }));
    }
  }, [loadingStates, currentUser, setPosts]);



  const handleSave = async (postId) => {
    if (loadingStates[postId]) return;
    setLoadingStates((prev) => ({ ...prev, [postId]: true }));

    try {
      const res = await request({
        method: "POST",
        url: `api/post/save-unsave/${postId}`,
      });

      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              isSaved: res.data.is_saved,
            };
          }
          return p;
        })
      );
      refresh()
    } catch (error) {
      console.error("Error saving post:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [postId]: false }));
    }
  };
  console.log(post)
  const getDropdownOptions = (postId) => {
    const isSavedByCurrentUser = post?.savers?.some(
      saver => saver?.pivot?.post_id === postId?.toString() &&
        saver?.pivot?.user_id === currentUser?.toString()
    );

    return [
      {
        label: isSavedByCurrentUser ? "Unsave" : "Save",
        icon: <HiBookmark className={`text-xl mt-1 ${isSavedByCurrentUser ? "text-blue-600" : ""}`} />,
        onClick: () => handleSave(postId),
      },
      {
        label: "Hide",
        icon: <HiEyeOff className="text-xl mt-1" />,
        onClick: () => console.log("Hide post", postId),
      },
      // {
      //   label: "Report",
      //   icon: <HiFlag className="text-xl mt-1" />,
      //   onClick: () => setIsModalOpen(true),
      // },
    ];
  };

  return (
    <div key={post.id} className="bg-white p-4 rounded-[9px] mb-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <img
            src="/doggirl.webp"
            alt=""
            className="w-10 h-10 object-center rounded-full sm:w-12 sm:h-12 md:w-[38px] md:h-[38px]"
          />
          <div>
            <h2 className="text-sm font-HelveticaNeue font-bold sm:text-base md:text-[14px]">
              {post?.user?.name}
            </h2>
            <p className="text-xs font-HelveticaNeue text-gray-500 sm:text-[10px]">
              {formatDateString(post?.created_at)}
            </p>
          </div>
          <span
            className={`text-[12px] font-HelveticaNeue text-white px-2 rounded-full sm:text-[10px] md:text-[12px] ${getLevelColor(post?.user?.progress_level?.name)}`}
          >
            {post?.user?.progress_level?.name}
          </span>
        </div>
        <PostDropdown
          options={getDropdownOptions(post.id)}
          buttonLabel={<HiDotsVertical className="text-xl cursor-pointer" />}
        />
      </div>

      {/* Subject - Bold text below name and date */}
      {post.subject && (
        <h3 className="text-[16px] font-HelveticaNeue font-bold mt-2 sm:text-[16px] md:text-[16px]">
          {post.subject}
        </h3>
      )}

      {/* Body - HTML content from backend */}
      {post.body && (
        <div
          className="text-[14px] font-HelveticaNeue text-gray-700 mt-2 sm:text-[14px] md:text-[14px]"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      )}

      {/* File - Show preview based on file type */}
      {post.file && (
        <div className="mt-3">
          <div className="border rounded-lg overflow-hidden bg-gray-50">
            {(() => {
              const fileExtension = post.file
                .split(".")
                .pop()
                ?.toLowerCase();
              const imageExtensions = [
                "jpg",
                "jpeg",
                "png",
                "gif",
                "webp",
                "svg",
              ];
              const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi"];
              const audioExtensions = ["mp3", "wav", "ogg", "aac"];

              if (imageExtensions.includes(fileExtension)) {
                return (
                  <div className="w-full">
                    <img
                      src={post.file}
                      alt="Post attachment"
                      className="w-full h-auto max-h-[400px] object-contain bg-black"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                );
              } else if (videoExtensions.includes(fileExtension)) {
                return (
                  <div className="w-full">
                    <video
                      controls
                      className="w-full h-auto max-h-[400px]"
                      style={{ maxWidth: "100%" }}
                      preload="metadata"
                    >
                      <source
                        src={post.file}
                        type={`video/${fileExtension}`}
                      />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                );
              } else if (audioExtensions.includes(fileExtension)) {
                return (
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🎵</span>
                      <span className="text-sm font-HelveticaNeue text-gray-700">
                        Audio File
                      </span>
                    </div>
                    <audio controls className="w-full" preload="metadata">
                      <source
                        src={post.file}
                        type={`audio/${fileExtension}`}
                      />
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                );
              } else {
                return (
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 text-xl">📎</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-HelveticaNeue text-gray-700">
                          File: {post.file.split("/").pop()}
                        </span>
                        <a
                          href={post.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline text-sm font-HelveticaNeue"
                        >
                          Download File
                        </a>
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      )}

      <h3 className="text-[14px] font-HelveticaNeue font-bold mt-2 sm:text-[14px] md:text-dashboardparasize">
        {post.question}
      </h3>
      <p className="text-[12px] font-HelveticaNeue text-gray-600 mt-1 sm:text-[12px] md:text-[14px]">
        {post.description}
      </p>

      <div className="flex font-HelveticaNeue xs:flex-row justify-between gap-4 items-center mt-3 text-gray-500 text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <span className="flex gap-1 items-center">
            <HiThumbUp
              className={
                Array.isArray(post?.likes) &&
                  post.likes.some(
                    like =>
                      String(like?.user_id) === String(currentUser) &&
                      like?.is_liked === "1"
                  )
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }
              onClick={() => handleLike(post.id)}
            />

            <span>
              {Array.isArray(post?.likes)
                ? post.likes.filter(like => like.is_liked === "1").length
                : 0}
            </span>


            <HiHandThumbDown
              className={
                Array.isArray(post?.dis_likes) &&
                  post.dis_likes.some(
                    dislike =>
                      String(dislike?.user_id) === String(currentUser) &&
                      dislike?.is_dis_liked === "1"
                  )
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }
              onClick={() => handleDislike(post.id)}
            />

            <span>
              {Array.isArray(post?.dis_likes)
                ? post.dis_likes.filter(dislike => dislike.is_dis_liked === "1").length
                : 0}
            </span>

          </span>
          <span
            onClick={handlePostClick}
            className="flex font-HelveticaNeue gap-1 cursor-pointer hover:text-gray-700 transition-colors"
          >
            💬 {Array.isArray(post.comments) ? post.comments.length : 0}
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          {Array.isArray(post.tags) &&
            post.tags.map((tag, index) => (
              <span
                key={index}
                className="border px-2 py-1 md:py-1 bg-gray-100 font-HelveticaNeue rounded-md text-xs sm:text-sm md:text-[15px] mr-1"
              >
                {tag.name}
              </span>
            ))}
        </div>
      </div>

      {/* {isModalOpen && (
        <TagModal
          heading={"Submit Report"}
          tags={[
            "Spam",
            "Sexualization",
            "Hate or Violence",
            "Sharing Personal information",
            "Self-harm or suicide",
            "Prohibited transaction",
            "impersonation",
            "other",
          ]}
          closeModal={closeModal}
        />
      )} */}
    </div>
  );
};

const Languagelearnigcustom = ({ posts, setPosts, refresh }) => {
  const currentUser = useSelector((state) => state?.user?.user?.id);

  return (
    <div className="p-4">
      {posts?.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          setPosts={setPosts}
          currentUser={currentUser}
          refresh={refresh}
        />
      ))}
    </div>
  );
};

export default Languagelearnigcustom;