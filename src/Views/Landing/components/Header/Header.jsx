import { useState } from "react";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container } from "@components/common";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = () => {
    navigate("/dashboard/videos");
  };

  const handleResourcesMouseEnter = () => {
    setResourcesDropdownOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    setResourcesDropdownOpen(false);
  };
  const handleResourcesOnClick = () => {
    setResourcesDropdownOpen(!resourcesDropdownOpen);
  };

  const resourcesDropdownItems = [
    { to: "/newdashboard/home", label: "Community" },
    { to: "/blogs", label: "Blog" },
    { to: "/story", label: "Story" },
    { to: "/faqs", label: "FAQs" },
    { to: "/dashboard/WelcomePopup", label: "User Guide" },
    { to: "/contact", label: "Contact Us", className: "hover:bg-[#FFF8D999]" },
  ];

  return (
    <nav className="text-black font-helvetica bg-white w-full fixed top-0 z-50 ">
      <Container>
        <div className="flex justify-between gap-20 pt-4 ">
          <Link to="/">
            <img
              src="/logopic.png"
              alt="Logo"
              className="h-[64px] w-[160px] object-contain rounded-md"
            />
          </Link>
          <ul className="hidden lg:flex space-x-8 font-semibold mt-4 text-heading font-pally text-[24px] ">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/approach", label: "Approach" },
              { to: "/pricing-page", label: "Pricing" },
              // { to: "/story", label: "Story" },
              // { to: "/newdashboard/home", label: "Community" },
              // { to: "/faqs", label: "FAQ’s" },
            ].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`text-2xl font-bold ${
                    location.pathname === item.to
                      ? "text-[#EA580C] underline underline-offset-8"
                      : ""
                  } hover:text-[#EA580C] hover:underline transition-colors underline-offset-8`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              onMouseEnter={handleResourcesMouseEnter}
              onMouseLeave={handleResourcesMouseLeave}
              className="relative"
            >
              <span className="flex text-2xl font-bold hover:text-[#EA580C] cursor-pointer">
                Resources <IoIosArrowDown className="mt-1" />
              </span>
              {resourcesDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white  rounded-xl shadow-lg p-2">
                  {resourcesDropdownItems.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`block px-4 py-2 text-lg hover:text-[#FF7300] hover:bg-[#FFF8D999] ${
                          item.className || ""
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <button
            onClick={handleNavigate}
            className="bg-dashboardPrimary text-white text-lg font-[500] px-3 py-0 rounded-full text-btntextsize hover:bg-hoverbtn transition hidden lg:block"
          >
            Start Watching Now
          </button>

          <button
            onClick={toggleMenu}
            className="lg:hidden mt-2 absolute top-4 right-4 z-30 text-black focus:outline-none"
          >
            {isOpen ? (
              <IoMdClose className="text-4xl fixed top-6 right-4" />
            ) : (
              <RxHamburgerMenu className="text-4xl" />
            )}
          </button>
        </div>

        <div
          className={`lg:hidden transform transition-all duration-300 ease-in-out fixed bg-white top-0 left-0 h-64 w-full z-20 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="flex flex-col items-center xl:items-center mt-10 gap-4 font-pally bg-white p-4 text-blue-500">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/approach", label: "Approach" },
              { to: "/pricing-page", label: "Pricing" },
              // { to: "/story", label: "Story" },
              // { to: "/newdashboard/home", label: "Community" },
              // { to: "/faqs", label: "FAQ’s" },
            ].map((item) => (
              <li key={item.to} onClick={handleResourcesOnClick}>
                <Link
                  to={item.to}
                  onClick={toggleMenu}
                  className={`text-lg ${
                    location.pathname === item.to
                      ? "text-orange-400 underline underline-offset-8"
                      : ""
                  } hover:text-orange-400 hover:underline transition-colors`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              onMouseEnter={handleResourcesMouseEnter}
              // onMouseLeave={handleResourcesMouseLeave}
              onClick={handleResourcesOnClick}
              onBlur={handleResourcesMouseLeave}
              className="relative"
            >
              <span className="flex text-lg hover:text-orange-400 cursor-pointer">
                Resources <IoIosArrowDown className="mt-1" />
              </span>
              {resourcesDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white  rounded-xl shadow-lg p-2">
                  {resourcesDropdownItems.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`block px-4 py-2 text-lg hover:text-[#FF7300] hover:bg-[#FFF8D999] ${
                          item.className || ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={handleNavigate}
                className="bg-dashboardPrimary font-HelveticaNeue text-white px-4 py-2 text-xl font-[500] text-btntextsize rounded-full hover:bg-orange-600 transition"
              >
                Start Watching Now
              </button>
            </li>
          </ul>
        </div>
      </Container>
      <hr className="text-[gray] mt-5"></hr>
    </nav>
  );
};

export default Header;
