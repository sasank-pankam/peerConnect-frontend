import { useEffect, useState } from "react";
import { Popup } from "./PopUp";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { Message } from "../utils/Message";

export const BootStrapPrompt = () => {
  const { registerHandler, unRegisterHandler, sender } = useWebSocket();
  const [message, setMessage] = useState(false);

  useEffect(() => {
    registerHandler("1peer name for discovery", (message) => {
      const msg = Message.fromJSON(message);
      setMessage(msg);
    });
    return () => {
      console.log("unregistering peer name for discovery");
      unRegisterHandler("1peer name for discovery");
    };
  }, []);

  return (
    <Popup
      isOpen={message !== false}
      escape={false}
    // :TODO: do not add escape for this type only do when user clicks X.
    >
      <button
        onClick={() => {
          console.log("Clicked !!!!");
          console.log(message);

          sender(
            new Message(
              "1reply for discovery",
              { peerName: null },
              null,
              message.msgId,
            ),
          );
          setMessage(false);
        }}
      >
        X
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const value = e.target.elements["value"].value;
          sender(
            new Message(
              "1reply for discovery",
              { peerName: value },
              null,
              message.msgId,
            ),
          );
          setMessage(false);
        }}
        action=""
      >
        <label htmlFor="value">
          {message != false &&
            (message.content.reason
              ? "Failed to connect to reach enter a valid ip or a hostname"
              : "Enter an ip or a hostname to bootstrap")}
        </label>
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
