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
