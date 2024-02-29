import React, { useState, useEffect, useContext } from "react";
import MainLayout from "./components/MainLayout";
import { WebSocketContextProvider } from "./contexts/WebSocketContextProvider";
import HeaderPane from "./components/HeaderPaneDev";
// import HeaderPane from "./components/HeaderPane";
import WebSocketHandler from "./components/WebSocketHandler";
import { Provider } from "react-redux";
import { messagesStore } from "./app/MessagesStore";
import { UsersProvider } from "./contexts/UsersContextProvider.jsx";
import {contentSenderObject} from "./utils/ContentSenderObject.js";
import consts from "./Constants";
function App() {
  const [socket, setSocket] = useState(null);
  const [messagesSocket, setMessagesSocket] = useState(null);
  const [ sessionEnd, setSessionEnd ] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      const msg = confirm('Are you sure you want to leave?');
      event.returnValue = '';
      if(msg) {
        new contentSenderObject(socket, {
            [consts.HEADER]:consts.END,
            [consts.CONTENT]:consts.END,
            [consts.ID]:consts.END,
        }).sendContent();
      }else {
        return;
      }
      return '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);


  useEffect(() => {
    if(sessionEnd) {
      new contentSenderObject(socket, {
        [consts.HEADER]:consts.END,
        [consts.CONTENT]:consts.END,
        [consts.ID]:consts.END,
      }).sendContent();
      document.querySelector('body').innerHTML = '<div> Session Ended </div>';
    }

  }, [sessionEnd]);

  if (sessionEnd) {
    return <div>Session Ended</div>;
  }

  return (
    <Provider store={messagesStore}>
      <UsersProvider>
        <WebSocketContextProvider value={{ socket, setSocket, messagesSocket, setMessagesSocket, setSessionEnd }}>
          <WebSocketHandler />
          <div className="root-container">
            <HeaderPane />
            <MainLayout />
          </div>
        </WebSocketContextProvider>
      </UsersProvider>
    </Provider>
  );
}

export default App;
