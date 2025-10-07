import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to manage profile-related state
 * Consolidates multiple useState declarations into organized state objects
 */
export const useProfileState = () => {
  // Profile editing state
  const [profileState, setProfileState] = useState({
    editedName: '',
    isEditingProfile: false,
    selectedImage: null,
    imagePreview: null,
    profileLoading: false,
    profileError: '',
  });

  // Form data state
  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  // UI state
  const [uiState, setUiState] = useState({
    errors: {},
    message: '',
    isLoading: false,
  });

  // Refs
  const nameInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Focus on the input field when editing starts
  useEffect(() => {
    if (profileState.isEditingProfile && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [profileState.isEditingProfile]);

  // Profile state setters
  const updateProfileState = (updates) => {
    setProfileState(prev => ({ ...prev, ...updates }));
  };

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const updateUiState = (updates) => {
    setUiState(prev => ({ ...prev, ...updates }));
  };

  // Specific setters for common operations
  const setEditedName = (name) => updateProfileState({ editedName: name });
  const setIsEditingProfile = (editing) => updateProfileState({ isEditingProfile: editing });
  const setSelectedImage = (image) => updateProfileState({ selectedImage: image });
  const setImagePreview = (preview) => updateProfileState({ imagePreview: preview });
  const setProfileLoading = (loading) => updateProfileState({ profileLoading: loading });
  const setProfileError = (error) => updateProfileState({ profileError: error });
  
  const setErrors = (errors) => updateUiState({ errors });
  const setMessage = (message) => updateUiState({ message });
  const setIsLoading = (loading) => updateUiState({ isLoading: loading });

  return {
    // State
    profileState,
    formData,
    uiState,
    
    // Refs
    nameInputRef,
    fileInputRef,
    
    // Setters
    updateProfileState,
    updateFormData,
    updateUiState,
    setEditedName,
    setIsEditingProfile,
    setSelectedImage,
    setImagePreview,
    setProfileLoading,
    setProfileError,
    setErrors,
    setMessage,
    setIsLoading,
  };
};
