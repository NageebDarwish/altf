import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  HiBookmark,
  HiDotsVertical,
  HiEyeOff,
  HiFlag,
  HiThumbUp,
} from "react-icons/hi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PostDropdown from "../LanguageLearning/PostDropdown";
import { HiHandThumbDown } from "react-icons/hi2";
import TagModal from "../Createpost/TagModal";
import CustomNestedComment from "./CustomNestedComment";
import { IoIosReorder } from "react-icons/io";
import { formatDateString } from "@utils/helper/general";
import axios from "axios";
import { useSelector } from "react-redux";
import PusherCustom from "@utils/helper/hooks/PusherCustom";
import { request } from "@services/axios";

const CommentPost = () => {
  const { postId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user.id);

  const post_id = location?.state?.post?.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentsEndRef = useRef(null);
  // const [commentid,setCommentid]=useState(null)

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addReplyToCommentsState = useCallback(
    (commentList, parentId, newReply) => {
      return commentList?.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
            replies_count: (comment.replies_count || 0) + 1,
          };
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToCommentsState(
              comment.replies,
              parentId,
              newReply
            ),
          };
        }
        return comment;
      });
    },
    []
  );




  const calculateCounts = (comment) => {
    const likes = comment.likes || [];
    const dislikes = comment.dis_likes || [];

    const allReactions = [...likes, ...dislikes];

    return {
      ...comment,
      likes_count: allReactions.filter((item) => item.is_liked === "1").length,
      dislikes_count: allReactions.filter((item) => item.is_liked === "0")
        .length,
      replies: comment.replies ? comment.replies.map(calculateCounts) : [],
    };
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://admin.arabicallthetime.com/api/post/${post_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPost(response.data.payload);
        setComments(response.data.payload.comments || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, token, location.state]);

  const handlePusherUpdate = useCallback(
    (data) => {

      const newComment = {
        ...data.message,
        user: data.message.user_name || {
          name: "Anonymous",
          profile_picture: "/doggirl.png",
        },
        replies: [],
        likes: data.message.likes || [],
      };

      setComments((prevComments) => {
        if (data.message.parent_id) {
          return addReplyToCommentsState(
            prevComments,
            data.message.parent_id,
            newComment
          );
        } else {
          return [newComment, ...prevComments];
        }
      });
    },
    [addReplyToCommentsState]
  );



  PusherCustom("comment", `comment_added_${post_id}`, handlePusherUpdate);
  // PusherCustom(
  //   "comment_like",
  //   `comment_like_added_${commentid}`,
  //   handlePusherLikeDislike
  // );

  const handleCommentSubmit = async (parentId = null, text = null) => {
    try {
      const commentContent = text || commentText;
      if (!commentContent.trim() || !post) return;

      const requestData = {
        comment: commentContent,
        user_id: userId,
        post_id: post_id,
      };
      if (parentId) {
        requestData.parent_id = parentId;
      }
      setIsSubmitting(true);
      const response = await request({
        method: "post",
        url: `api/post/comment/${post_id}`,
        data: requestData,
      });
      if (response.data.success) {
        setCommentText("");
        setTimeout(scrollToBottom, 100);
      }
    } catch (error) {
      console.error(
        "Error posting comment:",
        error.response?.data || error.message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const gohome = () => {
    navigate("/newdashboard/home");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dropdownOptions = [
    { label: "Save", to: "#", icon: <HiBookmark className="text-xl mt-1" /> },
    { label: "Hide", to: "#", icon: <HiEyeOff className="text-xl mt-1" /> },
    { label: "Report", to: "#", icon: <HiFlag className="text-xl mt-1" /> },
  ];

  if (loading) {
    return <div className="bg-white p-4">Loading...</div>;
  }

  if (error) {
    return <div className="bg-white p-4">Error: {error}</div>;
  }

  if (!post) {
    return <div className="bg-white p-4">Post not found</div>;
  }
  return (
    <>
      <div className="bg-white p-4">
        <h1 onClick={gohome} className="flex gap-3 py-4 text-xl text-primary">
          <FaArrowLeft className="mt-1" /> Back to Feed
        </h1>

        {/* Post details */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col xl:flex-row items-center gap-2">
              <img
                src={post.user?.profile_picture || "/doggirl.png"}
                alt=""
                className="w-10 h-10 object-center rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16"
              />
              <div>
                <h2 className="text-sm font-bold font-HelveticaNeue sm:text-base md:text-lg">
                  {post.user?.name || post.user?.fullname || "Anonymous"}
                </h2>
                <p className="text-xs font-HelveticaNeue text-gray-500 sm:text-[10px]">
                  {formatDateString(post?.created_at)}
                </p>
              </div>
              {post.user?.progress_level?.name && (
                <span
                  className={`text-xs font-HelveticaNeue text-white px-2 rounded-full sm:text-sm md:text-base bg-blue-500`}
                >
                  {post.user.progress_level.name}
                </span>
              )}
            </div>
            <PostDropdown
              options={dropdownOptions}
              buttonLabel={
                <HiDotsVertical className="text-xl cursor-pointer" />
              }
              onReportClick={() => setIsModalOpen(true)}
            />
          </div>
          {post.subject && (
            <h3 className="text-[16px] font-HelveticaNeue font-bold mt-2 sm:text-[16px] md:text-[16px]">
              {post.subject}
            </h3>
          )}

          {post.body && (
            <div
              className="text-[14px] font-HelveticaNeue text-gray-700 mt-2 sm:text-[14px] md:text-[14px]"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          )}

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
          <div className="flex xs:flex-row flex-col xs:justify-between gap-4 items-center mt-3 text-gray-500 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="flex gap-1 font-HelveticaNeue">
                <HiThumbUp className="text-xl hover:text-blue-500 cursor-pointer" />
                {post.likes.length || 0}
                <HiHandThumbDown className="text-xl hover:text-red-500 cursor-pointer" />
                {post.dis_likes.length || 0}
              </span>
            </div>
            <div className="flex gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="border px-2 py-1 font-HelveticaNeue bg-gray-100 rounded-md text-xs sm:text-sm md:text-base"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Comment input */}
        <div className="py-4">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full border p-2 rounded-2xl bg-gray-100 placeholder:text-gray-600"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && commentText.trim()) {
                handleCommentSubmit(null, commentText); // Pass null for parentId as it's a top-level comment
              }
            }}
            disabled={isSubmitting}
          />
          {isSubmitting && <p>Posting comment...</p>}
        </div>

        <div className="flex gap-3 py-2">
          <h1 className="text-xl">{comments.length || 0} Comments</h1>
          <h1 className="flex text-xl gap-3">
            <IoIosReorder className="mt-1" /> Order By
          </h1>
        </div>

        <CustomNestedComment
          comments={comments}
          setComments={setComments}
          postId={post.id}
          handleCommentSubmit={handleCommentSubmit}
          // handleLikeDislike={handleLikeDislike} // Pass this down
          currentUserId={userId} // Pass current user ID for like/dislike tracking
            // setCommentid={setCommentid} // ✅ Pass this down
        />
        {/* <div ref={commentsEndRef} /> */}
      </div>

      {isModalOpen && (
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
      )}
    </>
  );
};

export default CommentPost;
