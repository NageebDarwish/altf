import React from 'react';

const Nodownloadcard = ({ imageUrl, title, description,title2 }) => {
  return (
    <div className="h-80 w-full bg-white shadow-lg rounded-lg overflow-hidden relative">
      {/* Circular Image */}
      <div className="">
        <img
          src={imageUrl}
          alt=""
          className="w-28 h-28 mx-auto mt-10 rounded-full border-4 border-white shadow-lg"
        />
      </div>

      {/* Card Content */}
      <div className="pt-16 px-2 pb-4 text-center">
        <h2 className="text-lg font-semibold ">{title} <span className='text-[#005687]'> {description} </span> {title2}</h2>
      </div>
    </div>
  );
};

export default Nodownloadcard;