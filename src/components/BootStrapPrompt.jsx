import { useState } from "react";
import { useUser } from "../contexts/UsersContextProvider";

export const BootStrapPrompt = () => {
  const { users } = useUser();
  const [ok, setOk] = useState(false);
  if (users && users.length === 0) {
    setTimeout(() => {
      if (users.length === 0) setOk(false);
    }, 2000);
  }
  return <div>{ok ? <div> ask for prompt</div> : <></>}</div>;
};
