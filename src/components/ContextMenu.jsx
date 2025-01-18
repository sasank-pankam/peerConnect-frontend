import { useContext } from "react";
import { UsersContext, useUser } from "../contexts/UsersContextProvider";
import { Message } from "../utils/Message.js";
import { dataSender } from "../utils/Sender.js";
import consts from "../Constants";
import { useWebSocket } from "../contexts/WebSocketContextProvider.jsx";
import { useUiState } from "../contexts/UiStateContextProvider.jsx";
import { useInteraction } from "../contexts/InteractionContextProvider.jsx";

const ContextMenu = () => {
  /**
   * @type {import('../contexts/UsersContextProvider').UserContextValue}
   */
  const { isVisible, setIsVisible } = useUiState();
  const { isPinned, setIsPinned, youBlocked, setYouBlocked } = useInteraction();

  const { sender } = useWebSocket();

  if (!isVisible.visibility) {
    return <></>;
  }

  const { id, position } = isVisible;
  const { x, y } = position;
  const style = {
    top: y,
    left: x,
  };

  const tooglePin = () => {
    setIsPinned((prev) => {
      const newState = new Map(prev);
      if (!newState.has(id)) {
        newState.set(id, Date.now());
      } else {
        newState.delete(id);
      }
      return newState;
    });
    setIsVisible({ visibility: false, id: null, position: { x: 0, y: 0 } });
  };

  const toogleBlock = () => {
    setYouBlocked((prev) => {
      const newState = new Set(prev);
      if (!newState.has(id)) {
        newState.add(id);
      } else {
        newState.delete(id);
      }
      return newState;
    });
    setIsVisible({ visibility: false, id: null, position: { x: 0, y: 0 } });

    sender(
      new Message(consts.COMMAND, { [consts.SUBHEADER]: consts.BLOCK }, id),
    );
  };

  return (
    <div style={style} className="context-menu">
      <button onClick={tooglePin}>{isPinned.get(id) ? "Unpin" : "Pin"}</button>
      <button onClick={toogleBlock}>
        {youBlocked.has(id) ? "Unblock" : "block"}
      </button>
    </div>
  );
};

export default ContextMenu;
