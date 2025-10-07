import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const MembershipCard = ({title,price, description,features,buttonText,isPremium,}) => {
  return (
    <div
      className={`rounded-lg w-full shadow-lg ${isPremium ? " bg-white" : "bg-white"
        }`}>
      <div className="flex items-center rounded-lg px-4 py-2 bg-white justify-between">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
          {title}
        </h3>
        <div className=" text-center">
          <div className="flex items-center justify-center mt-2 gap-1">
            <p className="text-3xl sm:text-4xl font-bold text-orange-500">
              {price}
            </p>
            {isPremium && <p className="text-base text-gray-500">/Month</p>}
          </div>
          <p className="text-sm sm:text-base text-gray-400 font-medium">
            {description}
          </p>
        </div>
      </div>
      <hr />
      <h1 className="px-4 py-2 text-xl font-semibold">Plan Includes :</h1>
      <ul className="p-4 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm sm:text-base">
            <span
              className={`text-xl font-bold ${feature.included ? "text-orange-500" : "text-red-700"
                }`}>
              {feature.included ? <AiOutlineCheck /> : <AiOutlineClose />}
            </span>
            <span className="text-gray-400 font-semibold">{feature.text}</span>
          </li>
        ))}
      </ul>

      <div className="px-4 py-7">
        <button
          className={`w-full py-3 rounded-full font-bold ${isPremium
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "border bg-gray-300 text-gray-800 hover:bg-gray-200"
            }`}>
          {buttonText}
        </button>
        <p className="w-full py-3 rounded-full font-bold text-[#FF7300] mt-3 flex items-center justify-center ">
          {isPremium ? "Cancel Anytime" : "No Credit Card"}
        </p>
      </div>
    </div>
  );
};

export default MembershipCard;
