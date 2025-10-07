import React from 'react';

const IntroCustom = ({ heading, description1, description2, description3, heading2 }) => {
  return (
    <div className="px-6 sm:px-10 lg:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="col-span-1 sm:col-span-1">
          <div className="flex flex-col gap-4">
            <h1 className="text-smallscreenheading md:text-headingsize text-headingcolor font-bold">{heading}</h1>
            <p className="text-paracolor text-base sm:text-lg">{description1}</p>
            <p className="text-paracolor text-base sm:text-lg">{description2}</p>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-1">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl text-headingcolor font-bold">{heading2}</h1>
            <p className="text-paracolor text-base sm:text-lg">{description3}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCustom;
