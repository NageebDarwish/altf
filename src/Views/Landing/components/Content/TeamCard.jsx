import React from 'react';

const TeamCard = ({ name, image }) => {
  return (
    <div className="bg-[#FFF1E6] rounded-[20px] flex flex-col items-center p-4 shadow-md max-w-[200px]">
      <img
        src={image}
        alt={name}
        className="rounded-[20px] w-full object-cover aspect-square"
      />
      <div className="bg-white w-full text-center mt-[-20px] py-2 rounded-b-[20px]">
        <h2 className="text-blue-700 font-semibold text-lg">{name}</h2>
      </div>
    </div>
  );
};

export default TeamCard;
