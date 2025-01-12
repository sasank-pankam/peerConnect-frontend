import { createContext, useState, useContext } from "react";

const MetaDataContext = createContext();
/**
 * @property {Object.<number, number>} counts - A mapping of user IDs to their counts (e.g., message count or actions count).
 * @property {Function} setCounts - Function to update the counts.
 * @property {Object.<number, number>} latestTimeStampOfUserMessages - A mapping of user IDs to the latest timestamp of their messages.
 * @property {Function} setLatestTimeStampOfUserMessages - Function to update the latest timestamp of user messages.
 */
export const MetaDataProvider = ({ children }) => {
  const [latestTimeStampOfUserMessages, setLatestTimeStampOfUserMessages] =
    useState({});

  const [counts, setCounts] = useState();
  const value = {
    counts,
    setCounts,
    latestTimeStampOfUserMessages,
    setLatestTimeStampOfUserMessages,
  };
  return (
    <MetaDataContext.Provider value={value}>
      {children}
    </MetaDataContext.Provider>
  );
};
export const useMetaData = () => useContext(MetaDataContext);
