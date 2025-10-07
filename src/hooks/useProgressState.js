import { useState, useEffect } from 'react';

/**
 * Custom hook to manage progress-related state
 * Consolidates multiple useState declarations for progress tracking
 */
export const useProgressState = () => {
  // Calendar and date state
  const [calendarState, setCalendarState] = useState({
    selectedDate: new Date(),
  });

  // User and badge state
  const [userState, setUserState] = useState({
    userDetails: '',
    latestBadge: null,
    goalDetails: '',
    levelDetails: [],
    streaks: [],
    allGoals: [],
    outsideData: null,
    watchedVideos: '',
    selectedLevel: null,
    goalData: '',
    dataTime: null,
    latestBadgeModal: null,
    badgeModals: [],
    outsideHours: '0',
    tempOutsideHours: '0',
  });

  // UI state
  const [uiState, setUiState] = useState({
    openDialog: false,
    showBadgePopup: false,
    editModalOpen: false,
  });

  // Computed values
  const userBadges = userState.userDetails?.badges || [];

  // State setters
  const updateCalendarState = (updates) => {
    setCalendarState(prev => ({ ...prev, ...updates }));
  };

  const updateUserState = (updates) => {
    setUserState(prev => ({ ...prev, ...updates }));
  };

  const updateUiState = (updates) => {
    setUiState(prev => ({ ...prev, ...updates }));
  };

  // Specific setters for common operations
  const setSelectedDate = (date) => updateCalendarState({ selectedDate: date });
  const setUserDetails = (details) => updateUserState({ userDetails: details });
  const setLatestBadge = (badge) => updateUserState({ latestBadge: badge });
  const setGoalDetails = (details) => updateUserState({ goalDetails: details });
  const setLevelDetails = (details) => updateUserState({ levelDetails: details });
  const setStreaks = (streaks) => updateUserState({ streaks });
  const setAllGoals = (goals) => updateUserState({ allGoals: goals });
  const setOutsideData = (data) => updateUserState({ outsideData: data });
  const setWatchedVideos = (videos) => updateUserState({ watchedVideos: videos });
  const setSelectedLevel = (level) => updateUserState({ selectedLevel: level });
  const setGoalData = (data) => updateUserState({ goalData: data });
  const setDataTime = (time) => updateUserState({ dataTime: time });
  const setLatestBadgeModal = (modal) => updateUserState({ latestBadgeModal: modal });
  const setBadgeModals = (modals) => updateUserState({ badgeModals: modals });
  const setOutsideHours = (hours) => updateUserState({ outsideHours: hours });
  const setTempOutsideHours = (hours) => updateUserState({ tempOutsideHours: hours });
  
  const setOpenDialog = (open) => updateUiState({ openDialog: open });
  const setShowBadgePopup = (show) => updateUiState({ showBadgePopup: show });
  const setEditModalOpen = (open) => updateUiState({ editModalOpen: open });

  return {
    // State objects
    calendarState,
    userState,
    uiState,
    
    // Computed values
    userBadges,
    
    // State setters
    updateCalendarState,
    updateUserState,
    updateUiState,
    
    // Specific setters
    setSelectedDate,
    setUserDetails,
    setLatestBadge,
    setGoalDetails,
    setLevelDetails,
    setStreaks,
    setAllGoals,
    setOutsideData,
    setWatchedVideos,
    setSelectedLevel,
    setGoalData,
    setDataTime,
    setLatestBadgeModal,
    setBadgeModals,
    setOutsideHours,
    setTempOutsideHours,
    setOpenDialog,
    setShowBadgePopup,
    setEditModalOpen,
  };
};
