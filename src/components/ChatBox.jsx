import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { useSelector } from "react-redux";
import { useWebSocket } from "../contexts/WebSocketContextProvider";
import { useInteraction } from "../contexts/InteractionContextProvider";
import { useDispatch } from "react-redux";
import { addMessage, invalidateMessages, loadMore } from "../app/Slice";
import ItemBox from "./ItemBox";
import { useEffect, useRef } from "react";
import { useDebounce } from "../utils/Debounce";
import { getMessage } from "./MessageBox";
import { Message } from "../utils/Message";
import { useActiveUser } from "../contexts/ActitveUserContextProvider";
import { useCounter } from "../contexts/IdCounterContextProvider";

const blockedStyle = {
  display: "flex",
  justifyContent: "center",
  backgroundColor: "red",
  alignItems: "center",
  width: "100%",
};

const ChatBox = ({ id }) => {
  const { blockedYou, youBlocked } = useInteraction();
  const scrollRef = useRef();

  const { registerHandler, unRegisterHandler } = useWebSocket();
  const { currentActiveUser } = useActiveUser();
  const { counter } = useCounter();
  const dispatch = useDispatch();
  const messageList = useSelector((state) => state.byUser[id]) || [];

  const invalidateTopMessages = useDebounce((userId, count) => {
    dispatch(invalidateMessages({ userId, count }));
  }, 12000);

  const loadMoreMessages = () => {
    if (!messageList.length) return;
    dispatch(
      loadMore({
        userId: id,
        count: 20,
        identifier: messageList[0].identifier,
      }),
    );
  };

  useEffect(() => {
    registerHandler("0received text", (message) => {
      const msg = Message.fromJSON(message);

      dispatch(
        addMessage({
          userId: currentActiveUser,

          message: getMessage(msg.content, counter(), currentActiveUser, {
            isSender: false,
          }),
        }),
      );
    });
  }, []);

  const handleMessagesScroll = useDebounce((event, bottom, height) => {
    const { scrollOffset } = event;
    if (scrollOffset === 0) {
      loadMoreMessages();
    } else if (scrollOffset + height === bottom) {
      invalidateTopMessages(id, 10);
    }
  }, 200);

  useEffect(() => {
    console.log("scrolling");
    scrollRef.current?.scrollToItem(messageList.length - 1);
  }, [messageList, id]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="chats-container"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        id={`child-chats-container-${id}`}
      >
        <AutoSizer
          style={{
            overflowY: "hidden",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {({ height, width }) => {
            // console.log(height, width);
            const itemSize = 50;
            const itemCount = messageList.length;
            const initialScrollOffset = itemCount * itemSize; // Calculate bottom scroll offset

            return (
              <FixedSizeList
                ref={scrollRef}
                height={Math.min(height, itemSize * itemCount)} // Ensuring that height doesn't go beyond the window height
                width={width}
                itemCount={itemCount}
                itemSize={itemSize}
                onScroll={(e) => {
                  handleMessagesScroll(e, initialScrollOffset, height);
                }}
              >
                {({ index, style }) => {
                  return (
                    <div style={style}>
                      <ItemBox
                        Message={messageList[index]}
                        key={index}
                        style={style}
                      />
                    </div>
                  );
                }}
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
