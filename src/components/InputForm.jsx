import { useContext, useEffect, useState, useRef } from "react";
import { UsersContext } from "../contexts/UsersContextProvider";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { appendMF } from "../app/MessagesSlice";
import { contentSenderObject } from "../utils/ContentSenderObject";
import { getMessage } from "../components/MessageBox";
import { getFile } from "../components/FileBox";
import { useDispatch } from "react-redux";
import consts from "../Constants";
import { parseMessage } from "../utils/actions";

// import FolderIcon from '@mui/icons-material/Folder';

const useCleanInput = (inpRef, currentActiveUser, setIsSent) => {
  useEffect(() => {
    setIsSent(false);
    if (inpRef.current) {
      inpRef.current.value = "";
    }
  }, [currentActiveUser, inpRef]);
};

const InputForm = () => {
  const dispatch = useDispatch();
  const { socket } = useWebSocket();
  const [isSent, setIsSent] = useState(false);

  const {
    currentActiveUser /* , counts, setCounts */,
    blockedYou,
    youBlocked,
  } = useContext(UsersContext);

  const inpRef = useRef(null);

  useCleanInput(inpRef, currentActiveUser, setIsSent);

  const triggerDirectoryChange = (event) => {
    event.preventDefault();
    new contentSenderObject(socket, {
      [consts.HEADER]: consts.COMMAND,
      [consts.CONTENT]: consts.SEND_FILE,
      [consts.ID]: currentActiveUser,
    }).sendContent();
  };
  const triggerSendFile = (event) => {
    event.preventDefault();
    new contentSenderObject(socket, {
      [consts.HEADER]: consts.COMMAND,
      [consts.CONTENT]: consts.SEND_FILE,
      [consts.ID]: currentActiveUser,
    }).sendContent();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let message = String(event.target[0].value);
    event.target[0].value = "";
    if (message === "") return;
    if (message.length > 6 && message.substring(0, 6) === "file::") {
      new contentSenderObject(socket, {
        [consts.HEADER]: consts.NEW_FILE,
        [consts.CONTENT]: message.substring(6),
        [consts.ID]: currentActiveUser,
      }).sendContent();
      // dispatch(
      //     appendMF({
      //         newMessage: getFile({
      //             name: message,
      //             isSender: true,
      //             id: '',
      //             size: "0",
      //             ext: "null",
      //         }),
      //         id: currentActiveUser,
      //     }),
      // ); // for appending message to chat container

      return;
    }
    message = parseMessage(message);
    new contentSenderObject(socket, {
      [consts.HEADER]: consts.NEW_MESSAGE,
      [consts.CONTENT]: message,
      [consts.ID]: currentActiveUser,
    }).sendContent();

    // console.log("sent message");
    dispatch(
      appendMF({
        newMessage: getMessage(message, { isSender: true }),
        id: currentActiveUser,
      }),
    ); // for appending message to chat container
    console.log("appending message");
  };

  if (
    currentActiveUser === null ||
    blockedYou.has(currentActiveUser) ||
    youBlocked.has(currentActiveUser)
  )
    return <></>;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="input-wrapper"
        style={{
          display: "flex",
        }}
      >
        <div style={{ display: "flex", marginLeft: "1rem", gap: ".7rem" }}>
          <svg
            onClick={triggerSendFile}
            height="20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 0C0.9 0 0.01 0.9 0.01 2L0 18C0 19.1 0.89 20 1.99 20H14C15.1 20 16 19.1 16 18V6.83C16 6.3 15.79 5.79 15.41 5.42L10.58 0.59C10.21 0.21 9.7 0 9.17 0H2ZM9 6V1.5L14.5 7H10C9.45 7 9 6.55 9 6ZM4 10C3.44772 10 3 10.4477 3 11C3 11.5523 3.44772 12 4 12H12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10H4ZM10 15C10 14.4477 9.55228 14 9 14H4C3.44772 14 3 14.4477 3 15C3 15.5523 3.44772 16 4 16H9C9.55228 16 10 15.5523 10 15Z"
              fill="var(--attachment-type-documents-color)"
            ></path>
          </svg>

          <svg
            onClick={triggerDirectoryChange}
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-m9simb"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="FolderIcon"
            height="25"
            width="20"
          >
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z"></path>
          </svg>
        </div>
        <input
          onFocus={() => {
            if (isSent) return;
            new contentSenderObject(socket, {
              [consts.HEADER]: consts.ActiveUser,
              [consts.CONTENT]: "",
              [consts.ID]: currentActiveUser,
            }).sendContent();
            setIsSent(true);
          }}
          ref={inpRef}
          type="text"
          className="message-input"
          placeholder="Type a message"
        />
        <button className="send-btn bg-slate-600" type="submit">
          Send
        </button>
      </form>
    </>
  );
};

export default InputForm;

{
  /* <button
  className="down-icon"
  style={{}}
  onClick={(event) => {
    event.preventDefault();
    setIsBottom(true);

    setCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[currentActiveUser] = 0;
      return newCounts;
    });
    const activeUserDiv = document.getElementById(
      `chats-container-${currentActiveUser}`
    );
    activeUserDiv.scrollTop = activeUserDiv.scrollHeight;
  }}
  >
  <img
    src={DownIcon}
    alt="down-icon"
    style={{ display: isBottom ? "none" : "flex" }}
  />
  </button> */
}
