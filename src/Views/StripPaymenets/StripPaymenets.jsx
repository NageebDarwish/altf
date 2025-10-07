// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// const StripePayments = () => {
//     const location = useLocation();
//       const { email, fullname, plan, cardNumber, cvv, expiryDate } = location.state || {};
//   const [stripePublicKey, setStripePublicKey] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [planDetails, setPlanDetails] = useState({
//     price: 23,
//     id: "static-plan-id",
//   });

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const settingsResponse = await axios.get(
//           "https://courselearningbackendv2.projectsaeedan.com/api/settings"
//         );
//         setStripePublicKey(settingsResponse.data.payload.stripe_public_key);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching settings:", error);
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   if (loading) {
//     return <div>Loading payment gateway...</div>;
//   }

//   if (!stripePublicKey) {
//     return <div>Unable to load payment gateway. Please try again later.</div>;
//   }

//   const stripePromise = loadStripe(stripePublicKey);

//   return (
//     <Elements stripe={stripePromise}>
//       <CheckoutForm planDetails={planDetails} />
//     </Elements>
//   );
// };

// const CheckoutForm = ({ planDetails }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState(false);

//   // ✅ Extract values here
//   const price = planDetails?.price || 23;
//   const planId = planDetails?.id || "static-plan-id";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     setError(null);

//     if (!stripe || !elements) return;

//     try {
//       const token = "157|eH9DzP3IJgKZlMNWqhblvHJ4oHw8VAocYyvxk5CY86a3e69a";

//       // Step 1: Create payment intent
//       const { data } = await axios.post(
//         "https://courselearningbackendv2.projectsaeedan.com/api/subscription",
//         {
//           user_id: 1, // Replace with actual user ID

//           plan_id: 1,
//           amount: 2230,

//           price: 34,
//           card_number: "4242424242424242", // Dummy for now, fetch real info if needed
//           card_type: "Visa",
//           expiry_date: "2026-03-12",
//           cardholder_name: "John Doe",
//           cvv: "123",
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.message || err.message || "Payment failed");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="border p-3 rounded">
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": { color: "#aab7c4" },
//                 },
//                 invalid: { color: "#9e2146" },
//               },
//             }}
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={!stripe || processing}
//           className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//             processing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {processing ? "Processing..." : `Pay $${price}`}
//         </button>

//         {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//         {success && (
//           <div className="text-green-500 text-sm mt-2">
//             Payment successful! Thank you for your purchase.
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default StripePayments;








// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import axios from "axios";

// const StripePaymentPage = () => {
//   const location = useLocation();
//   const { email="irfan@gmail.com", fullname="ali", plan, cardNumber="4242424242424242", cvv="321", expiryDate="02/26"  } = location.state || {};
//   const [stripePublicKey, setStripePublicKey] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [paymentStatus, setPaymentStatus] = useState({ success: false, message: "" });

  // useEffect(() => {
  //   const fetchSettings = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://courselearningbackendv2.projectsaeedan.com/api/settings"
  //       );
  //     //  setStripePublicKey(response.data.payload.stripe_public_key);
  //     } catch (error) {
  //       console.error("Error fetching settings:", error);
  //       setPaymentStatus({
  //         success: false,
  //         message: "Failed to load payment gateway"
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSettings();
  // }, []);

//   if (loading) {
//     return <div className="text-center py-8">Loading payment gateway...</div>;
//   }

//   if (!stripePublicKey) {
//     return (
//       <div className="text-center py-8 text-red-500">
//         Unable to load payment gateway. Please try again later.
//       </div>
//     );
//   }

//   const stripePromise = loadStripe(stripePublicKey);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Payment</h2>
        
//         <div className="mb-6">
//           <p className="text-gray-600">Plan: <span className="font-medium">{plan || "Premium"}</span></p>
//           <p className="text-gray-600">Customer: <span className="font-medium">{fullname}</span></p>
//           <p className="text-gray-600">Email: <span className="font-medium">{email}</span></p>
//         </div>

//         {paymentStatus.message && (
//           <div className={`p-4 mb-6 rounded-md ${paymentStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
//             {paymentStatus.message}
//           </div>
//         )}

//         {!paymentStatus.success && (
//           <Elements stripe={stripePromise}>
//             <CheckoutForm 
//               customerData={{ email, fullname }} 
//               onPaymentComplete={(success, message) => setPaymentStatus({ success, message })}
//             />
//           </Elements>
//         )}
//       </div>
//     </div>
//   );
// };

// const CheckoutForm = ({ customerData, onPaymentComplete }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [processing, setProcessing] = useState(false);
//   const [amount] = useState(2300); // $23.00 in cents

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements) {
//       onPaymentComplete(false, "Stripe not initialized");
//       setProcessing(false);
//       return;
//     }

//     try {
//       // 1. Create payment method using Stripe Elements
//       const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: customerData.fullname,
//           email: customerData.email,
//         },
//       });

//       if (stripeError) {
//         throw stripeError;
//       }

//       // 2. Call your backend to process payment
      // const token = "157|eH9DzP3IJgKZlMNWqhblvHJ4oHw8VAocYyvxk5CY86a3e69a";
      // const response = await axios.post(
      //   "https://courselearningbackendv2.projectsaeedan.com/api/subscription",
      //   {
      //     payment_method_id: paymentMethod.id,
      //     amount: amount,
      //     email: customerData.email,
      //     name: customerData.fullname,
      //     plan_id: 1 // Your plan ID
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

//       // 3. Handle payment confirmation if required
//       if (response.data.requires_action) {
//         const { error: confirmError } = await stripe.confirmCardPayment(
//           response.data.client_secret
//         );
//         if (confirmError) {
//           throw confirmError;
//         }
//       }

//       onPaymentComplete(true, "Payment successful! Thank you for your subscription.");
//     } catch (error) {
//       console.error("Payment error:", error);
//       let errorMessage = "Payment failed. Please try again.";
      
//       if (error.type === "card_error" || error.type === "validation_error") {
//         errorMessage = error.message;
//       } else if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       }

//       onPaymentComplete(false, errorMessage);
//     } finally {
//       setProcessing(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="border border-gray-200 p-4 rounded-lg">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//                 iconColor: "#666EE8",
//               },
//               invalid: {
//                 color: "#9e2146",
//                 iconColor: "#FFC7EE",
//               },
//             },
//             hidePostalCode: false,
//           }}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || processing}
//         className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//           processing ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
//         } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
//       >
//         {processing ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
//       </button>

//       <div className="text-xs text-gray-500 mt-2">
//         Your payment is processed securely by Stripe. We don't store your card details.
//       </div>
//     </form>
//   );
// };

// export default StripePaymentPage;












// import { useLocation } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const ConfirmPayment = () => {
//   const location = useLocation();
//   const { email = "irfan@gmail.com", fullname = "ali", plan, cardNumber = "4242424242424242", cvv = "321", expiryDate = "02/26" } = location.state || {};
//   const [clientSecret, setClientSecret] = useState('');
//   const [paymentIntentId, setPaymentIntentId] = useState('');
//   const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await axios.get(
//           "https://courselearningbackendv2.projectsaeedan.com/api/settings"
//         );
//       //  setStripePublicKey(response.data.payload.stripe_public_key);
//       } catch (error) {
//         console.error("Error fetching settings:", error);
//         setPaymentStatus({
//           success: false,
//           message: "Failed to load payment gateway"
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSettings();
//   }, []);

//   useEffect(() => {
//     const createAndConfirmPayment = async () => {
//       try {
//         // 1. First create a payment intent
//         const createIntentResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${clientSecret}`,
//             'Content-Type': 'application/x-www-form-urlencoded'
//           },
//           body: new URLSearchParams({
//             amount: '1000', // Amount in cents (e.g., $10.00)
//             currency: 'usd',
//             payment_method_types: 'card'
//           })
//         });

//         const paymentIntent = await createIntentResponse.json();
//         setClientSecret(paymentIntent.client_secret);
//         setPaymentIntentId(paymentIntent.id);

//         // 2. Then confirm the payment with card details
//         const [exp_month, exp_year] = expiryDate.split('/');

//         const confirmResponse = await fetch(`https://api.stripe.com/v1/payment_intents/${paymentIntent.id}/confirm`, {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${clientSecret}`,
//             'Content-Type': 'application/x-www-form-urlencoded'
//           },
//           body: new URLSearchParams({
//             payment_method: 'card',
//             'card[number]': cardNumber,
//             'card[exp_month]': exp_month,
//             'card[exp_year]': exp_year,
//             'card[cvc]': cvv,
//             return_url: window.location.origin // For 3D Secure if needed
//           })
//         });

//         const confirmationData = await confirmResponse.json();
//         console.log('Payment confirmation:', confirmationData);

//       } catch (error) {
//         console.error("Payment error:", error);
//       }
//     };

//     createAndConfirmPayment();
//   }, []);

//   return (
//     <div>
//       <h2>Confirming Payment...</h2>
//     </div>
//   );
// };

// export default ConfirmPayment;



// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
// import "./OverlayLoader.css";

// // Your publishable key (not secret key!) from Stripe Dashboard
// const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY; // <-- Use Publishable Key

// const ConfirmPayment = () => {
//   const location = useLocation();
//   const { email = "irfan@gmail.com", fullname = "ali", plan, cardNumber = "4242424242424242", cvv = "321", expiryDate = "02/26" } = location.state || {};
  
//   const [clientSecret, setClientSecret] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [paymentStatus, setPaymentStatus] = useState(null);

  // useEffect(() => {
  //   const fetchClientSecret = async () => {
  //     try {
  //       const response = await axios.post(
  //         "https://courselearningbackendv2.projectsaeedan.com/api/stripe",
  //         { price: 12 }
  //       );
  //       console.log("Fetched Client Secret:", response.data.clientSecret);
  //       setClientSecret(response.data.clientSecret);
  //     } catch (error) {
  //       console.error("Error fetching client secret:", error);
  //       setPaymentStatus({
  //         success: false,
  //         message: "Failed to load payment gateway",
  //       });
  //     }
  //   };
  //   fetchClientSecret();
  // }, []);


//   useEffect(() => {
//     if (!clientSecret || !STRIPE_PUBLISHABLE_KEY) return;
  
//     const confirmPayment = async () => {
//       try {
//         const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
//         const [exp_month, exp_year] = expiryDate.split('/');
  
//         const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//           payment_method: {
//             card: {
//               number: cardNumber.replace(/\s+/g, ''), // Remove any spaces from card number
//               exp_month: parseInt(exp_month, 10),
//               exp_year: parseInt(exp_year, 10),
//               cvc: cvv,
//             },
//             billing_details: {
//               name: fullname,
//               email: email,
//             },
//           },
//         });
  
//         if (error) {
//           console.error(error);
//           setPaymentStatus({ success: false, message: error.message });
//         } else if (paymentIntent && paymentIntent.status === "succeeded") {
//           console.log("Payment succeeded:", paymentIntent);
//           setPaymentStatus({ success: true, message: "Payment Successful!" });
  
//           // Save the subscription to your backend
//           const token = "157|eH9DzP3IJgKZlMNWqhblvHJ4oHw8VAocYyvxk5CY86a3e69a";
//           await axios.post(
//             "https://courselearningbackendv2.projectsaeedan.com/api/subscription",
//             {
//               payment_method_id: paymentIntent.payment_method,
//               amount: paymentIntent.amount, // Use the actual amount from paymentIntent
//               email: email,
//               name: fullname,
//               plan_id: plan || 1,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               }
//             }
//           );
//         } else {
//           setPaymentStatus({ success: false, message: "Payment Failed!" });
//         }
//       } catch (error) {
//         console.error("Payment Error:", error);
//         setPaymentStatus({
//           success: false,
//           message: error.message || "Error occurred during payment",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     confirmPayment();
//   }, [clientSecret, email, fullname, plan, cardNumber, expiryDate, cvv, STRIPE_PUBLISHABLE_KEY]);
//   return (
//     <div>
//       {loading && (
//         <div className="overlay">
//           <div className="loader">Loading...</div>
//         </div>
//       )}
//       <h2>Confirming Payment...</h2>
//       {paymentStatus && (
//         <div>
//           <p>{paymentStatus.message}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ConfirmPayment;




import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress, TextField, Paper } from "@mui/material";
import axios from "axios";

