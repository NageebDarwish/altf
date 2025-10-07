import {  useLocation, useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";
import Landing from "./Views/Landing/Landing";
import RootLayout from "./layout/RootLayout/RootLayout";
import WatchVideos from "./Views/WatchVideos/WatchVideos";
import WatchSeries from "./Views/WatchSeries/WatchSeries";
import WatchLibrary from "./Views/WatchLibrary/WatchLibrary";
import Library from "./Views/Library/Library";
import Settings from "./Views/Settings/Settings";
import Bignner from "./Views/WatchVideos/Bignner";
import NoVideo from "./Views/WatchLibrary/NoVideo";
import VideoList from "./Views/WatchLibrary/VideoList";
import MySeriesList from "./Views/WatchLibrary/MySeriesList";
import WatchSeriesTwo from "./Views/WatchSeriesTwo/WatchSeries";
import WatchSeriesSecondScreen from "./Views/WatchSeriesSecondScreen";
import WatchHistory from "./Views/WatchLibrary/WatchHistory";
import Notification from "./layout/RootLayout/components/Notification";
import AboutUs from "./Views/Resources/AboutUs";
import TeachingMethod from "./Views/Resources/TeachingMethod";
import PremiumMembership from "./Views/Auth/PremiumMembership";
import SignIn from "./Views/Auth/SignIn";
import OtpAuthentications from "./Views/Auth/OtpAuthenticaions";
import VerifyEmail from "./Views/Auth/VerifyEmail";
import AuthticationSuccess from "./Views/Auth/AuthticationSuccess";
import Signup from "./Views/Auth/Signup";
import VedioPlateform from "./Views/Resources/VedioPlateform";
import PreSubscriptions from "./Views/Resources/PreSubscriptions";
import Price from "./Views/Payment/Price";
import Nodownload from "./layout/RootLayout/components/Nodownload";
import WelcomePopup from "./components/WellcomPopup/WelcomePopup";
import GuidePopup from "./components/WellcomPopup/GuidePopup.jsx";
import UnauthenticatedMessage from "./components/unauthenticatedMessage/AnauthenticatedMessage";
import Primuim from "./components/Primuim/Primuim";
import Testing from "./components/Testing";
import Watch from "./Views/WatchVideos/Watch";
import LandingLayout from "./layout/LandingLayout";
import AboutUS from "./Views/Landing/about";
import Story from "./Views/Landing/Story";
import ContactUs from "./Views/Landing/ContactUs";
import SearchResults from "./Views/SearchResults/SearchResults";
import Approach from "./Views/Landing/Approach";
import Faqs from "./Views/Landing/faqs";
import Progress2 from "./Views/progress2/Progress2";

import AllResources from "./Views/Resources/AllResources/AllResources";

import WatchingList from "./Views/WatchVideos/WatchingList";
import LanguageLayout from "./layout/LanguageLayout/LanguageLayout";
import CreatePost from "./Views/NewDashobardLayout/CreatePost/CreatePost.jsx";
import Popular from "./Views/NewDashobardLayout/Popular";
import LandingLearning from "./Views/NewDashobardLayout/LanguageLearning/index.jsx";
import MyQuestions from "./Views/NewDashobardLayout/MyQuestions/index.jsx";
import AnswerPost from "./Views/NewDashobardLayout/MyAnswer/index.jsx";
import Saved from "./Views/NewDashobardLayout/SavedPost/index.jsx";
import Home from "./Views/NewDashobardLayout/Home/index.jsx";
import Comments from "./Views/NewDashobardLayout/Comment/index.jsx";
import StartLarning2 from "./components/StartLearning2.jsx";
import Policy from "./Views/Auth/Policy.jsx";
import BlogDetail from "./Views/Landing/Blog/BlogDetail.jsx";
import Profile from "./Views/Resources/Profile.jsx";
import BlogsLanding from "./Views/Landing/Blog/BlogsLanding.jsx";

import PricingPlans from "./Views/Landing/components/Content/InputSection.jsx";
import TermsAndConditions from "./Views/TermsAndConditions/index.jsx";

export default function Router() {
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const isWelcomePopupShown = localStorage.getItem("welcomePopupShown");

    if (location.pathname === "/dashboard/videos" && !isWelcomePopupShown) {
      setShowWelcomePopup(true);
      localStorage.setItem("welcomePopupShown", "true");
    }
  }, [location.pathname]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Stripe fully removed from frontend. Checkout is now backend-only redirect.
  let element = useRoutes([
    { path: "/subscriptions", element: <PremiumMembership /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <Signup /> },
    { path: "/price", element: <Price /> },
    { path: "/otp-authentication", element: <OtpAuthentications /> },

    {
      path: "/newdashboard",
      element: <LanguageLayout />,
      children: [
        {
          index: true,
          element: <LandingLearning />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "comment",
          element: <Comments />,
        },
        {
          path: "languagelearning/:topic",
          element: <LandingLearning />,
        },
        {
          path: "questions",
          element: <MyQuestions />,
        },
        {
          path: "answers",
          element: <AnswerPost />,
        },
        {
          path: "saved",
          element: <Saved />,
        },
        {
          path: "Popular",
          element: <Popular />,
        },
        {
          path: "createpost",
          element: <CreatePost />,
        },
      ],
    },
    { path: "/pricing-page", element: <PricingPlans /> },
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        { path: "about", element: <AboutUS /> },
        { path: "privacy-policy", element: <Policy /> },
        { path: "terms-and-conditions", element: <TermsAndConditions /> },
        { path: "story", element: <Story /> },
        { path: "contact", element: <ContactUs /> },
        { path: "approach", element: <Approach /> },
        { path: "blogs", element: <BlogsLanding /> },
        { path: "blogs/:slug", element: <BlogDetail /> },
        { path: "faqs", element: <Faqs /> },

        // { path: "/strip-paymenets", element: <StripPaymenets /> },

        // Stripe pages removed; using backend Checkout redirect instead
        { path: "strip-paymenets", element: <div /> },
        { path: "free-membership-plan", element: <StartLarning2 /> },

        // { path: "free-membership-plan", element: <StartLarning2 /> },

        { path: "primium-membership-plan", element: <StartLarning2 /> },
      ],
    },

    {
      path: "/dashboard",
      element: <RootLayout />,
      children: [
        { path: "videos", element: <WatchVideos /> },
        { path: "search-results", element: <SearchResults /> },
        { path: "series", element: <WatchSeries /> },
        { path: "resources", element: <AllResources /> },
        { path: "blog", element: <BlogsLanding /> },
        { path: "profile", element: <Profile /> },
        { path: "no-vedio", element: <NoVideo /> },
        { path: "vedio-list", element: <VideoList /> },
        { path: "series-list", element: <MySeriesList /> },
        { path: "watch-series-two", element: <WatchSeriesTwo /> },
        { path: "watch-history", element: <WatchHistory /> },
        { path: "notifications", element: <Notification /> },
        { path: "about-us", element: <AboutUs /> },
        { path: "testing", element: <Testing /> },
        { path: "watch/:id", element: <Watch /> },
        { path: "watching-list/:id", element: <WatchingList /> },
        { path: "welcomepopup", element: <GuidePopup /> },
        {
          path: "series-phase-two",
          element: <WatchSeriesSecondScreen />,
        },
        { path: "faq", element: <Faqs /> },
        { path: "our-method", element: <TeachingMethod /> },
        { path: "resources/vedio-plateform", element: <VedioPlateform /> },
        { path: "resources/subscriptions", element: <PreSubscriptions /> },
        { path: "library", element: <WatchLibrary /> },
        { path: "library", element: <Library /> },
        { path: "progress", element: <Progress2 /> },
        { path: "bignners", element: <Bignner /> },
        { path: "settings", element: <Settings /> },
        { path: "Nodownload", element: <Nodownload /> },
        { path: "un-authentic", element: <UnauthenticatedMessage /> },
        { path: "primum", element: <Primuim /> },
      ],
    },
    { path: "verify-email", element: <VerifyEmail /> },
    { path: "auth-success", element: <AuthticationSuccess /> },
  ]);

  return (
    <>
      {showWelcomePopup && <WelcomePopup />}
      {element}
    </>
  );
}
