// useRouter.js
import { useLocation } from "react-router-dom";

const useRouter = () => {
  const location = useLocation();
  return { location };
};

export default useRouter;
