import { createContext, useState, useContext } from "react";

const UiStateContext = createContext();
/**
 * @property {Map<number, number>} currentPositions - A map of user IDs to their current positions.
 * @property {Function} setCurrentPositions - Function to update the current positions of users.
 * @property {Object} isVisible - The visibility state of an element.
 * @property {boolean} isVisible.visibility - A flag indicating whether the element is visible.
 * @property {number | null} isVisible.id - The ID of the element if it is visible, or `null` if not.
 * @property {{ x: number, y: number }} isVisible.position - The position of the visible element in 2D space.
 */
export const UiStateProvider = ({ children }) => {
  const [currentPositions, setCurrentPositions] = useState(new Map());
  const [isVisible, setIsVisible] = useState({
    // for context menu
    visibility: false,
    id: null,
    position: { x: 0, y: 0 }, // { x: number, y: number }
  });
  const value = {
    currentPositions,
    setCurrentPositions,

    isVisible,
    setIsVisible,
  };
  return (
    <UiStateContext.Provider value={value}>{children}</UiStateContext.Provider>
  );
};
export const useUiState = () => useContext(UiStateContext);
