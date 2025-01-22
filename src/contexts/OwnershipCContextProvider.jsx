import { createContext, useState, useContext } from "react";

const OwnershipContext = createContext();
/**
 * @property {string} owner - The current owner (could be a string like "Me").
 * @property {Function} setOwner - Function to update the owner.
 */
export const OwnershipProvider = ({ children }) => {
  const [owner, setOwner] = useState({
    USER: {
      name: "some",
    },
  });
  const value = {
    owner,
    setOwner,
  };
  return (
    <OwnershipContext.Provider value={value}>
      {children}
    </OwnershipContext.Provider>
  );
};
export const useOwner = () => useContext(OwnershipContext);
