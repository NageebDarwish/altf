import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineYoutube } from "react-icons/ai";
import { CiFacebook } from "react-icons/ci";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoCopyOutline } from "react-icons/io5";
import { Snackbar } from "@mui/material";

const BlogcardsCustom = ({ blog }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  console.log(blog, "blogblogblog");
  const handlenavigate = () => {
    navigate(`/blogs/${blog.slug}`);
  };
  return (
    <div
      onClick={handlenavigate}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300"
    >
      <img
        src={blog.cover_image}
        alt={blog.title}
        className="w-full h-[224px] object-cover"
      />
      <div className="p-4">
        <h2 className="text-[26px] font-bold font-pally text-[#0C3373]">
          {blog.title}
        </h2>
        <p className="text-gray-600 font-HelveticaNeue text-[16px] mt-2">
          {blog.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <button className="mt-4 bg-orange-500 font-HelveticaNeue text-white py-2 px-4 text-[14px] rounded-full hover:bg-orange-600 transition">
            Read More
          </button>
          <div className="flex gap-5 mt-2">
            <a
              href="https://x.com/ArabicAllTime"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FaXTwitter className="text-xl md:text-2xl text-btnbackground  cursor-pointer" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567346062115#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <CiFacebook className="text-xl md:text-2xl text-btnbackground cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/arabicallthetime/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FaInstagram className="text-xl md:text-2xl text-btnbackground  cursor-pointer" />
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const fullUrl = `${window.location.origin}/blogdetails/${blog.id}`;
                navigator.clipboard
                  .writeText(fullUrl)
                  .then(() => setOpen(true))
                  .catch((err) => console.error("Failed to copy: ", err));
              }}
            >
              <IoCopyOutline className="text-xl md:text-2xl text-btnbackground cursor-pointer" />
            </button>

            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
              message="Link copied!"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogcardsCustom;
