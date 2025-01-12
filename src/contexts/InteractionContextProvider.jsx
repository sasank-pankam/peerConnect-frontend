import { useContext } from "react";
import { createContext, useState } from "react";

const InteractionContext = createContext();

/**

 * @property {Map<number, boolean>} isPinned - A map indicating whether each user is pinned.
 * @property {Function} setIsPinned - Function to update the pinned state of users.
 * @property {Set<number>} youBlocked - A set of user IDs that you have blocked.
 * @property {Function} setYouBlocked - Function to update the `youBlocked` set.
 * @property {Set<number>} blockedYou - A set of user IDs that have blocked you.
 * @property {Function} setBlockedYou - Function to update the `blockedYou` set.
  */

export const InteractionProvider = ({ children }) => {
  const [isPinned, setIsPinned] = useState(new Map());
  const [youBlocked, setYouBlocked] = useState(new Set());
  const [blockedYou, setBlockedYou] = useState(new Set());
  const value = {
    isPinned,
    setIsPinned,
    youBlocked,
    setYouBlocked,

    blockedYou,
    setBlockedYou,
  };
  return (
    <InteractionContext.Provider value={value}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => useContext(InteractionContext);
