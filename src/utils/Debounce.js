import { useCallback, useRef } from "react";

export const useDebounce = (func, wait) => {
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => func(...args), wait);
    },
    [func, wait],
  );
};
