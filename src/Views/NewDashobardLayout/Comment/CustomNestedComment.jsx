import React, { useState, useCallback } from "react";
import {
  HiBookmark,
  HiDotsVertical,
  HiEyeOff,
  HiFlag,
  HiThumbUp,
} from "react-icons/hi";
import { HiHandThumbDown } from "react-icons/hi2";
import PostDropdown from "../LanguageLearning/PostDropdown";
import TagModal from "../Createpost/TagModal";
import axios from "axios";
import PusherCustom from "../../../utils/helper/hooks/PusherCustom";
import { useSelector } from "react-redux";

const CommentItem = ({
  comment,
  setComments,
  handleCommentSubmit,
  currentUserId,
  level,
}) => {
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useSelector((state) => state.user.token);
  console.log(comment,'comment.id')
  

  const updateCommentLikes = useCallback(
    (commentList, commentId, isLike, currentUserId) => {
      return commentList.map((c) => {
        if (!c) return c;

        let updatedComment = { ...c };

        if (updatedComment.id === commentId) {
          const likes = updatedComment.likes ? [...updatedComment.likes] : [];
          const existingLikeIndex = likes.findIndex(
            (like) => like.user_id == currentUserId
          );

          if (existingLikeIndex !== -1) {
            const existingLike = likes[existingLikeIndex];
            if (existingLike.is_liked === (isLike ? "1" : "0")) {
              likes.splice(existingLikeIndex, 1);
            } else {
              likes[existingLikeIndex] = {
                ...existingLike,
                is_liked: isLike ? "1" : "0",
              };
            }
          } else {
            likes.push({
              user_id: currentUserId.toString(),
              is_liked: isLike ? "1" : "0",
            });
          }

          updatedComment.likes = likes;
        }

        if (
          Array.isArray(updatedComment.replies) &&
          updatedComment.replies.length > 0
        ) {
          updatedComment.replies = updateCommentLikes(
            updatedComment.replies,
            commentId,
            isLike,
            currentUserId
          );
        }

        return updatedComment;
      });
    },
    []
  );
   const handlePusherLikeDislike = useCallback(
    (data) => {
      console.log("Pusher like/dislike data received:", data);

      // Extract the actual message data
      const messageData = data.message || data;
      const commentId = parseInt(messageData.comment_id);
      const isLiked = messageData.is_liked;
      const pusherUserId = parseInt(messageData.user_id); // Use the user_id from Pusher data
      const userName = messageData.user_name;

      // Don't update if the Pusher event is from the current user
      // This prevents interference with the local optimistic update
      if (pusherUserId === parseInt(currentUserId)) {
        console.log("Ignoring Pusher event from current user");
        return;
      }

      setComments((prevComments) => {
        const updateWithPusherData = (comments) => {
          return comments.map((c) => {
            if (c.id === commentId) {
              // Get current likes array
              const currentLikes = c.likes || [];

              // Find if the Pusher user already has a like/dislike
              const existingLikeIndex = currentLikes.findIndex(
                (like) => parseInt(like.user_id) === pusherUserId
              );

              let updatedLikes = [...currentLikes];

              if (existingLikeIndex !== -1) {
                // Check if user is removing the like/dislike (same action)
                if (updatedLikes[existingLikeIndex].is_liked === isLiked) {
                  // Remove the like/dislike
                  updatedLikes.splice(existingLikeIndex, 1);
                } else {
                  // Update existing like/dislike
                  updatedLikes[existingLikeIndex] = {
                    ...updatedLikes[existingLikeIndex],
                    is_liked: isLiked,
                  };
                }
              } else {
                // User doesn't have a like/dislike, add new one
                updatedLikes.push({
                  user_id: pusherUserId.toString(),
                  is_liked: isLiked,
                });
              }

              return {
                ...c,
                likes: updatedLikes,
                // Update counts
                likes_count: updatedLikes.filter(
                  (like) => like.is_liked === "1"
                ).length,
                dislikes_count: updatedLikes.filter(
                  (like) => like.is_liked === "0"
                ).length,
              };
            }

            // Recursively update nested replies
            if (c.replies && c.replies.length > 0) {
              return { ...c, replies: updateWithPusherData(c.replies) };
            }
            return c;
          });
        };
        return updateWithPusherData(prevComments);
      });
    },
    [setComments, currentUserId] // Added currentUserId back to dependencies
  );

   PusherCustom(
    "comment_like",
    `comment_like_added_${comment.id}`,
    handlePusherLikeDislike
  );

  const handleLikeDislike = useCallback(
    async (commentId, isLike) => {
      setComments((prev) =>
        updateCommentLikes(prev, commentId, isLike, currentUserId)
      );

      try {
        await axios.get(
          `https://admin.arabicallthetime.com/api/like-comment/${commentId}?is_like=${
            isLike ? 1 : 0
          }`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Error liking/disliking comment:", error);
        setComments((prev) =>
          updateCommentLikes(prev, commentId, !isLike, currentUserId)
        );
      }
    },
    [token, currentUserId, setComments, updateCommentLikes]
  );

  // Fixed Pusher handler - now uses the actual user_id from Pusher data
 

  // Make sure you're listening to the correct channel and event
 

  const handleLocalReplySubmit = async (parentId) => {
    console.log(parentId,'parentId234')
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    try {
      await handleCommentSubmit(parentId, replyText);
      setReplyText("");
      setReplyingToCommentId(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(comment,'commentmikiik')

  return (
    <div
      key={comment.id}
      id={`comment-${comment.id}`}
      className={`bg-white p-4 rounded-lg mb-4 border-l-2 ${
        level > 0 ? "border-gray-200" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col xl:flex-row items-center gap-2">
          <img
            src={comment?.user?.profile_picture || "/doggirl.webp"}
            alt=""
            className="w-10 h-10 object-center rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16"
          />
          <div>
            <h2 className="text-sm font-bold sm:text-base md:text-md">
              {comment?.user?.name || comment?.user_name || comment?.user?.fullname || "Unknown"}
            </h2>
            <p className="text-[10px] text-gray-500 sm:text-[10px]">
              {new Date(comment?.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <p>{comment.comment}</p>
      <div className="flex justify-between items-center mt-3 text-gray-500 text-sm sm:text-base">
        <div className="flex items-center gap-4">
          <span className="flex gap-1">
            <HiThumbUp
              className={`text-xl cursor-pointer ${
                comment.likes?.some(
                  (like) =>
                    like.user_id == currentUserId && like.is_liked === "1"
                )
                  ? "text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => handleLikeDislike(comment.id, true)}
            />
            <span>
              {comment.likes?.filter((like) => like.is_liked === "1").length ||
                0}
            </span>
            <HiHandThumbDown
              className={`text-xl cursor-pointer ${
                comment.likes?.some(
                  (like) =>
                    like.user_id == currentUserId && like.is_liked === "0"
                )
                  ? "text-red-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
              onClick={() => handleLikeDislike(comment.id, false)}
            />
            <span>
              {comment.likes?.filter((like) => like.is_liked === "0").length ||
                0}
            </span>
          </span>
          <button
            onClick={() =>
              setReplyingToCommentId(
                replyingToCommentId === comment.id ? null : comment.id
              )
            }
          >
            Reply
          </button>
        </div>
        {(comment.replies_count || comment.replies?.length) > 0 && (
          <span className="text-sm">
            {comment.replies_count || comment.replies?.length} replies
          </span>
        )}
      </div>
      {replyingToCommentId === comment.id && (
        <div className="mt-3 pl-4">
          <input
            type="text"
            placeholder={`Replying to ${comment?.user?.name || comment?.user || comment?.user?.fullname || "Anonymous"}...`}
            className="w-full border p-2 rounded-2xl bg-gray-100 placeholder:text-gray-600"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && replyText.trim()) {
                handleLocalReplySubmit(comment.id);
              }
            }}
            disabled={isSubmitting}
          />
          {isSubmitting && (
            <p className="text-sm text-gray-500">Posting reply...</p>
          )}
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <CustomNestedComment
          comments={comment.replies}
          setComments={setComments}
          level={level + 1}
          handleCommentSubmit={handleCommentSubmit}
          currentUserId={currentUserId}
          token={token}
        />
      )}
    </div>
  );
};

const CustomNestedComment = ({
  comments = [],
  setComments,
  level = 0,
  handleCommentSubmit,
  currentUserId,
}) => {
     const sortedComments = [...comments].sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div className={`bg-white w-full ${level > 0 ? "pl-8" : ""}`}>
      {sortedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          setComments={setComments}
          level={level}
          handleCommentSubmit={handleCommentSubmit}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default CustomNestedComment;
