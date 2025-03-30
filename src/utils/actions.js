export const parseMessage = (message) => {
  const regex =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  return message.replace(regex, (match) => {
    return `<a href="https://${match}" target="_blank">${match}</a>`;
  });
};

export const getSelectedProfileWithAttribute = (profiles) => {
  const res = Object.entries(profiles)
    .map((profile) => {
      const [key, config] = profile;
      const hasSelected = config?.selected === true;
      return hasSelected ? key : false;
    })
    .find((param) => Boolean(param));
  return res;
};

export const debounce = (func, wait) => {
  let identifier;
  return function(...args) {
    clearTimeout(identifier);
    console.log("clearing timeout for ", func);
    identifier = setTimeout(() => func(...args), wait);
  };
};

export const addUsersWithoutDuplicates = (users, setUsers, setUserDetails) => {
  setUsers((prev) => {
    const usersSet = new Set(prev);
    const newUsersMap = new Map(users.map((user) => [user.peerId, user]));

    setUserDetails((prevDetails) => {
      const abc = Object.fromEntries(newUsersMap.entries());
      return {
        ...prevDetails,
        ...Object.fromEntries(newUsersMap.entries()),
      };
    });
    const arr = [...newUsersMap.keys()];
    return [
      ...prev,
      ...arr.filter((userId) => {
        const res = !usersSet.has(userId);
        usersSet.add(userId);
        return res;
      }),
    ];
  });
};
