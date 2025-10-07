import React from "react";

const Policy = ({ contentRef, handleScroll }) => {
  return (
    <div className="font-HelveticaNeue">
      <div
        ref={contentRef}
        onScroll={handleScroll}
        style={{ maxHeight: "100%", overflowY: "auto" }}
      >
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4 font-HelveticaNeue">
            Privacy Policy for Arabic All The Time
          </h1>
          <p className="mb-4">Effective Date: 22/10/2024</p>

          <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
          <p className="mb-4">
            Your privacy is crucial to us. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our services, including our API Client.
          </p>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            2. Information We Collect
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>
              Personal Information: Name, email address, and any other
              information you provide.
            </li>
            <li>
              Usage Data: Information about how you use our services, including
              your interaction with our API.
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
          <h2 className="text-xl font-semibold mb-2">
            3.YouTube Terms of Service
          </h2>
          <p className="mb-4">
            You should agree by the{" "}
            <a
              href="https://www.youtube.com/t/terms"
              target="_blank"
              className="text-blue-500 underline"
            >
              {" "}
              YouTube Terms of Service
            </a>
          </p>

          <h2 className="text-xl font-semibold mb-2">
            4.Google Privacy Policy
          </h2>
          <p className="mb-4">
            <a
              href="http://www.google.com/policies/privacy"
              target="_blank"
              className="text-blue-500 underline"
            >
              Google Privacy Policy
            </a>
          </p>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            5. How We Use Your Information
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>To provide and maintain our services.</li>
            <li>To notify you about changes to our services.</li>
            <li>
              To allow you to participate in interactive features when you
              choose to do so.
            </li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our services.
            </li>
            <li>To monitor the usage of our services.</li>
            <li>To detect, prevent, and address technical issues.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            6. Use of YouTube API Services{" "}
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            We would like to inform users that our API Client utilizes YouTube
            API Services. This means that certain functionalities of our
            application may interact with YouTube's services, and your usage may
            be subject to YouTube's privacy policies and terms of service. We
            encourage users to review these documents for more information on
            how their data is handled.
          </p>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            7.Collection and Use of User Information:
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            Our API Client may access, collect, and store various types of user
            information, including but not limited to:
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>
              Personal Information: Information you provide directly, such as
              your name, email address, and contact details.
            </li>
            <li>
              API Data: Data related to your interactions with our services,
              which may include usage statistics, preferences, and device
              information.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            8. Collection and Use of User Information:
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            Our API Client may access, collect, and store various types of user
            information, including but not limited to:
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>
              Personal Information: Information you provide directly, such as
              your name, email address, and contact details.
            </li>
            <li>
              API Data: Data related to your interactions with our services,
              which may include usage statistics, preferences, and device
              information.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            9. Sharing of Information:
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            User information may be shared in the following ways:
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>
              <strong>Internal Sharing</strong>: User information may be shared
              within our organization among employees who require access to
              perform their job functions.
            </li>
            <li>
              <strong>External Sharing</strong>: We may share user information
              with third-party service providers or partners who assist us in
              delivering our services, subject to appropriate confidentiality
              agreements. Additionally, we may share information if required by
              law or to protect the rights and safety of our users and the
              public.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            10. Storage and Access of Information on User Devices:
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            Our API Client may store, access, or collect information directly or
            indirectly from users’ devices. This includes, but is not limited
            to, the use of cookies and similar technologies to recognize and
            remember user preferences, enhance functionality, and analyze usage
            patterns.
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>
              <strong>Cookies</strong>: We may use cookies and similar tracking
              technologies to improve your experience on our services. Cookies
              are small files placed on your device that help us understand how
              you interact with our services.
            </li>
            <li>
              <strong>Third-Party Access</strong>: We may allow third parties to
              place cookies or similar technologies on your device for the
              purposes of analytics, advertising, and service improvement. These
              third parties may collect information about your online activities
              over time and across different websites.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">11. User Rights</h2>
          <p className="mb-4 font-HelveticaNeue">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>The right to access your personal information.</li>
            <li>The right to rectify any inaccurate information.</li>
            <li>The right to request deletion of your personal data.</li>
            <li>The right to object to the processing of your data.</li>
            <li>The right to request the transfer of your data.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            12. Sharing Your Information
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            We do not sell or rent your personal information to third parties.
            We may share your information with:
          </p>
          <ul className="list-disc pl-5 mb-4 font-HelveticaNeue">
            <li>
              Trusted service providers to assist us in operating our services.
            </li>
            <li>
              Legal authorities if required by law or to protect our rights.
            </li>
            <li>Other parties in accordance with your consent.</li>
          </ul>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            13. Cookies and Tracking Technologies
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            We use cookies and similar tracking technologies to monitor activity
            on our services and store certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">14. Data Security</h2>
          <p className="mb-4 font-HelveticaNeue">
            The security of your data is important to us, but remember that no
            method of transmission over the Internet or method of electronic
            storage is 100% secure. While we strive to use commercially
            acceptable means to protect your personal information, we cannot
            guarantee its absolute security.
          </p>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">
            15. Changes to This Privacy Policy
          </h2>
          <p className="mb-4 font-HelveticaNeue">
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            You are advised to review this Privacy Policy periodically for any
            changes.
          </p>

          <h2 className="text-xl font-semibold mb-2 font-HelveticaNeue">16. Contact Us</h2>
          <p className="font-HelveticaNeue">
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <p className="font-HelveticaNeue">
            Email:{" "}
            <a
              href="mailto:arabicallthetime@gmail.com"
              target="_blank"
              className="text-blue-500 underline"
            >
              {" "}
              {/* support@arabicallthetime.com */}
              arabicallthetime@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Policy;
