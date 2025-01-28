import { Popup } from "../PopUp";
import { BoxLayout } from "./Layout";
import { ListItem } from "./ListItem";

export const FilesList = ({ files }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {files.map((file, index) => {
        return <ListItem item={file} key={index} />;
      })}
    </div>
  );
};

export const MultipleFile = ({ Messsage }) => {
  const { time, content, isSennder } = Messsage;
  const { files } = content;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BoxLayout time={time} isSender={isSennder}>
      sending multiple files
      <Popup isOpen={isOpen} onClose={(e) => setIsOpen(false)}>
        <FilesList files={files} />
      </Popup>
    </BoxLayout>
  );
};
