
export const isUserLiked = (likes, userId) => {
  if (!Array.isArray(likes) || !userId) return false;
  return likes.some(like => String(like?.user_id) === String(userId));
};


export const isUserDisliked = (dislikes, userId) => {
  if (!Array.isArray(dislikes) || !userId) return false;
  return dislikes.some(dislike => String(dislike?.user_id) === String(userId));
};


export const getLikeCount = (likes) => {
  return Array.isArray(likes) ? likes.length : (likes || 0);
};

export const getDislikeCount = (dislikes) => {
  return Array.isArray(dislikes) ? dislikes.length : (dislikes || 0);
};


export const getLikeButtonClasses = (isLiked, isLoading) => {
  let classes = "text-xl font-HelveticaNeue cursor-pointer transition-colors duration-200 ";
  
  if (isLiked) {
    classes += "text-blue-600 hover:text-blue-700";
  } else {
    classes += "hover:text-blue-500";
  }
  
  if (isLoading) {
    classes += " opacity-50 cursor-not-allowed";
  }
  
  return classes;
};

export const getDislikeButtonClasses = (isDisliked, isLoading) => {
  let classes = "text-xl cursor-pointer transition-colors duration-200 ";
  
  if (isDisliked) {
    classes += "text-red-600 hover:text-red-700";
  } else {
    classes += "hover:text-red-500";
  }
  
  if (isLoading) {
    classes += " opacity-50 cursor-not-allowed";
  }
  
  return classes;
};

export const getCountTextClasses = (isActive, type = 'like') => {
  if (isActive) {
    return type === 'like' ? "text-blue-600 font-semibold" : "text-red-600 font-semibold";
  }
  return "";
};