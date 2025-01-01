/* eslint-disable react/prop-types */
import fileLogo from "../assets/fileIcon.png";
import consts from "../Constants";
import { useWebSocket } from "../contexts/WebSocketContextProvider.js";
import { useContentSender } from "../utils/ContentSenderObject.js";

const FileBox = ({ fileProps }) => {
  const { socket, senders } = useWebSocket();
  let now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  now = null;

  const {
    name = "",
    isSender = true,
    size = 0,
    ext = "",
    id = 0,
    isAccepted = false,
  } = fileProps;
  const handleClick = () => {
    senders.signalSender(consts.ACCEPT_FILE, "accept", id);
  };
  return (
    <div
      style={{
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        alignItems: isSender ? "flex-end" : "flex-start",
        margin: ".3rem",
      }}
    >
      <div className=" bg-gray-300 rounded-md">
        <div className="main-file-container bg-gray-400">
          <div className="icon-container">
            <div>
              <img src={fileLogo} alt="fileIcon" width={30} />
            </div>
          </div>
          <div className="text-div-container">
            <div className="file-name-container font-semibold">
              <div>{name}</div>
              {!isSender && !isAccepted && (
                <div onClick={handleClick}>
                  <svg
                    viewBox="0 0 34 34"
                    height="28"
                    width="28"
                    preserveAspectRatio="xMidYMid meet"
                    className=""
                    version="1.1"
                    x="0px"
                    y="0px"
                    enableBackground="new 0 0 34 34"
                  >
                    <path
                      fill="currentColor"
                      d="M17,2c8.3,0,15,6.7,15,15s-6.7,15-15,15S2,25.3,2,17S8.7,2,17,2 M17,1C8.2,1,1,8.2,1,17 s7.2,16,16,16s16-7.2,16-16S25.8,1,17,1L17,1z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M22.4,17.5h-3.2v-6.8c0-0.4-0.3-0.7-0.7-0.7h-3.2c-0.4,0-0.7,0.3-0.7,0.7v6.8h-3.2 c-0.6,0-0.8,0.4-0.4,0.8l5,5.3c0.5,0.7,1,0.5,1.5,0l5-5.3C23.2,17.8,23,17.5,22.4,17.5z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="lower-icons-container">
              <div className="size">{size}</div>
              <div className="ext">{ext}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="time">{`${currentHour}:${currentMinute}`}</div>
        </div>
      </div>
    </div>
  );
};

export default FileBox;

export const getFile = (extraProps) => {
  return {
    type: consts.FILE_TYPE,
    ...extraProps,
  };
};
