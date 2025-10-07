import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import { MdDelete, MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { BsImage } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import TagModal from "./TagModal";
import { LuPencil } from "react-icons/lu";
import { request } from "../../../services/axios"; // Adjust path as needed
import ToastComp from "../../../components/toast/ToastComp";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreatePost = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  // Function to format tag names - remove underscores and capitalize
  const formatTagName = (name) => {
    return name
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // Remove selected tag
  const removeTag = (tagId) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  // Handle form submission
  const handlePublish = async () => {
    // Validation
    if (!subject.trim()) {
      enqueueSnackbar("Subject is required", { variant: "error" });
      return;
    }
    if (!content.trim()) {
      enqueueSnackbar("Content is required", { variant: "error" });
      return;
    }

    if (selectedTags.length === 0) {
      enqueueSnackbar("At least one tag is required", {
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
      return;
    }
    try {
      setLoading(true);

      // Create FormData
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("body", content);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      // Add tags array to FormData
      selectedTags.forEach((tagId) => {
        formData.append("tags[]", tagId);
      });

      const response = await request({
        method: "post",
        url: "api/post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSubject("");
      setContent("");
      setSelectedFile(null);
      setSelectedTags([]);
     enqueueSnackbar("Post published successfully!", { 
        variant: "success",
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
      navigate('/newdashboard/home')
    } catch (error) {
      console.error("Error creating post:", error);
      enqueueSnackbar("Error publishing post. Please try again.", { 
        variant: "error",
        autoHideDuration: 4000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle delete/reset
  const handleDelete = () => {
    setSubject("");
    setContent("");
    setSelectedFile(null);
    setSelectedTags([]);
  };

  return (
    <>
      <h2 className="text-[32px] font-pally text-heading font-bold mb-3 flex gap-2">
        <LuPencil className="mt-1" /> Create post
      </h2>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded-full font-HelveticaNeue text-[#1E293B] border-gray-300 mb-4 px-4 placeholder:p-4 placeholder:text-gray-600 placeholder:font-HelveticaNeue placeholder:font-semibold outline-none shadow-md pr-10"
        />
        <LuPencil className="absolute right-4 top-5 text-xl transform -translate-y-1/2 text-gray-500" />
      </div>

      <div className="mx-auto border-2 p-5 bg-white shadow-md rounded-lg">
        <div className="flex flex-wrap gap-3 mb-4">
          <label className="flex items-center font-plusJakarta gap-2 px-4 py-2 bg-[#f8fafc] border text-gray-600 font-semibold rounded-full cursor-pointer">
            <BsImage className="text-lg" />
            {selectedFile ? selectedFile.name : "Add Media"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            className="flex gap-2 px-4 py-2 text-sm font-plusJakarta md:text-lg bg-[#f8fafc] border text-gray-600 font-semibold rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            Add Tags <MdKeyboardArrowDown className="mt-1" />
          </button>
        </div>

        {/* Selected Tags Display */}
        {selectedTags.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Selected Tags:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tagId) => {
                const tag = tags.find((t) => t.id === tagId);
                return tag ? (
                  <div
                    key={tagId}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    <span>{formatTagName(tag.name)}</span>
                    <button
                      onClick={() => removeTag(tagId)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <MdClose size={16} />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        {/* Selected File Display */}
        {selectedFile && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Selected File:</strong> {selectedFile.name}
            </p>
          </div>
        )}

        <ReactQuill value={content} onChange={setContent} className="mb-4" />
      </div>

      <div className="flex justify-start items-center mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <button
            className="flex gap-1 px-8 py-2 font-plusJakarta text-[18px] bg-btnbackground text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePublish}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mt-0.5"></div>
                Publishing...
              </>
            ) : (
              <>
                <IoIosSend className="mt-1" /> Publish
              </>
            )}
          </button>
          <button
            className="flex gap-1 font-plusJakarta px-8 py-2 text-[18px] border border-primary text-primary rounded-full"
            onClick={handleDelete}
            disabled={loading}
          >
            <MdDelete className="mt-1" /> Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TagModal
          heading={"Tag topics"}
          tags={tags}
          setTags={setTags}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default CreatePost;
