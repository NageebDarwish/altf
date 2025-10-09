import FeaturedPost from "./FeaturedPost";
import Container from "../../../components/common/Container";

const BlogsLanding = () => {
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
