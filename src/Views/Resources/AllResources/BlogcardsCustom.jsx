import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineYoutube } from 'react-icons/ai';
import { CiFacebook } from 'react-icons/ci';
import { FaInstagram, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoCopyOutline } from 'react-icons/io5';
import { Snackbar } from '@mui/material';

const BlogcardsCustom = ({ blog }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);


  const handlenavigate = () => {
    navigate(`/blogdetails/${blog.id}`);
  }
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden ">
      <img src={blog.cover_image} alt={blog.title} className="w-full h-[224px] object-cover" />
      <div className="p-4">
        <h2 className="text-[26px] font-bold font-HelveticaNeue text-gray-800">{blog.title}</h2>
        <p className="text-gray-600 font-HelveticaNeue text-[16px] mt-2">{blog.description}</p>
        <div className="flex justify-between items-center mt-4">
          <button onClick={handlenavigate} className="mt-4 bg-orange-500 font-HelveticaNeue text-white py-2 px-4 text-[14px] rounded-full hover:bg-orange-600 transition">See More</button>
          <div className="flex gap-5 mt-2">

            <a
              href="https://x.com/ArabicAllTime"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-xl md:text-2xl text-btnbackground  cursor-pointer" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567346062115#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CiFacebook className="text-xl md:text-2xl text-btnbackground cursor-pointer" />
            </a>
            <a
              href="https://www.instagram.com/arabicallthetime/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-xl md:text-2xl text-btnbackground  cursor-pointer" />
            </a>
            <button
              onClick={() => {
                const fullUrl = `${window.location.origin}/blogdetails/${blog.id}`;
                navigator.clipboard.writeText(fullUrl)
                  .then(() => setOpen(true))
                  .catch(err => console.error("Failed to copy: ", err));
              }}
            >
              <IoCopyOutline className="text-xl md:text-2xl text-btnbackground cursor-pointer" />
            </button>

            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={() => setOpen(false)}
              message="Link copied!"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />

          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogcardsCustom
