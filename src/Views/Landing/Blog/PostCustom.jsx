import { Snackbar } from "@mui/material";
import { useState } from "react";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PostCustom = ({
  cover_image,
  title,
  description,
  slug,
  author,
  created_at,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    navigate(`/blogs/${slug}`);
  };

  // Ensure we have a proper URL
  const blogUrl = `${window.location.origin}/blogs/${slug}`;
  const shareText = `Check out this interesting blog post: "${title}"`;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(blogUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    // Debug: Log the URL to console
    console.log('Sharing URL:', blogUrl);
    
    // Use Facebook Share Dialog with proper parameters
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}&quote=${encodeURIComponent(shareText)}`;
    console.log('Facebook share URL:', facebookUrl);
    
    // Open in a new window with Facebook's recommended dimensions
    const shareWindow = window.open(
      facebookUrl, 
      'facebook-share', 
      'width=626,height=436,scrollbars=yes,resizable=yes,toolbar=no,menubar=no,location=no,status=no'
    );
    
    // Focus the window
    if (shareWindow) {
      shareWindow.focus();
    } else {
      // Fallback if popup is blocked - copy link to clipboard
      navigator.clipboard.writeText(blogUrl).then(() => {
        setSnackbarMessage("Link copied! You can paste it directly on Facebook.");
        setOpen(true);
      }).catch(() => {
        alert('Please allow popups for this site to share on Facebook, or copy this link: ' + blogUrl);
      });
    }
  };

  const handleInstagramShare = () => {
    // Instagram doesn't support direct URL sharing, so we'll copy the link and show a message
    navigator.clipboard.writeText(blogUrl).then(() => {
      setOpen(true);
    }).catch((err) => console.error('Failed to copy: ', err));
  };

  const [snackbarMessage, setSnackbarMessage] = useState("Link copied!");
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img
        src={cover_image}
        alt={title}
        className="w-full h-48 sm:h-56 md:h-64 object-cover"
      />
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-3">
          <p className="text-xs sm:text-sm text-[#0C3373] font-medium">
            {author} •{" "}
            {new Date(created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <span className="text-xs sm:text-sm text-[#0C3373] font-medium bg-blue-50 px-2 py-1 rounded-full">
            3 min read
          </span>
        </div>
        <h6 className="font-bold text-lg sm:text-xl md:text-[24px] font-pally text-[#0C3373] mb-3 line-clamp-2">
          {title}
        </h6>
        <p className="text-sm sm:text-base text-[#0C3373] mb-4 sm:mb-6 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center justify-center gap-3 mt-4">
          <button
            onClick={handleNavigate}
            className="bg-orange-500 text-white px-5 py-3 font-[700] rounded-full text-sm"
          >
            Read More
          </button>
          <div className="flex gap-4 justify-center sm:justify-end">
            <button onClick={handleTwitterShare} className="hover:scale-110 transition-transform">
              <FaXTwitter className="text-lg sm:text-xl md:text-2xl text-btnbackground cursor-pointer" /> 
            </button>
            <button onClick={handleFacebookShare} className="hover:scale-110 transition-transform">
              <CiFacebook className="text-lg sm:text-xl md:text-2xl text-btnbackground cursor-pointer" />
            </button>
            <button onClick={() => {
              setSnackbarMessage("Link copied! You can paste it in your Instagram story or bio.");
              handleInstagramShare();
            }} className="hover:scale-110 transition-transform">
              <FaInstagram className="text-lg sm:text-xl md:text-2xl text-btnbackground cursor-pointer" />
            </button>
            <button
              onClick={() => {
                setSnackbarMessage("Link copied to clipboard!");
                navigator.clipboard
                  .writeText(blogUrl)
                  .then(() => setOpen(true))
                  .catch((err) => console.error("Failed to copy: ", err));
              }}
              className="hover:scale-110 transition-transform"
            >
              <IoCopyOutline className="text-lg sm:text-xl md:text-2xl text-btnbackground cursor-pointer" />
            </button>
          </div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message={snackbarMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          />
        </div>
      </div>
    </div>
  );
};

PostCustom.propTypes = {
  cover_image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  author: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
};

export default PostCustom;
