import consts from "../Constants";
import MessageBox from "./MessageBox";
import { TransferBox } from "./TransferBox";

const ItemBox = ({ Message }) => {
  const { type } = Message;
  if (type === consts.TYPE_MESSAGE) return <MessageBox Message={Message} />;
  if (type === consts.TYPE_TRANSFER) return <TransferBox Message={Message} />;
};

export default ItemBox;
