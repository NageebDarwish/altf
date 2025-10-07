import { Button } from "@mui/material";
import React, { useState, useRef } from "react";

const PaymentDetails = ({ goToNext }) => {
  return (
    <div className="p-12">
      {/* <div className='mb-8'>
                <img src="/Logo.webp" alt="Logo" />
            </div> */}
      <div className="border p-6 rounded-lg ">
        <h3 className="font-bold text-2xl mb-2">Payment Details</h3>
        <h3 className="text-gray-400 text-sm mb-6">
          Please enter your payment details
        </h3>

        {/* Card Holder and Card Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Card Holder
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter card holder name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Card Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter card number"
            />
          </div>
        </div>

        {/* Expiration Date and CVV */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Expiration Date
            </label>
            <input
              type="month"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">CVV</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CVV"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Save payment information</span>
          </label>
        </div>
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              I agree to the terms and conditions
            </span>
          </label>
        </div>

        {/* Cancel and Confirm buttons */}
        <div className="flex justify-end gap-5">
          <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={goToNext}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmPin = ({ goToPrevious, goToNext }) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const handleConfirmPayment = () => {
    // Perform payment confirmation logic here (if any), then move to step 3
    goToNext();
  };
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Move to next input field if a digit is entered
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1].focus();
      }

      // Move to previous input field if the current one is cleared
      if (value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="p-12">
      <div className="mb-8">{/* <img src="/Logo.jpg" alt="Logo" /> */}</div>
      <div className="border p-6 rounded-lg ">
        <h3 className="font-bold text-2xl mb-2">Confirmation</h3>
        <h3 className="text-gray-400 text-sm mb-6">
          Please enter your 4 digits pin to confirm booking.
        </h3>
        <h3 className="text-gray-400 text-sm mb-2 text-center">
          Enter your 4-digit card pin to confirm this payment
        </h3>

        {/* OTP-like PIN input fields */}
        <div className="flex justify-center space-x-4 mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Cancel and Confirm Payment buttons */}
        <div className="flex justify-end gap-5">
          <button
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
            onClick={goToPrevious}
          >
            Cancel
          </button>
          <button
            onClick={goToNext}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentSuccess = () => {
  return (
    <div className="mt-[15%]">
      {/* <img src="/Logo.jpg" alt="Logo" className='mb-8' /> */}
      <div
        className="text-center "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-white bg-green-400 rounded-full p-4 mb-4 border-2 border-green-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-bold text-2xl mb-2">Payment Completed</h3>
        <h3 className="text-gray-400 text-sm mb-6">
          Your payment has been completed successfully
        </h3>
        <Button variant="contained">Next</Button>
      </div>
    </div>
  );
};

const Price = () => {
  const [step, setStep] = useState(1);

  const goToNext = () => {
    // Move to next step if it's less than 3
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const goToPrevious = () => {
    // Move to previous step if it's greater than 1
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <>
      {step === 1 && <PaymentDetails goToNext={goToNext} />}
      {step === 2 && (
        <ConfirmPin goToNext={goToNext} goToPrevious={goToPrevious} />
      )}
      {step === 3 && <PaymentSuccess />}
    </>
  );
};

export default Price;
