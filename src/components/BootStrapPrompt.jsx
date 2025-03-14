import { useEffect, useState } from "react";
import { useUser } from "../contexts/UsersContextProvider";
import { Popup } from "./PopUp";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { Message } from "../utils/Message";

export const BootStrapPrompt = () => {
  const { registerHandler, unRegisterHandler, sender } = useWebSocket();
  const [messageId, setMessageId] = useState(false);

  useEffect(() => {
    registerHandler("1peer name for discovery", (message) => {
      // const msg = Message()
      setMessageId(message.content.msgId);
    });
    return () => {
      unRegisterHandler("1peer name for discovery");
    };
  }, []);

  return (
    <Popup isOpen={messageId} onClose={() => { }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = e.target.elements["value"].value;
          sender(
            new Message(
              "1reply for discovery",
              { peerName: value },
              null,
              messageId,
            ),
          );
          setMessageId(false);
        }}
        action=""
      >
        <input
          type="text"
          name="value"
          placeholder="Enter an ip or a hostname to bootstrap"
        />
        <button type="submit">Send</button>
      </form>
    </Popup>
  );
};
