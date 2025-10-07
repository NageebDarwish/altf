import { useSelector } from "react-redux";
import NewHeader from "./NewHeader"; 
import AuthenticatedHeader from "./AuthenticatedHeader"; 

const MainHeader = () => {
    const isAuthenticated =useSelector(state => state.user.isAuthenticated) 
  
  return <AuthenticatedHeader />
};

export default MainHeader;
