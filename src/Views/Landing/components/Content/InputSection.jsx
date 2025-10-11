import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PricingCardSkeleton from "./PricingCardSkeleton";
import { Container } from "@components/common";
import { CircularProgress } from "@mui/material";
import API_CONFIG, {
  createApiUrl,
  API_ENDPOINTS,
} from "../../../../config/api";
import { request } from "../../../../services/axios";

const PricingPlans = () => {
  const { pathname } = useLocation();
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const isPremium = useSelector((state) => state?.user?.user?.is_premium);

  // Debug logging
  const [plans, setPlans] = useState([]);
  const [isMonthly, setIsMonthly] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const is_alreadyUser = useSelector(
    (state) => state?.user?.user?.subscription?.plan?.name
  );
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_ENDPOINTS.settings.plans)
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        setPlans(data.payload);
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleNavigate = async (planName, cycle) => {
    try {
      setCheckoutLoading(true);

      // For paid plans, check authentication first
      if (planName.toLowerCase() !== "free") {
        if (!isAuthenticated) {
          toast.error("Please sign in to subscribe to premium plans");
          navigate("/sign-in");
          return;
        }
      }

      // For free plan, keep existing flow
      if (planName.toLowerCase() === "free") {
        const selectedPlan = plans.find(
          (p) => p.name === planName && p.cycle === cycle
        );
        navigate("/free-membership-plan", { state: { plan: selectedPlan } });
        return;
      }

      // For paid plans, request backend to create Checkout and redirect
      const selectedPlan = plans.find(
        (p) => p.name === planName && p.cycle === cycle
      );
      const user = /** get user from redux if available */ (function () {
        try {
          return JSON.parse(localStorage.getItem("userData")) || {};
        } catch {
          return {};
        }
      })();
      const successUrl = `${window.location.origin}/subscriptions?status=success`;
      const cancelUrl = `${window.location.origin}/subscriptions?status=cancel`;

      const res = await request(
        {
          url: "api/stripe/checkout",
          method: "post",
          data: {
            plan_id: selectedPlan?.id,
            name: user?.name || user?.username || user?.fullname || undefined,
            email: user?.email || undefined,
            success_url: successUrl,
            cancel_url: cancelUrl,
            currency: selectedPlan?.currency || undefined,
          },
        },
        false
      );
      const url = res?.data?.url || res?.data?.payload?.url;
      if (url) window.location.href = url; // Redirect to Stripe-hosted Checkout
    } catch (e) {
      console.error("Checkout error", e);
      toast.error("Unable to start checkout. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const filteredPlans = plans.filter((plan) =>
    isMonthly ? plan.cycle === "monthly" : plan.cycle === "yearly"
  );

  const premiumPlan = filteredPlans.find((plan) => plan.name === "Premium");
  const defaultPlans = plans.filter((plan) => plan.is_default === "1");

  // If you want the free plan specifically (assuming it's the only default)
  const freePlan = defaultPlans.find((plan) => plan.price === "0");

  // Calculate how many cards will be visible
  const showPremium = isPremium !== "1" && isPremium !== true && premiumPlan;
  const showFree =
    isAuthenticated !== "1" && isAuthenticated !== true && freePlan;
  const cardCount = [showPremium, showFree].filter(Boolean).length;

  const handleFreeClick = () => {
    if (is_alreadyUser === "Free") {
      toast.info("You have already taken the Free Trial");
    } else {
      handleNavigate(freePlan.name, freePlan.cycle);
    }
  };
  if (
    (isAuthenticated === "1" || isAuthenticated === true) &&
    (isPremium === "1" || isPremium === true)
  )
    return "";
  return (
    <div className="bg-white">
      <Container className="py-8 md:py-16">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-pally font-bold text-[#0C3373] mb-6">
            Pricing Plans
          </h2>
          {isLoading ? (
            <PricingCardSkeleton />
          ) : (
            <>
              <div className="bg-[#E4EFFF] shadow-2xl rounded-lg flex p-2">
                <button
                  className={`px-8 sm:px-10 md:px-12 py-2 sm:py-3 text-sm sm:text-base md:text-lg lg:text-xl font-[500] rounded-xl font-HelveticaNeue transition-all ${
                    isMonthly ? "bg-[#0C3373] text-white" : "text-gray-700"
                  }`}
                  onClick={() => setIsMonthly(true)}
                >
                  Monthly
                </button>
                <button
                  className={`px-8 sm:px-10 md:px-12 py-2 sm:py-3 text-sm sm:text-base md:text-lg lg:text-xl font-[500] rounded-xl font-HelveticaNeue transition-all ${
                    !isMonthly ? "bg-[#0C3373] text-white" : "text-[#1F509E]"
                  }`}
                  onClick={() => setIsMonthly(false)}
                >
                  Yearly
                </button>
              </div>

              <div
                className={`grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 mt-6 md:mt-8 w-full max-w-4xl mx-auto justify-center items-center ${
                  cardCount === 1 ? "md:grid-cols-1 max-w-md" : "md:grid-cols-2"
                }`}
              >
                {/* Premium Plan */}
                {showPremium && (
                  <div
                    className={`border rounded-2xl bg-heading text-white shadow-md p-4 sm:p-5 md:p-6 flex flex-col items-center text-center relative ${
                      (isAuthenticated === "1" || isAuthenticated === true) &&
                      isPremium !== "1" &&
                      isPremium !== true
                        ? "block"
                        : ""
                    }`}
                  >
                    <img
                      src="/Ellipse 54.png"
                      alt=""
                      className={`absolute ${
                        (isAuthenticated === "1" || isAuthenticated === true) &&
                        isPremium !== "1" &&
                        isPremium !== true
                          ? "left-[75px]"
                          : "left-[13px]"
                      } rounded-lg top-0`}
                    />
                    <span className="absolute font-HelveticaNeue top-0 right-6 text-xs text-white px-3 py-1 flex flex-col items-center justify-center w-[30px] h-[80px]">
                      <img
                        src="/Rectangle 5187.png"
                        alt=""
                        className="absolute inset-0 w-full h-full"
                      />
                      <span
                        className="relative rotate-[360deg]"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        Best Plan
                      </span>
                    </span>

                    <div className="flex flex-col items-center justify-start py-4">
                      <h3 className="text-yellow-400 font-pally text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-3 sm:px-5 font-bold z-30">
                        {premiumPlan.name}
                      </h3>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4 md:py-6 lg:py-8 mb-4">
                      <p className="text-2xl sm:text-3xl text-[#FFF1E6] md:text-textheading font-bold px-3">
                        {isMonthly ? (
                          <span>
                            ${premiumPlan.price}
                            <span className="text-xs sm:text-sm">
                              {" "}
                              /monthly
                            </span>
                          </span>
                        ) : (
                          <>
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-2 justify-center">
                                <h1 className="flex line-through text-[#a0a7b9] text-sm sm:text-base md:text-lg">
                                  $14.99
                                </h1>
                                <h1 className="text-xs sm:text-sm bg-[#ef4358] rounded-2xl px-2">
                                  33% savings
                                </h1>
                              </div>
                              <span>
                                ${premiumPlan.price}
                                <span className="text-xs sm:text-sm">
                                  {" "}
                                  /yearly
                                </span>
                              </span>
                            </div>
                          </>
                        )}
                      </p>
                      <p className="font-HelveticaNeue text-[#B6C2D5] text-xs sm:text-sm font-bold mt-2">
                        Get More With Premium
                      </p>
                    </div>

                    <div className="bg-white p-4 sm:p-5 md:p-6 w-full rounded-md flex flex-col flex-grow">
                      <ul className="text-heading font-HelveticaNeue space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-left flex-grow">
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Free videos
                        </li>
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Progress tracking
                        </li>
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Community forums
                        </li>
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Exclusive videos added
                          daily
                        </li>
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Premium video series
                        </li>
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Ability to watch videos
                          offline
                        </li>
                      </ul>

                      <div className="mt-auto pt-4 sm:pt-6">
                        <button
                          className="bg-dashboardPrimary w-full text-base sm:text-lg md:text-xl font-HelveticaNeue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-orange-600 transition-all duration-300 disabled:opacity-60"
                          onClick={() =>
                            handleNavigate(premiumPlan.name, premiumPlan.cycle)
                          }
                          disabled={checkoutLoading}
                        >
                          {checkoutLoading ? (
                            <span className="flex items-center gap-2 justify-center">
                              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Redirecting...
                            </span>
                          ) : (
                            "Go Premium"
                          )}
                        </button>

                        <p className="text-xs sm:text-sm bg-[#DBFFDF99] flex p-2 font-bold text-[#1CC932] mt-3 mx-auto rounded">
                          Recurring billing, cancel anytime.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* Free Plan */}
                {showFree && (
                  <div className="border rounded-2xl bg-white text-heading shadow-md p-4 sm:p-5 md:p-6 flex flex-col items-center text-center relative">
                    <div className="flex flex-col items-center justify-start py-4 sm:py-6">
                      <h3 className="text-green-500 font-pally text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl px-3 sm:px-5 font-bold">
                        {freePlan?.name}
                      </h3>
                    </div>

                    <div className="flex flex-col items-center justify-center py-4 md:py-6 lg:py-8 mb-4">
                      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heading">
                        ${freePlan?.price}
                      </p>
                      <p className="font-HelveticaNeue text-xs sm:text-sm font-bold text-heading mt-2">
                        Start for Free
                      </p>
                    </div>

                    <div className="bg-[#FAFCFF] w-full p-4 sm:p-5 md:p-6 rounded-lg flex flex-col flex-grow">
                      <ul className="text-heading font-HelveticaNeue space-y-2 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg text-left flex-grow">
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Free videos
                        </li>
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Progress tracking
                        </li>
                        <li className="flex items-center gap-2 font-bold text-xs sm:text-sm md:text-base">
                          <FaCheck color="#4CD45E" /> Community forums
                        </li>
                        <li className="text-[#CAD4E3] line-through font-bold text-xs sm:text-sm md:text-base">
                          Exclusive videos added daily
                        </li>
                        <li className="text-[#CAD4E3] line-through font-bold text-xs sm:text-sm md:text-base">
                          Premium video series
                        </li>
                        <li className="text-[#CAD4E3] line-through font-bold text-xs sm:text-sm md:text-base">
                          Ability to watch videos offline
                        </li>
                      </ul>

                      <div className="mt-auto pt-4 sm:pt-6">
                        <button
                          className="bg-transparent text-base sm:text-lg md:text-xl font-HelveticaNeue text-dashboardPrimary px-4 py-2 sm:py-3 rounded-full w-full border border-[#F28327] hover:bg-[#F28327] hover:text-white transition"
                          onClick={handleFreeClick}
                        >
                          Sign Up For Free
                        </button>

                        <p className="text-xs sm:text-sm font-bold text-[#1CC932] mt-3 bg-[#DBFFDF] py-2 px-2 mx-auto rounded">
                          No credit card required.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {pathname.includes("/pricing") && (
                <Link to={"/"} className="text-[#0C3373] mt-8 cursor-pointer">
                  No, Thanks!
                </Link>
              )}
            </>
          )}
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </Container>
    </div>
  );
};

export default PricingPlans;
