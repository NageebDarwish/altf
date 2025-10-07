import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { planDetails, email, fullname, plan } = location.state || {};

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        // 1. First get the publishable key
        const settingsResponse = await axios.get(
          "https://admin.arabicallthetime.com/api/settings"
        );
        
        // Initialize Stripe with publishable key
        setStripePromise(loadStripe(settingsResponse.data.payload.stripe_public_key));
        
        // 2. Then create a PaymentIntent to get client secret
     
        
        setClientSecret(paymentIntentResponse.data.clientSecret);
        
      } catch (err) {
        console.error("Error initializing payment:", err);
        setError("Failed to initialize payment system");
      } finally {
        setLoading(false);
      }
    };

    initializeStripe();
  }, [planDetails]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  if (loading) return <div>Loading payment gateway...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!clientSecret) return <div>Payment system not available</div>;

  return (
    <div className="p-4">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm 
          planDetails={planDetails}
          email={email}
          fullname={fullname}
          plan={plan}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;