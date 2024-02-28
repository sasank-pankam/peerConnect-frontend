import MessageBox from "./MessageBox";
import FileBox from "./FileBox";
import consts from "../Constants";

const ItemWrapper = ({ message }) => {
    if (message.type === consts.MESSAGE_TYPE) {
        return <MessageBox Message={message} />;
    }
    if (message.type === consts.FILE_TYPE) {
        return <FileBox fileProps={message} />;
    }
    return <></>;
}

export default ItemWrapper;