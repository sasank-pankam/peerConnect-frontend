// import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { messagesStore } from "./app/MessagesStore.js";
import { Provider } from "react-redux";
import { UsersProvider } from "./contexts/UsersContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={messagesStore}>
    <UsersProvider>
      <App />
    </UsersProvider>
  </Provider>,
  // {/* </StrictMode> */}
);
