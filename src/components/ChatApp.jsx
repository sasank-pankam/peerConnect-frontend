import MainLayout from "./MainLayout";
// import HeaderPane from "./HeaderPaneDev";
import { useSetRecvRegistery } from "../utils/SetRecvRegistery";
import HeaderPane from "./HeaderPane";
const ChatApp = () => {
  useSetRecvRegistery();
  return (
    <div className="root-container">
      <HeaderPane />
      <MainLayout />
    </div>
  );
};

export default ChatApp;
