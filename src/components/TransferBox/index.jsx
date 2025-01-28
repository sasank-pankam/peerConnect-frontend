import { ErrorComponent } from "../ErrorComponent.jsx";
import consts from "../../Constants.js";
import { Directory } from "./Directory.jsx";
import { File } from "./File.jsx";
import { MultipleFile } from "./MultipleFiles.jsx";

const renderMap = new Map([
  [consts.SUB_TR_DIR, Directory],
  [consts.SUB_TR_FILE, File],
  [consts.SUB_TR_MUL_FILE, MultipleFile],
]);

export const TransferBox = ({ Message }) => {
  const { subType } = Message;

  const RendererComponent = renderMap.get(subType) | ErrorComponent;
  return <RendererComponent Message={Message} />;
};
