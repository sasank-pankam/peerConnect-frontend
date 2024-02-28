// import {useContext, useRef, memo, useState, useEffect} from "react";
// import {UsersContext} from "../contexts/UsersContextProvider";
// import {useSelector} from "react-redux";
// // import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from "react-virtualized";
// import ItemWrapper from "./ItemWrapper";
// import IntroAboutApplication from "./IntroAboutApplication";
// import ScrollToBottom from "./ScrollToBottom";
// import {useWebSocket} from "../contexts/WebSocketContextProvider";
// import {contentSenderObject} from "../utils/ContentSenderObject";
// import consts from "../Constants";
//
//
// const UserChatContainer = ({id}) => {
//
//     if (id === null) return (<IntroAboutApplication/>);
//     const {currentPositions, setCurrentPositions} = useContext(UsersContext);
//     const {messagesSocket} = useWebSocket();
//     const messageList = useSelector((state) => state.Users[id]) || [];
//     const divRef = useRef(null);
//     const [scroll, setScroll] = useState(0);
//
//     let timeOutVar;
//     // let scrollSetTimeOut;
//     useEffect(() => {
//         if(divRef.current)
//             divRef.current.scrollTop = currentPositions.get(id);
//         return () => {
//             setCurrentPositions((prev) => {
//                 const newPositions = new Map(prev);
//                 console.log("::setting scroll of ", id, ' as ', scroll)
//                 newPositions.set(id, scroll)
//                 return newPositions;
//             })
//         }
//     }, []);
//     useEffect(() => {
//         console.log(`seted scroll of ${id} to ${scroll}`);
//     }, [scroll]);
//     const handleMessagesScroll = (event) => {
//         setScroll(divRef.current.scrollTop);
//         if (event.target.scrollTop === 0) {
//             if (timeOutVar) clearTimeout(timeOutVar);
//             timeOutVar = setTimeout(() => {
//                 fetchMessages(id, messageList.length);
//             }, 1000);
//         }
//
//     };
//
//     const fetchMessages = () => {
//         new contentSenderObject(messagesSocket, {
//             [consts.HEADER]: consts.LOAD_MESSAGES, [consts.ID]: id, [consts.CONTENT]: messageList.length,
//         }).sendContent();
//     }
//
//     return (<div
//             key={id}
//             // className="chats-container"
//             // id={`chats-container-${id}`}
//             style={{
//                 // display: currentActiveUser === id ? "flex" : "none",
//                 overflowY: "scroll", width: "100%", height: "100%",
//             }}
//             // onScroll={(event) => handleScroll(event.target.scrollTop)}
//         >
//             <div
//                 className="chats-container"
//                 style={{display: "flex"}}
//                 id={`child-chats-container-${id}`}
//                 ref={divRef}
//                 onScroll={handleMessagesScroll}
//             >
//                 {messageList.map((message, index) => {
//                     return <ItemWrapper message={message} key={index}/>;
//                 })}
//             </div>
//             <ScrollToBottom divRef={divRef} id={id}/>
//         </div>);
// };
//
// export default UserChatContainer
//


import {useContext, useRef, useEffect, useState} from "react";
import {UsersContext} from "../contexts/UsersContextProvider";
import {useSelector} from "react-redux";
import ItemWrapper from "./ItemWrapper";
import ScrollToBottom from "./ScrollToBottom";
import {useWebSocket} from "../contexts/WebSocketContextProvider";
import {contentSenderObject} from "../utils/ContentSenderObject";
import consts from "../Constants";

// eslint-disable-next-line react/prop-types
const UserChatContainer = ({id}) => {
    const {currentPositions, setCurrentPositions} = useContext(UsersContext);
    const {messagesSocket} = useWebSocket();
    const messageList = useSelector((state) => state.Users[id]) || [];
    const divRef = useRef(null);
    const scrollRef = useRef(0);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTop = currentPositions.get(id) || 0;
        }
        return () => {
            setCurrentPositions((prev) => {
                const newPositions = new Map(prev);
                newPositions.set(id, scrollRef.current);
                return newPositions;
            });
        };
    }, []);
    let timeOutVar;
    const handleMessagesScroll = (event) => {

        if (event.scrollTop + event.clientHeight !== event.scrollHeight) {
            setVisible(true);
        }
        if(event.scrollTop + event.clientHeight === event.scrollHeight) {
            console.log(false)
            setVisible(false);
        }

        scrollRef.current = event.target.scrollTop;
        if (event.target.scrollTop === 0) {
            if (timeOutVar) clearTimeout(timeOutVar);
            timeOutVar = setTimeout(() => {
                fetchMessages(id, messageList.length);
            }, 1000);
        }
    };

    const fetchMessages = () => {
        new contentSenderObject(messagesSocket, {
            [consts.HEADER]: consts.LOAD_MESSAGES, [consts.ID]: id, [consts.CONTENT]: messageList.length,
        }).sendContent();
    }
    return (
        <div
            key={id}
            style={{overflowY: "scroll", width: "100%", height: "100%"}}
        >
            <div
                className="chats-container"
                style={{display: "flex"}}
                id={`child-chats-container-${id}`}
                ref={divRef}
                onScroll={handleMessagesScroll}
            >
                {messageList.map((message, index) => {
                    return <ItemWrapper message={message} key={index}/>;
                })}
            </div>
            {visible && <div style={{
                position: 'fixed',
                top: '10px',
                end: '10px',
            }}>fuckyou</div>}
        </div>
    );
};

export default UserChatContainer;
