import MainLayout from "./MainLayout";
import HeaderPane from "./HeaderPane";
import { BootStrapPrompt } from "./BootStrapPrompt";
import { useEffect } from "react";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { useActiveUser } from "../contexts/ActitveUserContextProvider";
import { Message } from "../utils/Message";

const ChatApp = () => {
  const { sender } = useWebSocket();
  const { currentActiveUser } = useActiveUser();
  useEffect(() => {
    const message = null;
    sender(new Message("1sync users", message, currentActiveUser, null));
  }, []);
  return (
    <div className="root-container">
      <HeaderPane />
      <BootStrapPrompt />
      <MainLayout />
    </div>
  );
};

export default ChatApp;
