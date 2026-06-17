/**
 * src/utils/analytics.js
 * Safe wrapper for Umami analytics tracking.
 */
export const trackEvent = (eventName, eventData = {}) => {
  try {
    if (typeof window !== 'undefined' && window.umami && typeof window.umami.track === 'function') {
      window.umami.track(eventName, eventData);
    }
  } catch (error) {
    // Fail silently - user likely has an ad-blocker
  }
};