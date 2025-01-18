import { createSlice } from "@reduxjs/toolkit";
import { AsyncDB } from "../utils/AsyncIndexedDB";

const storeConfig = {
  name: "messages",
  keyPath: "messageId",
  indices: {
    name: "id_counter",
    keyPath: ["userId", "identifier"],
  },
};
const db = new AsyncDB("Message", storeConfig);
const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    byUser: {},
    loading: false,
    error: null,
  },
  reducers: {
    async loadMore(state, action) {
      const { userId, identifier, count } = action.payload;
      const messages = await db.getRange(
        [userId, identifier],
        [userId, identifier - count],
      );
      const prev = state.byUser[userId] | [];
      const curr = [...messages, ...prev];
      state.byUser[userId] = curr;
    },
    async addMessage(state, action) {
      const { userId, message } = action.payload;
      if (!state.byUser[userId]) state.byUser[userId] = [];
      state.byUser[userId].push(message);
      await db.add(message);
    },
    invalidateMessages(state, action) {
      const { userId, count } = action.payload;

      state.byUser[userId] = state.byUser[userId].slice(count);
    },
  },
});

export const { loadMore, addMessage, invalidateMessages } =
  messagesSlice.actions;
export default messagesSlice.reducer;
