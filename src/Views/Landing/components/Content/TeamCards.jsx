import React from 'react';

const TeamCards = ({ image, name, role, description }) => {
  return (
    <div className="relative w-full shadow-lg ">
      <div
        className="h-64 sm:h-80 lg:h-80 bg-cover md:object-cover lg:object-contain rounded-t-[70px] bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white rounded-t-2xl box-content max-h-36 shadow-md overflow-hidden">
        <div className="">
          <h3 className="flex items-center justify-center text-2xl ml-2 font-bold text-[#0C3373] ">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default TeamCards;
