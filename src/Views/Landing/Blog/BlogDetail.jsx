import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Changed from useLocation to useParams
import axios from "axios";
import BlogcardsCustom from "../../Resources/AllResources/BlogcardsCustom";
import { Skeleton } from "@mui/material";
import Container from "../../../components/common/Container";
import { Helmet } from "react-helmet-async";

const BlogDetail = () => {
  const { slug } = useParams(); // Get the slug from URL params
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://admin.arabicallthetime.com/api/get/blog/${slug}`
        );
        const filteredRelated = response.data.payload.related.filter(
          (blog) => blog.slug !== slug
        );
        setRelatedBlogs(filteredRelated);
        setDetail(response.data.payload.blog);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching blog details:", err);
      }
    };

    if (slug) {
      fetchBlogDetails();
    }
  }, [slug]);

  if (loading) {
    return (
      <Container className="py-8 md:py-12">
        <div className="flex flex-col items-center justify-center py-4">
          <Skeleton variant="text" width="60%" height={60} />
          <Skeleton variant="text" width="30%" height={24} />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <Skeleton variant="rectangular" width="100%" height={400} />
          <div className="flex flex-col gap-4 items-start justify-start py-4 w-full">
            <Skeleton variant="text" width="40%" height={40} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center py-10 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!detail) {
    return <div className="flex justify-center py-10">Blog not found</div>;
  }

  return (
    <>
      <Helmet>
        <title>{detail.title}</title>
        <meta name="description" content={detail.description || detail.meta_title} />
        
        {/* Open Graph meta tags for Facebook sharing */}
        <meta property="og:title" content={detail.title} />
        <meta property="og:description" content={detail.description || detail.meta_title} />
        <meta property="og:image" content={detail.cover_image} />
        <meta property="og:url" content={`${window.location.origin}/blogs/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Arabic All The Time" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={detail.title} />
        <meta name="twitter:description" content={detail.description || detail.meta_title} />
        <meta name="twitter:image" content={detail.cover_image} />
        
        {/* Additional meta tags */}
        <meta name="author" content={detail.author} />
        <meta property="article:author" content={detail.author} />
        <meta property="article:published_time" content={detail.created_at} />
      </Helmet>
      
      <Container className="py-8 md:py-12">
        <div className="flex flex-col items-center justify-center py-4">
          <h1 className="text-[32px] sm:text-[52px] text-center text-[#0C3373]">
            {detail.title}
          </h1>
          <h1 className="text-[16px] font-bold text-[#09BBE9]">
            {detail.author} •{" "}
            {new Date(detail.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 ">
          <img src={detail.cover_image} alt="" className="w-full" />
          <div className="flex flex-col gap-4 items-start justify-start py-4">
            <h1 className="text-[32px] font-pally text-btnbackground">
              {detail.meta_title}
            </h1>
            <div
              className="custom-html"
              dangerouslySetInnerHTML={{ __html: detail.content }}
            ></div>
          </div>
        </div>

        {/* Related Blogs Section */}
        <div className="py-2">
          <div className="flex justify-between">
            <h1 className="text-[32px] font-bold font-pally text-heading">
              Related posts
            </h1>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="60%" height={20} />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex justify-center py-10">
              <p className="text-red-500">
                Error loading related posts: {error}
              </p>
            </div>
          ) : relatedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {relatedBlogs.map((blog) => (
                <BlogcardsCustom key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-10">
              <p>No related posts found.</p>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default BlogDetail;
