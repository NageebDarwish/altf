import FeaturedPost from "./FeaturedPost";
import { useLocation } from "react-router-dom";
import Container from "../../../components/common/Container";

const BlogsLanding = () => {
  const location = useLocation();
  return (
    <div className="bg-white">
      <Container className="py-4">
        <FeaturedPost />
      </Container>
      {/* {location.pathname == "/blogs" && <Footer />} */}
    </div>
  );
};

export default BlogsLanding;
