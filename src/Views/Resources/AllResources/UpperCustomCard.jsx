import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpperCustomCard = ({ title, description, buttonText, navigateTo, img }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white px-4 py-5 rounded-2xl shadow-lg transition duration-300 border  flex flex-col">
      <div className="flex flex-col gap-2 items-center text-center flex-grow">
        <img src={img} alt={title} className="h-[120.71px] object-contain mb-4" />
        <h2 className="text-[32px] font-bold font-pally text-bluePrimary">{title}</h2>
        <p className="text-gray-600 font-HelveticaNeue font-semibold text-[12px] flex-grow">{description}</p>
      </div>

      <button
        onClick={() => navigate(navigateTo)}
        className="mt-auto text-orange-500 font-HelveticaNeue underline font-bold py-4 text-[12px] hover:text-orange-600"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default UpperCustomCard;
