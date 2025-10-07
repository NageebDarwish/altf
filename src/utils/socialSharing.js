/**
 * Social Media Sharing Utility Functions
 * 
 * These functions provide a consistent way to share content across different social media platforms.
 */

/**
 * Share content on Twitter/X
 * @param {string} text - The text to share
 * @param {string} url - The URL to share
 */
export const shareOnTwitter = (text, url) => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, '_blank', 'width=600,height=400');
};

/**
 * Share content on Facebook
 * @param {string} url - The URL to share
 */
export const shareOnFacebook = (url) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, '_blank', 'width=600,height=400');
};

/**
 * Share content on LinkedIn
 * @param {string} url - The URL to share
 * @param {string} title - The title of the content
 * @param {string} summary - The summary/description of the content
 */
export const shareOnLinkedIn = (url, title = '', summary = '') => {
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
  window.open(linkedinUrl, '_blank', 'width=600,height=400');
};

/**
 * Share content on WhatsApp
 * @param {string} text - The text to share
 * @param {string} url - The URL to share
 */
export const shareOnWhatsApp = (text, url) => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  window.open(whatsappUrl, '_blank', 'width=600,height=400');
};

/**
 * Share content via Email
 * @param {string} subject - The email subject
 * @param {string} body - The email body
 */
export const shareViaEmail = (subject, body) => {
  const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = emailUrl;
};

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise<boolean>} - Whether the copy was successful
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      console.error('Fallback copy failed: ', fallbackErr);
      document.body.removeChild(textArea);
      return false;
    }
  }
};

/**
 * Share blog post with pre-configured text
 * @param {Object} blogPost - The blog post object
 * @param {string} platform - The platform to share on ('twitter', 'facebook', 'linkedin', 'whatsapp', 'email', 'copy')
 * @returns {Function} - The sharing function
 */
export const createBlogShareFunction = (blogPost, platform) => {
  const { id, title, description } = blogPost;
  const blogUrl = `${window.location.origin}/blogdetails/${id}`;
  const shareText = `Check out this interesting blog post: "${title}"`;

  switch (platform.toLowerCase()) {
    case 'twitter':
      return () => shareOnTwitter(shareText, blogUrl);
    
    case 'facebook':
      return () => shareOnFacebook(blogUrl);
    
    case 'linkedin':
      return () => shareOnLinkedIn(blogUrl, title, description);
    
    case 'whatsapp':
      return () => shareOnWhatsApp(shareText, blogUrl);
    
    case 'email':
      return () => shareViaEmail(`Blog Post: ${title}`, `${shareText}\n\nRead more: ${blogUrl}`);
    
    case 'copy':
      return () => copyToClipboard(blogUrl);
    
    case 'instagram':
      // Instagram doesn't support direct URL sharing, so we'll copy the link
      return () => copyToClipboard(blogUrl);
    
    default:
      return () => console.warn(`Unknown platform: ${platform}`);
  }
};

/**
 * Get all available sharing options for a blog post
 * @param {Object} blogPost - The blog post object
 * @returns {Object} - Object containing all sharing functions
 */
export const getBlogSharingOptions = (blogPost) => {
  return {
    twitter: createBlogShareFunction(blogPost, 'twitter'),
    facebook: createBlogShareFunction(blogPost, 'facebook'),
    linkedin: createBlogShareFunction(blogPost, 'linkedin'),
    whatsapp: createBlogShareFunction(blogPost, 'whatsapp'),
    email: createBlogShareFunction(blogPost, 'email'),
    instagram: createBlogShareFunction(blogPost, 'instagram'),
    copy: createBlogShareFunction(blogPost, 'copy'),
  };
};
