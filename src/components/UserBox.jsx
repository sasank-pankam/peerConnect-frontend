import React, { useContext } from "react";
import { UsersContext } from "../contexts/UsersContextProvider";

// eslint-disable-next-line react/prop-types
const UserBox = ({ id: uid, userName, isPinned }) => {
  const {
    setCurrentActiveUser,
    counts,
    currentActiveUser,
    setIsVisible,
    // isPinned,
    // setIsPinned,
  } = useContext(UsersContext);

  const handleClick = (event) => {
    event.preventDefault();
    if (currentActiveUser === uid) return;
    setCurrentActiveUser(uid);
    // console.log("::changed current active user to ", uid);
  };
  // const [menuVisible, setMenuVisible] = React.useState(false);
  // const [postion, setPosition] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent the default context menu
    e.stopPropagation(); // Prevent the React context menu
    setIsVisible({
      visibility: true,
      id: uid,
      position: { x: e.clientX, y: e.clientY },
    });
  };

  // const handleMenuClose = () => {
  //   setMenuVisible(false);
  // };
  return (
    <div
      className="user rounded-sm"
      id={uid}
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
              <title>pinned2</title>
              <path
                fill="currentColor"
                d="M12.074 4.21 8.7 8.232l.116 4.233a.4.4 0 0 1-.657.318L.43 6.297a.4.4 0 0 1 .199-.702l4.196-.622L8.196.957a.63.63 0 0 1 .887-.078l2.914 2.445a.63.63 0 0 1 .077.887ZM1.294 14.229a.713.713 0 0 1-1.09-.915l2.674-3.64 1.536 1.288-3.12 3.267Z"
              ></path>
            </svg>
          </div>
        )}
        <div className="count">{counts[uid] !== 0 && counts[uid]}</div>
      </div>
      {/* {menuVisible && (
        <div
          style={{
            position: "fixed",
            top: postion.y + "px",
            left: postion.x + "px",
            width: "1rem",
            zIndex: "100",
            backgroundColor: "white",
            border: "1px solid black",
            // padding: "5px",
          }}
          onClick={handleMenuClose}
        >
          <button
            onClick={() =>
              setIsPinned((prev) => {
                console.log("pinning", uid);
                // console.log("::prev", prev);
                const newState = new Map(prev);
                if (!newState.has(uid)) {
                  newState.set(uid, Date.now());
                } else {
                  newState.delete(uid);
                }
                // newState.set(uid, !newState.get(uid));
                // console.log("::newState", newState);
                return newState;
              })
            }
          >
            Pin
          </button>
        </div>
      )} */}
    </div>
  );
};

export default UserBox;
