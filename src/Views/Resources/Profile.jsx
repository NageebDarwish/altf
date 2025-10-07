import { TextField, Button, CircularProgress } from "@mui/material";
import ProfilePremium from "./ProfilePremium";
import { useState, useRef, useEffect } from "react";
import ProfileFreeGrade from "./ProfileFreeGrade";
import BestPlan from "./BestPlan";
import { MdEdit, MdCameraAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUserProfile } from "../../store/reducers/action";
import { RxAvatar } from "react-icons/rx";

const Profile = () => {
  const [editedName, setEditedName] = useState("");
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  // New state for profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const nameInputRef = useRef(null); // Ref for the TextField

  // Image editing states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Focus on the input field when editing starts
  useEffect(() => {
    if (isEditingProfile && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isEditingProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.old_password) {
      newErrors.old_password = "Old password is required";
    }

    if (!formData.new_password) {
      newErrors.new_password = "New password is required";
    } else if (formData.new_password.length < 8) {
      newErrors.new_password = "Password must be at least 8 characters";
    }

    if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://admin.arabicallthetime.com/api/change/password",
        {
          old_password: formData.old_password,
          new_password: formData.new_password,
          new_password_confirmation: formData.new_password_confirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage("Password changed successfully!");
      setFormData({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setMessage(
            error.response.data.message || "Failed to change password"
          );
        }
      } else {
        setMessage("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const premium_plan = useSelector(
    (state) => state?.user?.user?.subscription?.plan
  );

  // Profile editing functions
  const handleEditProfileClick = () => {
    setEditedName(user.name);
    setIsEditingProfile(true);
    setProfileError("");
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setProfileError("Please select a valid image file");
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setProfileError("Image size should be less than 5MB");
        return;
      }

      // Set the selected image first
      setSelectedImage(file);
      setProfileError("");

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Now save the profile with the new image
      await handleSaveProfileWithImage(file);
    }
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleSaveProfileWithImage = async (imageFile) => {
    try {
      setProfileLoading(true);
      setProfileError("");

      const formData = new FormData();
      formData.append("name", user.name); // Use current user name
      formData.append("profile_image", imageFile);

      const response = await axios.post(
        "https://admin.arabicallthetime.com/api/edit/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        dispatch(
          updateUserProfile({
            name: user.name,
            profile_image:
              response.data.payload.profile_image || user.profile_image,
          })
        );

        setSelectedImage(null);
        setImagePreview(null);
        setMessage("Profile image updated successfully!");
      } else {
        setProfileError(
          response.data.message || "Failed to update profile image"
        );
      }
    } catch (err) {
      setProfileError(
        err.response?.data?.message || "An error occurred while updating image"
      );
      console.error("Image upload error:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!editedName?.trim()) {
      setProfileError("Name cannot be empty");
      return;
    }

    try {
      setProfileLoading(true);
      setProfileError("");

      const formData = new FormData();
      formData.append("name", editedName);

      if (selectedImage) {
        formData.append("profile_image", selectedImage);
      }

      const response = await axios.post(
        "https://admin.arabicallthetime.com/api/edit/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        dispatch(
          updateUserProfile({
            name: editedName,
            profile_image:
              response.data.payload.profile_image || user.profile_image,
          })
        );

        setIsEditingProfile(false);
        setSelectedImage(null);
        setImagePreview(null);
        setMessage("Profile updated successfully!");
      } else {
        setProfileError(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      setProfileError(err.response?.data?.message || "An error occurred");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditedName(user.name);
    setSelectedImage(null);
    setImagePreview(null);
    setProfileError("");
  };

  return (
    <div className="bg-white rounded-[17px] p-6 sm:p-10">
      <div className="flex flex-col md:flex-row items-center justify-between border-b pb-6 gap-6 md:gap-0">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-12 text-center sm:text-left">
          {/* Profile Image with Edit Functionality */}
          <div className="relative group" onClick={handleImageClick}>
            {imagePreview || user?.profile_image ? (
              <img
                src={imagePreview || user?.profile_image}
                alt="Profile"
                className={`h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-full object-cover transition-all duration-300 ${
                  isEditingProfile
                    ? "cursor-pointer group-hover:brightness-75"
                    : ""
                }`}
              />
            ) : (
              <RxAvatar
                className={`h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded-full  p-2 cursor-pointer `}
              />
            )}

            {/* Edit Icon Overlay - Only show when editing */}

            <div className="absolute bg-gray-500 p-1 rounded-full cursor-pointer bottom-0 right-0">
              <MdCameraAlt className="text-white text-xl" />
            </div>

            {/* Loading Spinner */}
            {profileLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <CircularProgress size={30} sx={{ color: "white" }} />
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="flex-1">
            <h1 className="flex gap-2 text-[#0C3373] text-xl sm:text-2xl md:text-[30px] font-bold">
              {isEditingProfile ? (
                <TextField
                  inputRef={nameInputRef}
                  value={editedName}
                  onChange={handleNameChange}
                  variant="standard"
                  error={!!profileError}
                  helperText={profileError}
                  sx={{
                    ".MuiInputBase-input": {
                      fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.875rem" },
                      fontWeight: "bold",
                      color: "#0C3373",
                      padding: "0",
                    },
                    ".MuiInput-underline:before": { borderBottom: "none" },
                    ".MuiInput-underline:after": {
                      borderBottom: "2px solid #F07E13",
                    },
                    ".MuiInput-underline:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                    width: { xs: "200px", md: "300px" },
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSaveProfile();
                    }
                  }}
                />
              ) : (
                <>
                  {user.name}
                  <MdEdit
                    className="text-btnbackground cursor-pointer"
                    onClick={handleEditProfileClick}
                  />
                </>
              )}
            </h1>

            <h1 className="flex gap-2 text-[#0C3373] text-sm sm:text-md font-bold">
              {user.email}
            </h1>

            {/* Action Buttons for Profile Edit */}
            {isEditingProfile && (
              <div className="flex gap-2 mt-3">
                <Button
                  variant="contained"
                  onClick={handleSaveProfile}
                  disabled={profileLoading}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#F07E13",
                    "&:hover": { backgroundColor: "#e06f00" },
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    boxShadow: "none",
                    padding: "6px 16px",
                  }}
                >
                  {profileLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Save Profile"
                  )}
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelEdit}
                  disabled={profileLoading}
                  sx={{
                    borderRadius: "10px",
                    borderColor: "#fad4b3",
                    color: "#F07E13",
                    backgroundColor: "#fad4b3",
                    "&:hover": {
                      borderColor: "#e06f00",
                      color: "#e06f00",
                      backgroundColor: "rgba(240, 126, 19, 0.04)",
                    },
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    boxShadow: "none",
                    padding: "6px 16px",
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
          <img
            src="/cloud, scurity.png"
            alt=""
            className="w-[140px] h-[130px] sm:w-[180px] sm:h-[165px]"
          />
        </div>
      </div>

      {/* Rest of your component remains the same */}
      <div className="flex items-center flex-col lg:flex-row justify-between pt-6">
        <div>
          <div className="flex flex-col gap-4">
            {message && (
              <div
                className={`p-3 rounded-md ${
                  message.includes("success")
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="password"
                  name="old_password"
                  placeholder="Old Password"
                  value={formData.old_password}
                  onChange={handleChange}
                  className="border border-gray-300 sm:w-96 bg-[#ECECEC] placeholder:text-black rounded-md py-2 px-3 w-full"
                />
                {errors.old_password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.old_password}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="new_password"
                  placeholder="New Password"
                  value={formData.new_password}
                  onChange={handleChange}
                  className="border border-gray-300 sm:w-96 bg-[#ECECEC] placeholder:text-black rounded-md py-2 px-3 w-full"
                />
                {errors.new_password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.new_password}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  name="new_password_confirmation"
                  placeholder="Confirm Password"
                  value={formData.new_password_confirmation}
                  onChange={handleChange}
                  className="border border-gray-300 sm:w-96 bg-[#ECECEC] placeholder:text-black rounded-md py-2 px-3 w-full"
                />
                {errors.new_password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.new_password_confirmation}
                  </p>
                )}
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-10 py-2 text-xl bg-btnbackground text-white rounded-full hover:bg-orange-600 transition disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr className="mt-10" />
      {premium_plan?.cycle === "unlimited" && <ProfileFreeGrade />}

      {premium_plan?.cycle === "monthly" && <ProfilePremium />}

      {premium_plan?.cycle === "yearly" && <BestPlan />}
    </div>
  );
};

export default Profile;
