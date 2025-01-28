import { useState } from "react";
import { BoxLayout } from "./Layout";
import { Popup } from "../PopUp";
import { ListItem } from "./ListItem";
import { FilesList, MultipleFile } from "./MultipleFiles";

const DirecotryTree = ({ Items, level }) => {
  const { name, files, directories } = Items;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <div
        style={{
          cursor: "pointer",
          padding: ".3rem",
          width: "max-content",
          borderRadius: ".3rem",
          marginBottom: ".3rem",
        }}
        className="hover-gray"
        onClick={toggleExpand}
      >
        {name} {isExpanded ? "▼" : "▶"}
      </div>
      {isExpanded && (
        <div
          style={{ marginLeft: isExpanded ? `${30 * (level + 1)}px` : "0px" }}
        >
          <div>
            <FilesList files={files} />
          </div>
          <div>
            {directories.map((dir, index) => (
              <DirecotryTree key={index} Items={dir} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const Directory = ({ Messsage, setMess }) => {
  const { time, content, isSennder } = Messsage;
  const { name, items } = content;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <BoxLayout time={time} isSender={isSennder}>
      <div
        style={{
          cursor: "pointer",
        }}
        onClick={(e) => setIsOpen(true)}
      >
        {name}
      </div>
      <Popup
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DirecotryTree Items={items} level={0} />
      </Popup>
    </BoxLayout>
  );
};
