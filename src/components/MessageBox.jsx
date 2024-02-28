import consts from "../Constants";
const MessageBox = ({ Message }) => {
  const { content, isSender } = Message;
  let now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  now = null;
  const final_content = `<div class="message-content">${content}<span class="time">${currentHour}:${currentMinute}</span></div>`
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isSender ? "flex-end" : "flex-start",
      }}
    >
      <div className="message" dangerouslySetInnerHTML={{__html:final_content}}>

      </div>
    </div>
  );
};

export default MessageBox;

export const getMessage = (content, extraProps) => {
  return {
    content,
    type: consts.MESSAGE_TYPE,
    ...extraProps,
  };
};
