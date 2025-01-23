import MainLayout from "./MainLayout";
import HeaderPane from "./HeaderPane";
import { BootStrapPrompt } from "./BootStrapPrompt";

const ChatApp = () => {
  return (
    <div className="root-container">
      <HeaderPane />
      <BootStrapPrompt />
      <MainLayout />
    </div>
  );
};

export default ChatApp;
