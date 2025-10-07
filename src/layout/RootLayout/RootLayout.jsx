import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "./components/NavBar";
import MainHeader from "./components/Header/MainHeader";
import { LuArrowUpToLine } from "react-icons/lu";
import { MenuProvider } from "../../contexts/MenuContext";

const RootLayout = () => {
  const [open, setOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const scrollContainerRef = useRef(null);
  const location = useLocation();
  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current && scrollContainerRef.current.scrollTop > 0) {
        setShowScroll(true);
      } else {
        setShowScroll(true);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);
  return (
    <MenuProvider>
      <div className="flex h-screen overflow-hidden overflow-x-hidden">
        {/* Sidebar - fixed position */}
        <div
          className={`fixed bottom-0 w-full md:inset-y-0 left-0 md:w-[258px] z-50 bg-white transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          } translate-x-0`}
        >
          <Navbar />
        </div>

        {/* Main content area */}
        <div className=" flex flex-col md:ml-[280px]">
          <div>
            <MainHeader open={open} toggleOpen={toggleOpen} />
          </div>

          {/* Scrollable content area */}
        </div>
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto overflow-x-hidden pt-[20px] md:pt-[95px] md:px-[20px] bg-[#F3F6FB] mt-20 md:mt-0"
          id="scroll-container"
        >
          <Outlet />
        </div>

        {showScroll && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 z-50 md:bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition-all duration-300"
          >
            <LuArrowUpToLine size={20} />
          </button>
        )}
      </div>
    </MenuProvider>
  );
};

export default RootLayout;

{
  /* <Header />



<Landing />

 <Footer /> */
}
