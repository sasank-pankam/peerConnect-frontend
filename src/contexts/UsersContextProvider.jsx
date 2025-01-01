import { createContext, useEffect, useState, useContext } from "react";

export const UsersContext = createContext();

/**
 * @typedef {Object} UserContextValue
 * @property {Array<{ id: number }>} users - A list of users, each having an `id`.usercon
 * @property {Function} setUsers - Function to update the list of users.
 * @property {string | null} currentActiveUser - The ID of the currently active user or `null` if no user is active.
 * @property {Function} setCurrentActiveUser - Function to set the active user.
 * @property {Object.<number, Object>} userDetails - A mapping of user IDs to their details (name and possibly more).
 * @property {Function} setUserDetails - Function to update user details.
 * @property {Object.<number, number>} counts - A mapping of user IDs to their counts (e.g., message count or actions count).
 * @property {Function} setCounts - Function to update the counts.
 * @property {Map<number, boolean>} isPinned - A map indicating whether each user is pinned.
 * @property {Function} setIsPinned - Function to update the pinned state of users.
 * @property {string} owner - The current owner (could be a string like "Me").
 * @property {Function} setOwner - Function to update the owner.
 * @property {Object.<number, number>} latestTimeStampOfUserMessages - A mapping of user IDs to the latest timestamp of their messages.
 * @property {Function} setLatestTimeStampOfUserMessages - Function to update the latest timestamp of user messages.
 * @property {Map<number, number>} currentPositions - A map of user IDs to their current positions.
 * @property {Function} setCurrentPositions - Function to update the current positions of users.
 * @property {Object} isVisible - The visibility state of an element.
 * @property {boolean} isVisible.visibility - A flag indicating whether the element is visible.
 * @property {number | null} isVisible.id - The ID of the element if it is visible, or `null` if not.
 * @property {{ x: number, y: number }} isVisible.position - The position of the visible element in 2D space.
 * @property {Set<number>} youBlocked - A set of user IDs that you have blocked.
 * @property {Function} setYouBlocked - Function to update the `youBlocked` set.
 * @property {Set<number>} blockedYou - A set of user IDs that have blocked you.
 * @property {Function} setBlockedYou - Function to update the `blockedYou` set.
 * @property {Function} addUser - Function to add a new user by ID and content.
 * @property {Function} removeUser - Function to remove a user by ID.
 */

/**
 * Sets up a listener for the Escape key event.
 * @param {Function} escapeHandler - The callback function to call when the Escape key is pressed.
 */
const SetEscape = (escapeHandler) => {
  useEffect(() => {
    document.addEventListener("keydown", escapeHandler);
    return () => {
      document.removeEventListener("keydown", escapeHandler);
    };
  }, [escapeHandler]);
};

export const UsersProvider = ({ children }) => {
  const listOfusers = [];
  const userDedatils = {};
  const userCounts = {};
  const timeStamps = {};
  const positions = new Map();

  for (let i = 0; i < 90; i++) {
    listOfusers.push({
      peerId: i,
      name: `ali ${i}`,
      ip: `test ${i}`,
    });
    userDedatils[i] = {
      name: `user ${i}`,
      // anything to be added here for user details later
    };
    userCounts[i] = 0;
    timeStamps[i] = 0;
    positions.set(i, 0);
    // renderables.push(i);
  }

  // Define states and types for each piece of state
  const [users, setUsers] = useState(listOfusers); // Array<{ id: number }>
  const [userDetails, setUserDetails] = useState(userDedatils); // { [key: number]: { name: string } }
  const [counts, setCounts] = useState(userCounts); // { [key: number]: number }
  const [isPinned, setIsPinned] = useState(new Map()); // Map<number, boolean>
  const [currentActiveUser, setCurrentActiveUser] = useState(null); // string | null
  const [owner, setOwner] = useState("Me"); // string
  const [latestTimeStampOfUserMessages, setLatestTimeStampOfUserMessages] =
    useState({}); // { [key: number]: number }
  const [currentPositions, setCurrentPositions] = useState(positions); // Map<number, number>
  const [isVisible, setIsVisible] = useState({
    // for context menu
    visibility: false, // boolean
    id: null, // number | null
    position: { x: 0, y: 0 }, // { x: number, y: number }
  });
  const [youBlocked, setYouBlocked] = useState(new Set()); // Set<number>
  const [blockedYou, setBlockedYou] = useState(new Set()); // Set<number>

  const escapeHandler = (event) => {
    if (
      event.key === "Escape" ||
      event.key === "Esc" ||
      event.keyCode === 27 ||
      (event.key === "Meta" && event.code === "MetaLeft")
    ) {
      // console.log("Escape pressed");
      setCurrentActiveUser(null);
    }
  };

  // Set up Escape key listener
  SetEscape(escapeHandler);

  // Functions to add and remove users
  const addUser = (id, content) => {
    // console.log("************content*************", content);
    // console.log("id: ", id);
    // console.log(users.find((user) => user.id === id));
    if (users.find((user) => user.id === id) !== undefined) {
      // console.log("User already exists");
      return;
    }
    setUsers((prevUsers) => {
      return [...prevUsers, { id: id }];
    });
    setUserDetails((prevDetails) => {
      return { ...prevDetails, [id]: { name: content } };
    });
  };

  const removeUser = (id) => {
    let found = false;
    setUsers((prevUsers) => {
      return prevUsers.filter((user) => {
        if (user.id === id) found = true;
        return user.id !== id;
      });
    });
    if (!found) {
      // console.log("User not found");
      return;
    }
    setUserDetails((prevDetails) => {
      const temp = { ...prevDetails };
      delete temp[id];
      return temp;
    });
  };

  const value = {
    users, // Array<{ id: number }>
    setUsers,

    currentActiveUser, // string | null
    setCurrentActiveUser,

    userDetails, // { [key: number]: Object }
    setUserDetails,

    counts, // { [key: number]: number }
    setCounts,

    isPinned, // Map<number, boolean>
    setIsPinned,

    owner, // string
    setOwner,

    latestTimeStampOfUserMessages, // { [key: number]: number }
    setLatestTimeStampOfUserMessages,

    currentPositions, // Map<number, number>
    setCurrentPositions,

    isVisible, // { visibility: boolean, id: number | null, position: { x: number, y: number } }
    setIsVisible,

    youBlocked, // Set<number>
    setYouBlocked,

    blockedYou, // Set<number>
    setBlockedYou,

    addUser, // (id: number, content: string) => void
    removeUser, // (id: number) => void
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
export const useUser = () => useContext(UsersContext);
