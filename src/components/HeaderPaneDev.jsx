import { useContext, useRef } from "react";
import { appendMF } from "../app/MessagesSlice";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import { getMessage } from "./MessageBox";
import { getFile } from "./FileBox";
import { useDispatch } from "react-redux";
import { useWebSocket } from "../contexts/WebSocketContextProvider.js";

function HeaderPane() {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const {
    owner,
    currentActiveUser,
    userDetails,
    users,
    setUsers,
    setCounts,
    // isPinned,
    addUser,
    removeUser,
    setIsPinned,
    setLatestTimeStampOfUserMessages,
    setYouBlocked,
    setBlockedYou,
  } = useUser();

  const { setSessionEnd } = useWebSocket();
  const reference = useRef(null);
  const dispach = useDispatch();

  const incrementCounterOfUser = (id) => {
    setCounts((prevCounts) => {
      if (currentActiveUser === id) return prevCounts;
      const newCounts = { ...prevCounts };
      newCounts[id] = newCounts[id] + 1;
      return newCounts;
    });
  };

  const updateLatestMessagedUser = (currentUserId) => {
    setLatestTimeStampOfUserMessages((prev) => {
      const currentTime = new Date();
      if (!prev[currentUserId] && prev[currentUserId] > currentTime.getTime()) {
        return prev;
      }
      return { ...prev, [currentUserId]: currentTime.getTime() };
    });
    const temp = users.filter(({ id: uid }) => uid !== currentUserId);
    temp.unshift({ id: currentUserId });
    setUsers(temp);
  };

  const appendMessageWrapper = (message, id) => {
    updateLatestMessagedUser(id);
    dispach(appendMF({ newMessage: message, id }));
    !message.isSender && incrementCounterOfUser(id);
  };

  const generateMessages = (id) => {
    if (id == null) {
      // console.log("Select a user first");
      return;
    }
    const messages = [
      getMessage("Hello", { isSender: true }),
      getMessage("Hi", { isSender: false }),
      getMessage("How are you?", { isSender: true }),
      getMessage("I am fine", { isSender: false }),
      getMessage("What about you?", { isSender: false }),
      getMessage("I am also fine", { isSender: true }),
      getMessage("Good to hear that", { isSender: false }),
      getMessage("Bye", { isSender: true }),
      getMessage("Bye", { isSender: false }),
    ];
    messages.forEach((message) => {
      appendMessageWrapper(message, id);
    });
  };

  const generateFiles = (id) => {
    if (id == null) {
      // console.log("Select a id first");
      return;
    }
    [
      getFile({
        name: "file1.txt",
        isSender: true,
        size: "100 mb",
        ext: "txt",
      }),
      getFile({
        name: "file2.txt",
        isSender: false,
        size: "100 mb",
        ext: "txt",
      }),
      getFile({
        name: "file3.txt",
        isSender: false,
        size: "100 mb",
        ext: "txt",
      }),
      getFile({
        name: "file4.txt",
        isSender: true,
        size: "100 mb",
        ext: "txt",
      }),
      getFile({
        name: "file5.txt",
        isSender: true,
        size: "100 mb",
        ext: "txt",
      }),
      getFile({
        name: "file6.txt",
        isSender: false,
        size: "100 mb",
        ext: "txt",
      }),
      getFile({
        name: "file7.txt",
        isSender: false,
        size: "100 mb",
        ext: "txt",
      }),
      getFile({
        name: "file8.txt",
        isSender: true,
        size: "100 mb",
        ext: "txt",
      }),
    ].forEach((file) => {
      appendMessageWrapper(file, id);
    });
  };

  const pinUser = (id) => {
    // console.log(`Pinned user ${id}`);
    if (id == null) {
      // console.log("Select a id first");
      return;
    }
    setIsPinned((prevPinned) => {
      const newPinned = new Map(prevPinned);
      newPinned.set(id, new Date().getTime());
      return newPinned;
    });
  };
  const unPinUser = (id) => {
    // console.log(`Unpinned user ${id}`);
    if (id == null) {
      // console.log("Select a id first");
      return;
    }
    setIsPinned((prevPinned) => {
      const newPinned = new Map(prevPinned);
      newPinned.delete(id);
      return newPinned;
    });
  };

  const blockedYou = (id) => {
    // console.log(`${id} Blocked you`);
    if (id == null) {
      // console.log("Select a id first");
      return;
    }
    setBlockedYou((prevBlocked) => {
      const newBlocked = new Set(prevBlocked);
      newBlocked.add(id);
      return newBlocked;
    });
  };

  const unBlockedYou = (id) => {
    // console.log(`${id} Unblocked you`);
    if (id == null) {
      // console.log("Select a id first");
      return;
    }
    setBlockedYou((prevBlocked) => {
      const newBlocked = new Set(prevBlocked);
      newBlocked.delete(id);
      return newBlocked;
    });
  };

  const youBlocked = (id) => {
    // console.log(`You blocked ${id}`);
    if (id == null) {
      // console.log("Select a id first");
      return;
    }
    setYouBlocked((prevBlocked) => {
      const newBlocked = new Set(prevBlocked);
      newBlocked.add(id);
      return newBlocked;
    });
  };

  const youUnblocked = (id) => {
    // console.log(`You unblocked ${id}`);
    if (id == null) {
      // console.log("Select a id first");
      return;
    }
    setYouBlocked((prevBlocked) => {
      const newBlocked = new Set(prevBlocked);
      newBlocked.delete(id);
      return newBlocked;
    });
  };

  return (
    <div className="details">
      <div className="title">Chat Application</div>
      <input type="number" name="" id="" ref={reference} />
      <button onClick={() => setSessionEnd(true)}> end </button>
      <button
        className="add-user"
        onClick={() => generateMessages(Number(reference.current.value))}
      >
        Generate Messages
      </button>
      <button
        className="add-user"
        onClick={() => generateFiles(Number(reference.current.value))}
      >
        Generate file
      </button>
      <button
        className="pin-user"
        onClick={() => pinUser(Number(reference.current.value))}
      >
        pin user
      </button>
      <button
        className="pin-user"
        onClick={() => unPinUser(Number(reference.current.value))}
      >
        unpin user
      </button>
      <button
        className="pin-user"
        onClick={() => addUser(Number(reference.current.value))}
      >
        add user
      </button>
      <button
        className="pin-user"
        onClick={() => removeUser(Number(reference.current.value))}
      >
        remove user
      </button>
      <button
        className="pin-user"
        onClick={() => blockedYou(Number(reference.current.value))}
      >
        blocked you
      </button>
      <button
        className="pin-user"
        onClick={() => unBlockedYou(Number(reference.current.value))}
      >
        unblocked you
      </button>
      <button
        className="pin-user"
        onClick={() => youBlocked(Number(reference.current.value))}
      >
        you blocked
      </button>
      <button
        className="pin-user"
        onClick={() => youUnblocked(Number(reference.current.value))}
      >
        you unblocked
      </button>
      <div className="username">{owner.owner}</div>
      <div className="current-active-user">
        {(userDetails[currentActiveUser] &&
          userDetails[currentActiveUser].name) ||
          ""}
      </div>
      <button onClick={() => console.table(users)}> print users </button>
    </div>
  );
}

// const HeaderPane = () => {
//   const {
//     owner,
//     currentActiveUser,
//     userDetails,
//   } = useContext(UsersContext);
//   return (
//     <div className="details">
//       <div className="title">Chat Application</div>
//       <div className="username">{owner}</div>
//       <div className="current-active-user">
//         {(userDetails[currentActiveUser] &&
//           userDetails[currentActiveUser].name) ||
//           ""}
//       </div>
//     </div>
//   );
// };

export default HeaderPane;
