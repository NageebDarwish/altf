import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollReset = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll both html and body to top
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
};

export default ScrollReset;
