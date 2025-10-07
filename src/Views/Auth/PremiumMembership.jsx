import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { request } from "../../services/axios";
import clsx from "clsx";
import SubscriptionMonthly from "./SubscriptionMonthly";
import SubscriptionYearly from "./SubscriptionYearly";

const PremiumMembership = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMembership, setSelectedMembership] = useState({
    monthly: true,
    yearly: false,
  });

  const subscribeMonthly = () => {
    setSelectedMembership((prev) => ({
      ...prev,
      monthly: true,
      yearly: false,
    }));
  };
  const subscribeYearly = () => {
    setSelectedMembership((prev) => ({
      ...prev,
      yearly: true,
      monthly: false,
    }));
  };

  // Handle Stripe success/cancel return
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    const sessionId = params.get("session_id");
    if (status === "success" && sessionId) {
      (async () => {
        try {
          // If you track user id on the client:
          const user = (function(){ try { return JSON.parse(localStorage.getItem('userData')) || {}; } catch { return {}; } })();
          await request({
            url: "api/stripe/confirm",
            method: "post",
            data: { session_id: sessionId, user_id: user?.id },
          }, false);
        } catch (e) {
          // Optional: toast error
        } finally {
          setTimeout(() => navigate("/dashboard/profile"), 1200);
        }
      })();
    } else if (status === "success") {
      setTimeout(() => navigate("/dashboard/profile"), 1200);
    }
  }, [location.search, navigate]);

  return (
    <div className="flex flex-col gap-7 h-auto items-center justify-center py-9">
      {/* manage subscription heading */}
      <h1 className="font-bold text-sm md:text-lg lg:text-[34px]">
        {new URLSearchParams(location.search).get("status") === "success"
          ? "Payment Success! Activating your Premium..."
          : "Manage Subscription"}
      </h1>
      {/* buttons flex */}
      <div className="flex items-center relative">
        <button
          className={clsx(
            "py-3 px-5 rounded-[10px] font-semibold",
            selectedMembership.monthly
              ? "bg-bluePrimary z-10 text-white"
              : "bg-offBackground  text-offText"
          )}
          onClick={subscribeMonthly}
        >
          Monthly
        </button>
        <button
          className={clsx(
            "py-3 px-7 rounded-r-[10px] font-semibold absolute -right-[90%]",
            selectedMembership.yearly
              ? "bg-bluePrimary z-10 text-white rounded-l-[10px]"
              : "bg-offBackground text-offText"
          )}
          onClick={subscribeYearly}
        >
          Yearly
        </button>
      </div>

      {/* subscription monthly or yearly */}
      {selectedMembership.monthly ? (
        <SubscriptionMonthly />
      ) : (
        <SubscriptionYearly />
      )}
    </div>
  );
};

export default PremiumMembership;
