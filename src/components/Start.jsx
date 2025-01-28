import { useState } from "react";
import ChatApp from "./ChatApp.jsx";
import LoadProfiles from "./LoadProfiles.jsx";

const Start = () => {
  const [clicked, setClicked] = useState(true);

  return (
    <>{clicked ? <ChatApp /> : <LoadProfiles setClicked={setClicked} />}</>
  );
};

export default Start;
