import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PricingPage = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const isPremium = useSelector((state) => state?.user?.user?.is_premium);
  const userSubscription = useSelector(
    (state) => state?.user?.user?.subscription?.plan?.name
  );

  // Hide entire page if user is premium
  if (isAuthenticated === "1" && isPremium === "1") {
    return (
      <div className="px-6 xl:px-20 py-12 flex flex-col items-center justify-center">
        <h2 className="text-xl sm:text-2xl md:text-[52px] pb-4 font-pally font-bold text-[#0C3373] mb-6">
          You already have Premium access!
        </h2>
        <p className="text-gray-600 text-center">
          Thank you for being a premium member. You have access to all features.
        </p>
      </div>
    );
  }
  const handleNavigate = () => {
    navigate("/free-membership-plan");
  };

  const handlePrimNavigate = () => {
    navigate("/primium-membership-plan");
  };

  return (
    <div className="px-6 xl:px-20 py-12  flex flex-col items-center justify-center">
      <h2 className="text-xl sm:text-2xl md:text-[52px] pb-4  font-pally font-bold text-[#0C3373] mb-6">
        Pricing Plans
      </h2>

      {/* Toggle Button */}
      <div className="bg-[#E4EFFF] shadow-2xl rounded-lg flex p-2">
        <button
          className={`px-8 py-3 text-xl font-[500] rounded-lg text-btntextsize font-HelveticaNeue transition-all ${
            isMonthly ? "bg-[#0C3373] text-white" : "text-gray-700"
          }`}
          onClick={() => setIsMonthly(true)}
        >
          Monthly
        </button>
        <button
          className={`px-8 py-3 text-xl font-[500] text-btntextsize rounded-lg font-HelveticaNeue transition-all ${
            !isMonthly ? "bg-[#0C3373] text-white" : "text-[#1F509E]"
          }`}
          onClick={() => setIsMonthly(false)}
        >
          Yearly
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-8 w-full">
        {/* Free Plan - Hide if user has free subscription */}
        {!(isAuthenticated === "1" && userSubscription === "Free") && (
          <div className="border rounded-2xl bg-white shadow-md p-6 flex flex-col items-center text-center w-[394px] h-auto">
            <h3 className="text-green-500 font-pally text-[44px] px-5 py-5 font-bold">
              Free
            </h3>
            <p className="text-3xl font-bold text-[48px] text-heading">$0</p>
            <p className="mb-2 font-HelveticaNeue text-[14px] font-bold text-heading mt-6">
              Start for Free
            </p>
            <div className="bg-[#FAFCFF] w-full p-6 rounded-lg flex flex-col h-full">
              <ul className="text-heading font-HelveticaNeue space-y-4 text-sm text-left flex-grow">
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Free videos
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Progress tracking
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Community forums
                </li>
                <li className="text-[#CAD4E3] mt-2 line-through font-bold">
                  Exclusive videos added daily
                </li>
                <li className="text-[#CAD4E3] line-through font-bold">
                  Premium video series
                </li>
                <li className="text-[#CAD4E3] line-through font-bold">
                  Ability to watch videos offline
                </li>
              </ul>
              <button
                className="bg-transparent text-xl font-HelveticaNeue text-dashboardPrimary px-4 py-3 rounded-full mt-9 w-full border border-[#F28327] hover:bg-[#F28327] hover:text-white transition"
                onClick={handleNavigate}
              >
                Sign Up For Free
              </button>
              <p className="text-sm font-bold text-[#1CC932] mt-3 bg-[#DBFFDF] py-2 px-2  mx-auto">
                No credit card required.
              </p>
            </div>
          </div>
        )}

        {/* Premium Plan - Hide if user is premium */}
        {isPremium !== "1" && (
          <div className="border rounded-2xl bg-heading text-white shadow-md p-7 flex flex-col items-center text-center w-[394px] h-auto relative">
            <img
              src="/Ellipse 54.webp"
              alt=""
              className="absolute left-[75px] rounded-lg top-0"
            />
            <span className="absolute font-HelveticaNeue top-0 right-6 text-xs text-white px-3 py-1 flex flex-col items-center justify-center w-[30px] h-[80px]">
              <img
                src="/Rectangle 5187.webp"
                alt=""
                className="absolute inset-0 w-full h-full"
              />
              <span className="relative rotate-[360deg]">Best Plan</span>
            </span>

            <h3 className="text-yellow-400 font-pally text-xl md:text-[44px] py-8 px-5 font-bold z-50">
              Premium
            </h3>
            {isMonthly ? (
              <span>
                $14.99<span className="text-sm"> /monthly</span>
              </span>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <h1 className="flex line-through text-[#a0a7b9] text-lg">
                      $14.99
                    </h1>
                    <h1 className="text-[15px] bg-[#ef4358] rounded-2xl px-2">
                      33% savings
                    </h1>
                  </div>
                  <span>
                    $9.99<span className="text-sm"> /yearly</span>
                  </span>
                </div>
              </>
            )}
            <p className="mb-3 font-HelveticaNeue text-[#B6C2D5] text-[14px] font-bold  mt-2">
              Get More With Premium
            </p>
            <div className="bg-white p-6 w-full rounded-md flex flex-col h-full">
              <ul className="text-[#0C3373] font-HelveticaNeue space-y-3 text-sm sm:text-base text-left flex-grow font-bold">
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Free videos
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Progress tracking
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Community forums
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> 2 Exclusive videos added daily
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Premium video series
                </li>
                <li className="flex items-center gap-2 font-bold">
                  <FaCheck color="#4CD45E" /> Ability to watch videos offline
                </li>
              </ul>

              <button
                className="bg-dashboardPrimary w-full text-xl font-HelveticaNeue text-white px-6 py-3 rounded-full mt-6 hover:bg-orange-600 transition-all duration-300"
                onClick={handlePrimNavigate}
              >
                Go Premium
              </button>

              <p className="text-xs sm:text-sm bg-[#DBFFDF99] flex  p-2 font-bold text-[#1CC932] mt-3  mx-auto">
                Recurring billing, cancel anytime.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;
