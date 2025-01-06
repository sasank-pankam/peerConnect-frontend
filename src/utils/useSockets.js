import { useSocketWithHandshake } from "../components/WebSocketHandler";
import { recvRegistery } from "./RecvRegistery";
import consts from "../Constants";
import { sendRegistery } from "./SendRegistery";

export const useSocket = () => {
  const messagesUrl = `ws://${consts.IP}:${consts.MESSAGES_PORT}`;
  const signalsUrl = `ws://${consts.IP}:${consts.SIGNALS_PORT}`;
  const [messagesSocket, _] = useSocketWithHandshake(
    messagesUrl,
    (websocket) => {
      console.log("messages connected!");
      websocket.send(
        JSON.stringify({
          header: consts.MESSAGES,
          content: null,
          id: null,
        }),
      );
      return "messages";
    },
  );

  const [signalsSocket, __] = useSocketWithHandshake(
    signalsUrl,
    (websocket) => {
      console.log("signals connected!");
      websocket.send(
        JSON.stringify({
          header: consts.SIGNALS,
          content: null,
          id: null,
        }),
      );
      return "signals";
    },
  );

  const recv = recvRegistery(messagesSocket, signalsSocket);
  const send = sendRegistery(messagesSocket, signalsSocket);

  return {
    signalsSocket,
    messagesSocket,
    ...recv,
    sender: send,
  };
};
