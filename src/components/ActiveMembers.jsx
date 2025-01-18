import { useContext, useMemo, useState, useRef } from "react";
import UserBox from "./UserBox";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import Search from "../assets/search.jsx";

import { debounce } from "../utils/actions.js";
import { useInteraction } from "../contexts/InteractionContextProvider.jsx";
import { useWebSocket } from "../contexts/WebSocketContextProvider.jsx";

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
  const { users, userDetails } = useUser();
  const { isPinned } = useInteraction();

  const { registerHandler, unRegisterHandler } = useWebSocket();

  // useEffect(() => {
  //   registerHandler();
  //
  //   return () => {
  //     unRegisterHandler(consts.);
  //   };
  // }, []);

  const inputRef = useRef(null);
  // search functionality
  const changeSearchValue = debounce(() => {
    setSearchValue(e.target.value);
  }, 200);

  const filteredUsers = useMemo(() => {
    searchValue && console.log("::searched for ", searchValue);
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

      if (scrollTop + clientHeight >= scrollHeight - 1) {
        // send a get more peer list request to backend
      }
    }, 200),
    [],
  );

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
            id={peerId}
            isPinned={isPinned.get(peerId)}
            userName={userDetails[peerId].name}
            key={index} // for react
          />
        ))}
      </div>
    </>
  );
};

export default ActiveMembers;
