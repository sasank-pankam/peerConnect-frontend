import { useContext, useEffect } from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider.jsx";
import ChatBox from "./ChatBox.jsx";
import IntroAboutApplication from "./IntroAboutApplication.jsx";
import { useActiveUser } from "../contexts/ActitveUserContextProvider.jsx";
import { setEscape } from "./EscapeHanndler.jsx";

function ChatBoxWrapper() {
  const { currentActiveUser, setCurrentActiveUser } = useActiveUser();

  const escapeHandler = () => {
    // console.log("Escape pressed");
    setCurrentActiveUser((prev) => (prev === null ? prev : null));
  };

  if (currentActiveUser) setEscape.add(escapeHandler);
  else setEscape.remove();
  return (
    <>
      {currentActiveUser === null ? (
        <IntroAboutApplication />
      ) : (
        <ChatBox id={currentActiveUser} />
      )}
    </>
  );
}

export default ChatBoxWrapper;
