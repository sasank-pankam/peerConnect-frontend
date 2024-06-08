const key = "profile";

export const setUser = (profile) => {
  localStorage.setItem(key, JSON.stringify(profile));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem(key));
};
