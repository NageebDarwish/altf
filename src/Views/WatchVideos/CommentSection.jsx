import axios from "axios";
import React, { useState } from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { FaChevronDown, FaChevronUp, FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { formatDateString } from "../../utils/helper/general";
import { RxAvatar } from "react-icons/rx";

const CommentSection = ({ video, contentType }) => {
  console.log(video, 'videocomment')
  const comments = video?.comments
  console.log(comments, 'commentscomments')
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState(comments || []);
  const comLength = localComments?.length;
  const token = useSelector((state) => state.user.token)
  const currentUserId = useSelector((state) => state.user.user?.id) // Get current user ID
  console.log(localComments, 'localComments')
  // Update local comments when video comments change
  React.useEffect(() => {
    setLocalComments(comments || []);
  }, [comments]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        type: contentType,
        video_id: video.id,
        comment: comment.trim()
      };

      // Replace this with your actual API call
      const response = await fetch('https://admin.arabicallthetime.com/api/add/video/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setComment("");
        // Add the new comment to the top of local comments
        const newComment = {
          id: Date.now(), // temporary ID until refresh
          comment: comment.trim(),
          user: {
            name: "You", // or get current user name from state
            profile_image: "/pic1.png" // or get current user image
          },
          likes: [],
          created_at: new Date().toISOString()
        };
        setLocalComments(prevComments => [newComment, ...prevComments]);
      } else {
        console.error("Failed to post comment:", data.message);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlelike = async (commentId) => {
    try {
      const response = await axios.get(
        `https://admin.arabicallthetime.com/api/like/video/comment/${commentId}?is_liked=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, 'response')
      if (response.data.success) {
        console.log("Comment liked successfully");

        // Update local state to reflect the like change
        setLocalComments(prevComments =>
          prevComments.map(comment => {
            if (comment.id === commentId) {
              const userAlreadyLiked = comment.likes?.some(like => like.user_id == currentUserId);

              if (userAlreadyLiked) {
                // Remove like
                return {
                  ...comment,
                  likes: comment.likes.filter(like => like.user_id != currentUserId)
                };
              } else {
                // Add like
                const newLike = {
                  id: Date.now(), // temporary ID
                  comment_id: commentId,
                  user_id: currentUserId,
                  is_liked: "1",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                };
                return {
                  ...comment,
                  likes: [...(comment.likes || []), newLike]
                };
              }
            }
            return comment;
          })
        );
      } else {
        console.error("Failed to like comment:", response.data.message);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  // Helper function to check if current user has liked a comment
  const isCommentLikedByUser = (comment) => {
    return comment.likes?.some(like => like.user_id == currentUserId);
  };

  // Helper function to get like count
  const getLikeCount = (comment) => {
    return comment.likes?.length || 0;
  };

  return (
    <div className="bg-white md:mt-6 rounded-lg shadow-md p-4">
      {/* Header - FAQ Style Toggle */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex gap-3 items-center">
          <BiMessageRoundedDetail className="h-6 w-6 text-dashboardPrimary" />
          <h2 className=" md:text-[32px] font-bold text-[#0C3573] font-pally">{comLength} Comments</h2>
        </div>
        {isOpen ? <FaChevronUp className="text-gray-600" /> : <FaChevronDown className="text-gray-600" />}
      </div>

      {isOpen && (
        <div className="p-3 font-HelveticaNeue">
          {/* User Input Section */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* <img src="/pic1.png" alt="Profile" className="w-6 h-6 rounded-full" /> */}
            <input
              type="text"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 border rounded-lg h-10 px-5 text-sm focus:outline-none bg-[#E3E3E3] focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleCommentSubmit}
              disabled={isSubmitting || !comment.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Comment"}
            </button>
          </div>

          <div className="space-y-4">
            {localComments
              ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              ?.map((comment) => (
                <div key={comment.id} className="flex gap-3 items-start p-2 border-b">
                  {comment?.user?.profile_image ? (
                    <img
                      src={comment.user.profile_image}
                      alt={comment.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <RxAvatar
                      className="w-8 h-8 rounded-full bg-gray-200 p-1"
                      title={comment.name}
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex gap-2">
                      <h3 className="text-sm font-extrabold">{comment?.user?.name || comment?.user?.fullname}</h3>
                      <h3 className="text-xs text-gray-500">{formatDateString(comment?.created_at)}</h3>
                    </div>
                    <p className="text-[#8E8E8E] text-sm">{comment.comment}</p>
                    <div className="flex items-center gap-3 text-gray-500 text-sm">
                      <div className="flex items-center gap-1">
                        {isCommentLikedByUser(comment) ? (
                          <FaThumbsUp
                            onClick={() => handlelike(comment.id)}
                            className="cursor-pointer text-blue-500"
                          />
                        ) : (
                          <FaRegThumbsUp
                            onClick={() => handlelike(comment.id)}
                            className="cursor-pointer hover:text-blue-500"
                          />
                        )}
                        <span>{getLikeCount(comment)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;