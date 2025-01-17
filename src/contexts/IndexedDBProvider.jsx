import { createContext, useEffect, useState, useContext } from "react";
import { AsyncDB } from "../utils/AsyncIndexedDB";

export const DbContext = createContext();

export const DbContextProvider = ({ children }) => {
  const [db, setDB] = useState(new AsyncDB("Messages"));

  const value = {
    db,
    setDB,
  };

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};
export const useDB = () => useContext(DbContext);
