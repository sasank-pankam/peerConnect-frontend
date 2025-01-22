import React, { useContext } from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import { useActiveUser } from "../contexts/ActitveUserContextProvider";
import { useMetaData } from "../contexts/MetadataContextProvider";
import { useUiState } from "../contexts/UiStateContextProvider";

// eslint-disable-next-line react/prop-types
const UserBox = ({ id: userId, userName, isPinned }) => {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { setCurrentActiveUser, currentActiveUser } = useActiveUser();
  const { counts } = useMetaData();
  const { setIsVisible } = useUiState();

  const handleClick = (event) => {
    event.preventDefault();
    if (currentActiveUser === userId) return;
    setCurrentActiveUser(userId);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible({
      visibility: true,
      id: userId,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  return (
    <div
      className="user rounded-sm"
      id={userId}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    // onMouseDown={handleMouseDown}
    >
      <div>{userName}</div>
      <div style={{ display: "flex" }}>
        {isPinned && (
          <div className="pinned p-1">
            <svg
              height="15"
              width="13"
              preserveAspectRatio="xMidYMid meet"
              className=""
            >
              <path
                fill="currentColor"
                d="M12.074 4.21 8.7 8.232l.116 4.233a.4.4 0 0 1-.657.318L.43 6.297a.4.4 0 0 1 .199-.702l4.196-.622L8.196.957a.63.63 0 0 1 .887-.078l2.914 2.445a.63.63 0 0 1 .077.887ZM1.294 14.229a.713.713 0 0 1-1.09-.915l2.674-3.64 1.536 1.288-3.12 3.267Z"
              ></path>
            </svg>
          </div>
        )}
        {/* <div className="count">{counts[userId] !== 0 && counts[userId]}</div> */}
      </div>
    </div>
  );
};

export default UserBox;