const StripPayments = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // User input (only editable fields)
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  // Static card data (display-only)
  const cardNumber = "4242 4242 4242 4242";
  const cvv = "123";
  const expiryDate = "12/34";

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const { data } = await axios.post("https://your-backend.com/api/stripe", { price: 12 });
        setClientSecret(data.clientSecret);
      } catch (err) {
        setPaymentStatus({ success: false, message: "Failed to initiate payment." });
      } finally {
        setLoading(false);
      }
    };

    fetchClientSecret();
  }, []);

  const handleSubmit = async () => {
    // Just showing a static success message for demonstration.
    // Normally you would confirm card payment here using Stripe APIs
    setPaymentStatus({ success: true, message: "Mock payment successful (UI only)." });
  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" mb={2}>Payment Form</Typography>

          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Card Number"
            fullWidth
            margin="normal"
            value={cardNumber}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="CVV"
            fullWidth
            margin="normal"
            value={cvv}
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Expiry Date"
            fullWidth
            margin="normal"
            value={expiryDate}
            InputProps={{ readOnly: true }}
          />

          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
            Submit
          </Button>

          {paymentStatus && (
            <Typography
              variant="h6"
              mt={2}
              color={paymentStatus.success ? "success.main" : "error.main"}
            >
              {paymentStatus.message}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default StripPayments;




