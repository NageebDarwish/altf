import React from 'react';

const CustomLanding = ({ imageSrc, title, description, isImageRight }) => {
  return (
    <div
      className={`flex font-helvetica flex-col lg:flex-row items-center gap-8 my-12 ${
        isImageRight ? "lg:flex-row-reverse" : ""
      }`}>
      <img src={imageSrc} alt={title} className="w-full lg:w-1/2 h-64 lg:h-80 object-cover"/>
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <h3 className="text-largeLight font-bold mb-4">{title}</h3>
        <p className="lg:text-description leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CustomLanding;
