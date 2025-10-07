import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogcardsCustom from "./AllResources/BlogcardsCustom";
import { useSelector } from 'react-redux';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token =useSelector((state)=>state.user.token)
    console.log(token,'jisjc')

    useEffect(() => {
        const fetchBlogs = async () => {
            try {

                if (!token) {
                    throw new Error('No authentication token found');
                }

                const response = await axios.get(
                    'https://admin.arabicallthetime.com/api/blogs',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                  console.log('API Response:', response);

                if (response.data.payload && Array.isArray(response.data.payload)) {
                    setBlogs(response.data.payload);
                } else {
                    throw new Error('Invalid data format from API');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading blogs...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="py-6">
            <h1 className="font-bold font-pally text-largeLight mb-6">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {blogs?.map((blog,index) => (
                    <BlogcardsCustom key={index} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;