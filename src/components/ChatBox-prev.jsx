import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { useSelector } from "react-redux";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { useInteraction } from "../contexts/InteractionContextProvider";
import { debounce } from "../utils/actions";
import { useDispatch } from "react-redux";
import { invalidateMessages, loadMore } from "../app/MessagesSlice";
import ItemBox from "./ItemBox";

const blockedStyle = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "red",
  alignItems: "center",
  // height: "100%",
  width: "100%",
};

const ChatBox = ({ id }) => {
  const { sender } = useWebSocket();
  const { blockedYou, youBlocked } = useInteraction();

  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.byUser[id]) || [];

  const invalidateTopMessages = debounce(() => {
    dispatch(invalidateMessages({ userId: id, count: 10 }));
  }, 12000);

  const loadMoreMessages = () => {
    dispatch(
      loadMore({
        userId: id,
        count: 20,
        identifier: messageList[0].identifier,
      }),
    );
  };

  const handleMessagesScroll = debounce((event, bottom, height) => {
    const { scrollOffset } = event;
    if (scrollOffset === 0) {
      loadMoreMessages();
    } else if (scrollOffset + height === bottom) {
      invalidateTopMessages();
    }
  }, 200);

  return (
    <div key={id} style={{ width: "100%", height: "100%" }}>
      <div
        className="chats-container"
        style={{
          overflowY: "hidden",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
        id={`child-chats-container-${id}`}
      >
        <AutoSizer>
          {({ height, width }) => {
            const itemSize = 50;
            const itemCount = messageList.length;
            const initialScrollOffset = itemCount * itemSize; // Calculate bottom scroll offset
            return (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={itemSize}
                // initialScrollOffset={initialScrollOffset}
                onScroll={(e) => {
                  handleMessagesScroll(e, initialScrollOffset, height);
                }}
              >
                {({ index, style }) => (
                  <div style={style}>
                    <ItemBox
                      Message={messageList[index]}
                      key={index}
                      style={style}
                    />
                  </div>
                )}
              </FixedSizeList>
            );
          }}
        </AutoSizer>
        {blockedYou.has(id) && (
          <div style={blockedStyle}>
            <h1>You are blocked by this user</h1>
          </div>
        )}
        {youBlocked.has(id) && (
          <div style={blockedStyle}>
            <h1>You blocked this user</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
