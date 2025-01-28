import { DownloadIcon } from "../../assets/download";
import fileLogo from "../../assets/fileIcon.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateProgress } from "../../app/Slice";
import { BoxLayout } from "./Layout";

export const File = ({ Messsage }) => {
  const { content, time, isSender = true } = Messsage;
  const { name = "", size = 0, ext = "", tId = 0 } = content;

  const progress = useSelector((state) => state.byId.get(tId));
  const dispatch = useDispatch();
  const handleClick = (event) => {
    // send a message to backend to accept
    dispatch(updateProgress({ tId, percentage: 0 }));
  };
  return (
    <BoxLayout isSender={isSender} time={time}>
      <div className="main-file-container bg-gray-400">
        <div className="icon-container">
          <div>
            <img src={fileLogo} alt="fileIcon" width={30} />
          </div>
        </div>
        <div className="text-div-container">
          <div className="file-name-container font-semibold">
            <div>{name}</div>
            {!isSender && progress === false && (
              <div onClick={handleClick}>
                <DownloadIcon />
              </div>
            )}
          </div>
          <div className="lower-icons-container">
            <div className="size">{size}</div>
            <div className="ext">{ext}</div>
          </div>
        </div>
      </div>
    </BoxLayout>
  );
};

/*
  
  */
