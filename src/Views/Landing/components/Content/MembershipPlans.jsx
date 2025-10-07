import React from "react";
import { useSelector } from "react-redux";
import MembershipCard from "./MembershipCard";

const MembershipPlans = () => {
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const isPremium = useSelector((state) => state?.user?.user?.is_premium);
  const userSubscription = useSelector((state) => state?.user?.user?.subscription?.plan?.name);

  // Hide entire section if user is premium
  if (isAuthenticated === "1" && isPremium === "1") {
    return null;
  }

  const plans = [
    {
      title: "Free Membership",
      price: "$0",
      description: "Start for free",
      features: [
        { text: "Free video collection", included: true },
        { text: "Progress tracking", included: true },
        { text: "Basic library feature", included: true },
        { text: "Community forums", included: true },
        { text: "Entire video library", included: false },
        { text: "Three new videos added daily", included: false },
        { text: "Ability to download videos", included: false },
      ],
      buttonText: "Sign Up Now",
      isPremium: false,
    },
    {
      title: "Premium Membership",
      price: "$11.99",
      description: "Get More With Premium",
      features: [
        { text: "Free video collection", included: true },
        { text: "Progress tracking", included: true },
        { text: "Basic library feature", included: true },
        { text: "Community forums", included: true },
        { text: "Entire video library", included: true },
        { text: "Three new videos added daily", included: true },
        { text: "Ability to download videos", included: true },
      ],
      buttonText: "Go Premium",
      isPremium: true,
    },
  ];

  // Filter plans based on user status
  const filteredPlans = plans.filter((plan) => {
    // If user is authenticated and has free subscription, hide free plan
    if (isAuthenticated === "1" && userSubscription === "Free") {
      return plan.isPremium; // Only show premium plan
    }
    // If user is not authenticated, show both plans
    // If user is authenticated but not premium, show both plans
    return true;
  });

  return (
    <div className="py-16 px-6 sm:px-10 lg:px-16 bg-[#E4EFFF2E] font-helvetica">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h2 className="text-largeLight underline underline-offset-8 text-gray-800">
          Membership Plans
        </h2>
        {/* Toggle for Monthly/Yearly */}
        <div className="flex mt-4 sm:mt-0 rounded-md">
          <button className="p-4 px-6 bg-gray-300 rounded-l-md hover:bg-gray-400">
            Monthly
          </button>
          <button className="p-4 px-6 bg-orange-500 text-white rounded-r-md hover:bg-orange-600">
            Yearly
          </button>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
        {filteredPlans.map((plan, index) => (
          <MembershipCard key={index} {...plan} />
        ))}
      </div>
    </div>
  );
};

export default MembershipPlans;
