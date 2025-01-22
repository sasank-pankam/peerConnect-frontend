import React from "react";
import ActiveMembers from "./ActiveMembers";
import ChatBoxWrapper from "./ChatBoxWrapper";
import InputForm from "./InputForm";
import ContextMenu from "./ContextMenu";

function MainLayout() {
  return (
    <>
      <ContextMenu />
      <div className="main-app-container">
        <div className="active-users-container">
          <ActiveMembers />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: ".3rem",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <div className="main-chats-container" id="main-chats-container">
            <ChatBoxWrapper />
          </div>
          <InputForm />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
