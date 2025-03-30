import {
  useContext,
  useMemo,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import UserBox from "./UserBox";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import Search from "../assets/search.jsx";

import { addUsersWithoutDuplicates, debounce } from "../utils/actions.js";
import { useInteraction } from "../contexts/InteractionContextProvider.jsx";
import { useWebSocket } from "../contexts/WebSocketContextProvider.jsx";
import { Message } from "../utils/Message.js";
import { getRandomNumber } from "../utils/randomNumbers.js";

/*

  user data received 
  {
    ip: _,
    name: _,
    peerId: _,
  }
  */

const ActiveMembers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [request, setRequest] = useState(null);
  const { users, setUsers, userDetails, setUserDetails } = useUser();
  const { isPinned } = useInteraction();

  const { registerHandler, unRegisterHandler, sender } = useWebSocket();

  useEffect(() => {
    const handleSearchRequests = (msg, sucessState, failureState) => {
      setRequest((prev) => {
        if (msg.msgId == prev.msgId) {
          if (msg.content.length === 0)
            return {
              state: failureState,
              msgId: null,
            };

          addUsersWithoutDuplicates(msg.content, setUsers, setUserDetails);
          return {
            state: sucessState,
            msgId: null,
          };
        }
      });
    };
    registerHandler("0result for search name", (message) => {
      const msg = Message.fromJSON(message);
      handleSearchRequests(msg, 2, 2);
    });

    registerHandler("0result for gossip search name", (message) => {
      const msg = Message.fromJSON(message);
      handleSearchRequests(msg, 0, 0);
    });
    return () => {
      unRegisterHandler("1for results");
    };
  }, []);

  useEffect(() => {
    setRequest({
      state: 1,
      msgId: null,
    });
  }, [searchValue]);

  const inputRef = useRef(null);
  // search functionality
  const changeSearchValue = debounce((e) => {
    setSearchValue(e.target.value);
  }, 200);

  const filteredUsers = useMemo(() => {
    return users.filter((userId) => {
      if (!userDetails[userId]) return false;
      return userDetails[userId].name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
  }, [searchValue, users]);

  const sortedUsers = filteredUsers.sort((a, b) => {
    return (isPinned.get(b.peerId) | 0) - (isPinned.get(a.peerId) | 0);
  });

  const handleScroll = useCallback(
    debounce((event) => {
      const target = event.target;
      const { scrollTop, scrollHeight, clientHeight } = target;

      if (scrollTop === 0) {
        // add logic to remove peers
      } else if (scrollTop + clientHeight >= scrollHeight - 1) {
        // send a get more peer list request to backend
      }
    }, 200),
    [],
  );

  const sendRequest = (state, header) => {
    const id = getRandomNumber();
    setRequest(() => {
      return {
        state,
        msgId: id,
      };
    });
    sender(new Message(header, searchValue, null, id));
  };

  return (
    <>
      <div
        className="user  scrollbar-dummy"
        style={{
          background: "transparent",
        }}
      >
        <input
          type="text"
          className="user rounded-md pb-0"
          onChange={changeSearchValue}
          defaultChecked={searchValue}
          placeholder="Search"
          ref={inputRef}
        />
        <div
          className="search"
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <Search />
        </div>
      </div>
      <div className="activemembers" id="scrollable">
        {sortedUsers.map((userId, index) => (
          <UserBox
            id={userId}
            isPinned={isPinned.get(userId)}
            userName={userDetails[userId].name}
            key={index} // for react
          />
        ))}
        {searchValue !== "" && (request === null || request.state === 1) && (
          <button onClick={() => sendRequest(1, "1search name")}>
            did&apos;t find
          </button>
        )}
        {searchValue !== "" && request !== null && request.state === 2 && (
          <button onClick={() => sendRequest(2, "1gossip search name")}>
            Gossip search
          </button>
        )}
      </div>
    </>
  );
};

export default ActiveMembers;
