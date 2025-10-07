import { useState, useCallback } from 'react';

/**
 * Custom hook for form validation with error handling
 */
export const useFormValidation = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation rules
  const rules = {
    required: (value) => value ? null : 'This field is required',
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? null : 'Please enter a valid email address';
    },
    minLength: (min) => (value) => 
      value && value.length >= min ? null : `Must be at least ${min} characters`,
    maxLength: (max) => (value) => 
      value && value.length <= max ? null : `Must be no more than ${max} characters`,
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return null;
    },
    confirmPassword: (password) => (value) => 
      value === password ? null : 'Passwords do not match',
    ...validationRules,
  };

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const rule = rules[name];
    if (!rule) return null;

    if (typeof rule === 'function') {
      return rule(value);
    }

    if (typeof rule === 'object') {
      for (const [ruleName, ruleValue] of Object.entries(rule)) {
        const validator = rules[ruleName];
        if (validator) {
          const error = validator(ruleValue)(value);
          if (error) return error;
        }
      }
    }

    return null;
  }, [rules]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(values).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField]);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  }, [errors]);

  // Handle field blur
  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validate field on blur
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, [validateField]);

  // Set field value programmatically
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Set field error programmatically
  const setError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0 || Object.values(errors).every(error => !error);

  return {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleBlur,
    setValue,
    setError,
    validateForm,
    resetForm,
  };
};
