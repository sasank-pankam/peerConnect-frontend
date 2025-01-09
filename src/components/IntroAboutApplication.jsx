import React from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import { useActiveUser } from "../contexts/ActitveUserContextProvider";

function IntroAboutApplication() {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { currentActiveUser } = useActiveUser();
  return (
    <div
      className="chats-container flex justify-center intro-page"
      style={{
        alignItems: "center",
        display: currentActiveUser !== null ? "none" : "flex",
      }}
      id="intro-box"
    >
      IntroAboutApplication
    </div>
  );
}

export default IntroAboutApplication;
