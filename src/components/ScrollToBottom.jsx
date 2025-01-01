import DownIcon from "../assets/down.svg";
import { useContext, useEffect, useState } from "react";
import { useUser } from "../contexts/UsersContextProvider";

const ScrollToBottom = ({ divRef, id }) => {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { counts, setCounts } = useUser();
  const [scroll, setScroll] = useState(divRef.current.scrollTop);
  let displayStyle;
  useEffect(() => {
    displayStyle =
      divRef.current &&
        divRef.current.scrollTop + divRef.current.clientHeight !==
        divRef.current.scrollHeight
        ? "block"
        : "none";
    if (counts[id] === 0) return;

    setCounts((prevCounts) => {
      if (prevCounts[id] == 0) return prevCounts;
      const newCounts = { ...prevCounts };
      newCounts[id] = 0;
      return newCounts;
    });
  }, [scroll]);
  // eslint-disable-next-line react/prop-types
  divRef.current.onScroll = (event) => {
    setScroll(event.target.scrollTop);
  };
  return (
    <div
      style={{
        display: displayStyle,
        width: "min-content",
        height: "min-content",
        position: "absolute",
        bottom: "4.7rem",
        right: "2rem",
        backgroundColor: "red",
      }}
    >
      <button
        className="down-icon"
        style={{ width: "1.7rem", cursor: "pointer" }}
        onClick={(event) => {
          event.preventDefault();

          divRef.current.scrollTop = divRef.current.scrollHeight;
        }}
      >
        <img src={DownIcon} alt="down-icon" />
      </button>
    </div>
  );
};

export default ScrollToBottom;
