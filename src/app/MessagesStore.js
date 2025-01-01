import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./MessagesSlice";

export const messagesStore = configureStore({
  reducer: messageReducer,
});
