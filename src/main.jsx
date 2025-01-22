// import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { store } from "./app/Store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </StrictMode>
);
