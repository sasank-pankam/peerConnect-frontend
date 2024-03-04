import {useState, useEffect} from "react";
import MainLayout from "./components/MainLayout";
import {useWebSocket, WebSocketContextProvider} from "./contexts/WebSocketContextProvider";
import HeaderPane from "./components/HeaderPaneDev";
// import HeaderPane from "./components/HeaderPane";
import {useMessagingSocket, useSocketWithHandler} from "./components/WebSocketHandler";
import {contentSenderObject} from "./utils/ContentSenderObject.js";
import consts from "./Constants";


const useSessionEnd = () => {
    const [sessionEnd, setSessionEnd] = useState(false);

    useEffect(() => {

        if (sessionEnd) {
            document.querySelector("body").innerHTML = "<div> Session Ended </div>";
            document.querySelector("head").innerHTML = "";
        }
    }, [sessionEnd]);

    return [sessionEnd, setSessionEnd];
}

const EndSession = (sessionEnd, socket) => {
    useEffect(() => {
        return () => {
            if (socket) {
                socket.close();
            }
        }
    }, [sessionEnd, socket]);
}

const App = () => {
    const [sessionEnd, setSessionEnd] = useSessionEnd();
    const [socket, setSocket] = useSocketWithHandler(`ws://${consts.IP}:${consts.PORT}`, setSessionEnd);
    const [messagesSocket, setMessagesSocket] = useMessagingSocket(`ws://${consts.IP}:${consts.MESSAGES_PORT}`);
    EndSession(sessionEnd, socket);
    if (sessionEnd) {
        return <div>Session Ended</div>;
    }

    return (
        <WebSocketContextProvider
            value={{
                socket,
                setSocket,
                messagesSocket,
                setMessagesSocket,
                setSessionEnd,
            }}
        >
            <div className="root-container">
                <HeaderPane/>
                <MainLayout/>
            </div>
        </WebSocketContextProvider>

    );
}

export default App;
