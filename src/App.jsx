import React, { useState, useEffect, useContext } from "react";
import MainLayout from "./components/MainLayout";
import { WebSocketContextProvider } from "./contexts/WebSocketContextProvider";
import HeaderPane from "./components/HeaderPaneDev";
// import HeaderPane from "./components/HeaderPane";
import WebSocketHandler from "./components/WebSocketHandler";
import { Provider } from "react-redux";
import { messagesStore } from "./app/MessagesStore";
import { UsersProvider } from "./contexts/UsersContextProvider.jsx";

function App() {
  const [socket, setSocket] = useState(null);
  const [messagesSocket, setMessagesSocket] = useState(null);
  return (
    <Provider store={messagesStore}>
      <UsersProvider>
        <WebSocketContextProvider value={{ socket, setSocket, messagesSocket, setMessagesSocket }}>
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
