import React, { useEffect, useState } from "react";
import PostCustom from "./PostCustom";
import DropdownBlog from "../../../components/DropDown/DropdownBlog";
import axios from "axios";
import { useSelector } from "react-redux";

const AllPost = ({ visiblePosts, allPosts, showAll, handleLoadMore }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://admin.arabicallthetime.com/api/blog/categories",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (res.data && Array.isArray(res.data.payload)) {
          // Store both name and id for each category
          const categoryData = res.data.payload.map((category) => ({
            name: category.name,
            id: category.id,
          }));
          setCategories(categoryData);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = async (option) => {
    const isSelected = selectedCategories.some((cat) => cat.id === option.id);
    let newSelectedCategories;

    if (isSelected) {
      newSelectedCategories = selectedCategories.filter(
        (cat) => cat.id !== option.id
      );
    } else {
      newSelectedCategories = [...selectedCategories, option];
    }

    setSelectedCategories(newSelectedCategories);

    if (newSelectedCategories.length === 0) {
      setIsFiltering(false);
      return;
    }

    try {
      setIsFiltering(true);

      const categoryIds = newSelectedCategories.map((cat) => cat.id);

      // Create FormData and append each id as ids[0], ids[1], etc.
      const formData = new FormData();
      categoryIds.forEach((id, index) => {
        formData.append(`ids[${index}]`, id);
      });


      const res = await axios.post(
        "https://admin.arabicallthetime.com/api/get/category/blogs",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data && Array.isArray(res.data.payload)) {
        setFilteredPosts(res.data.payload);
      }
    } catch (error) {
      console.error("Error fetching filtered posts:", error);
      setIsFiltering(false);
    }
  };

  // Determine which posts to display
  const postsToDisplay = isFiltering ? filteredPosts : visiblePosts;

  return (
    <div className="py-8 md:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold font-pally text-heading">
          All Blogs
        </h1>
        <DropdownBlog
          buttonText="Filters"
          options={categories}
          onSelect={handleSelect}
          heading="Filter by:"
          selectedOptions={selectedCategories}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {postsToDisplay.map((post) => (
          <PostCustom key={post.id} {...post} />
        ))}
      </div>
      {!showAll && allPosts.length > 3 && !isFiltering && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="border-btnbackground border hover:bg-btnbackground text-btnbackground hover:text-white rounded-full py-3 px-6 text-lg sm:text-xl font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPost;
