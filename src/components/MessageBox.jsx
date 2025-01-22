import consts from "../Constants";

const MessageBox = ({ Message }) => {
  const { content, isSender, time } = Message;
  let now = new Date(time);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const final_content = `<div class="message-content">${content}<span class="time">${currentHour}:${currentMinute}</span></div>`;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isSender ? "flex-end" : "flex-start",
      }}
    >
      <div
        className="message"
        dangerouslySetInnerHTML={{ __html: final_content }}
      ></div>
    </div>
  );
};

export default MessageBox;

export const getMessage = (content, id, userId, extraProps) => {
  return {
    type: consts.TYPE_MESSAGE,
    content,
    id,
    time: new Date().toUTCString(),
    userId,
    isSender: false,
    ...extraProps,
  };
};
