import { useContext } from "react";
import { UsersContext } from "../contexts/UsersContextProvider";

const ContextMenu = () => {
  const { isVisible, setIsVisible, isPinned, setIsPinned } =
    useContext(UsersContext);

  if (!isVisible.visibility) {
    return <></>;
  }

  const { id, position } = isVisible;
  const { x, y } = position;
  const style = {
    top: y,
    left: x,
  };
  return (
    <div style={style} className='context-menu'>

      <button
        onClick={() => {
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
        }}
      >
        {isPinned.get(id) ? "Unpin" : "Pin"}
      </button>
    </div>
  );
};

export default ContextMenu;