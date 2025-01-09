import { useContext, useEffect } from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import UserChatContainer from "./UserChatContainer";
import IntroAboutApplication from "./IntroAboutApplication.jsx";
import { useActiveUser } from "../contexts/ActitveUserContextProvider.jsx";

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

function UserChatContainersWrapper() {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { currentActiveUser, setCurrentActiveUser } = useActiveUser();

  const escapeHandler = (event) => {
    if (
      event.key === "Escape" ||
      event.key === "Esc" ||
      event.keyCode === 27 ||
      (event.key === "Meta" && event.code === "MetaLeft")
    ) {
      // console.log("Escape pressed");
      setCurrentActiveUser((prev) => (prev === null ? prev : null));
    }
  };

  // Set up Escape key listener
  SetEscape(escapeHandler);
  return (
    <>
      {currentActiveUser === null ? (
        <IntroAboutApplication />
      ) : (
        <UserChatContainer id={currentActiveUser} key={currentActiveUser} />
      )}
    </>
  );
}

export default UserChatContainersWrapper;
