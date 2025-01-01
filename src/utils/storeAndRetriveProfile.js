const key = "profile";

/**
 * @param {Object} profile
 */
export const setUser = (profile) => {
  localStorage.setItem(key, JSON.stringify(profile));
};

/**
 * @returns {Object}
 */
export const getUser = () => {
  return JSON.parse(localStorage.getItem(key));
};
