import { createContext, useState, useContext } from "react";

const IdCounterContext = createContext();

function createCounter(start = 0) {
  let count = start;
  return () => count++;
}

export const IdCounterProvider = ({ children }) => {
  const counter = createCounter(10000);
  const value = {
    counter,
  };
  return (
    <IdCounterContext.Provider value={value}>
      {children}
    </IdCounterContext.Provider>
  );
};
export const useCounter = () => useContext(IdCounterContext);
