import React, { useState, useEffect } from "react";
import Nodownloadcard from "./Nodownloadcard";
import { useNavigate } from "react-router-dom";

const Nodownload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const cardsData = [
    {
      imageUrl: "/ChampionsTrophy.webp",
      title: "Three new videos",
      description: "every day",
      title2: ", for all levels.",
    },
    {
      imageUrl: "/ChampionsTrophy.webp",
      title: "More than",
      description: "3000+",
      title2: "private videos.",
    },
    {
      imageUrl: "/ChampionsTrophy.webp",
      title: "Download video and audio for offline use.",
    },
    {
      imageUrl: "/ChampionsTrophy.webp",
      title: "Our premium podcast feed on your favorite podcasting app.",
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const gosignup = () => {
    navigate("/sign-up");
  };

  return (
    <>
      <div className="p-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold flex flex-col gap-1 items-center justify-center">
            Get instant access to our
            <span className="text-3xl sm:text-4xl text-[#005687] font-bold">
              premium membership
            </span>
          </h1>
        </div>

        {/* Cards Grid with responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-10 justify-center">
          {cardsData.map((card, index) => (
            <Nodownloadcard
              key={index}
              imageUrl={card.imageUrl}
              title={card.title}
              description={card.description}
              title2={card.title2}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <h1 className="text-lg sm:text-xl md:text-2xl">
            All this for only <span className="text-blue-800"> $8</span> a month
          </h1>
          <button
            onClick={gosignup}
            className="py-2 px-7 rounded-lg text-white text-lg sm:text-xl bg-[#005687] hover:bg-[#003f56]"
          >
            Sign up to upgrade
          </button>
          <h1
            onClick={handleOpenModal}
            className="text-sm sm:text-lg font-bold text-[#005687] cursor-pointer"
          >
            Terms and Conditions
          </h1>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleBackdropClick}
        >
          <div
            className="max-w-xs sm:max-w-md mx-auto p-6 bg-white shadow-md rounded-lg w-11/12"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <h1 className="text-xl sm:text-2xl font-bold mb-4">
              Privacy Policy for Arabic All The Time
            </h1>
            <p className="mb-4">Effective Date: 22/10/2024</p>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">1. Introduction</h2>
            <p className="mb-4">
              Your privacy is crucial to us. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              use our services, including our API Client.
            </p>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">2. Information We Collect</h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                Personal Information: Name, email address, and any other
                information you provide.
              </li>
              <li>
                Usage Data: Information about how you use our services,
                including your interaction with our API.
              </li>
              <li>
                Device Information: Including IP address, browser type, and
                operating system.
              </li>
              <li>
                Cookies: Small data files stored on your device to enhance your
                experience.
              </li>
            </ul>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>To provide and maintain our services.</li>
              <li>To notify you about changes to our services.</li>
              <li>
                To allow you to participate in interactive features when you
                choose to do so.
              </li>
              <li>To provide customer support and respond to inquiries.</li>
              <li>
                To gather analysis or valuable information so that we can
                improve our services.
              </li>
              <li>To monitor the usage of our services.</li>
              <li>To detect, prevent, and address technical issues.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">4. User Rights</h2>
            <p className="mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>The right to access your personal information.</li>
              <li>The right to rectify any inaccurate information.</li>
              <li>The right to request deletion of your personal data.</li>
              <li>The right to object to the processing of your data.</li>
              <li>The right to request the transfer of your data.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">5. Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell or rent your personal information to third parties.
              We may share your information with:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>
                Trusted service providers to assist us in operating our
                services.
              </li>
              <li>
                Legal authorities if required by law or to protect our rights.
              </li>
              <li>Other parties in accordance with your consent.</li>
            </ul>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">6. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to monitor
              activity on our services and store certain information. You can
              instruct your browser to refuse all cookies or to indicate when a
              cookie is being sent.
            </p>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">7. Data Security</h2>
            <p className="mb-4">
              The security of your data is important to us, but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your personal information, we cannot
              guarantee its absolute security.
            </p>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">8. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              You are advised to review this Privacy Policy periodically for any
              changes.
            </p>

            <h2 className="text-lg sm:text-xl font-semibold mb-2">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact
              us:
            </p>
            <ul className="list-disc pl-5 mb-4">
              <li>By email: example@email.com</li>
              <li>By visiting this page on our website: example.com</li>
            </ul>

            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-red-600 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nodownload;
