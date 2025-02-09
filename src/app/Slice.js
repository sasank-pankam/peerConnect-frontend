import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncDB } from "../utils/AsyncIndexedDB";

/**
 * @typedef  {{ type: number, id: number, content: Object | string, isSender: boolean }} messageType
 */

const storeConfig = {
  name: "messages",
  keyPath: "id",
  indices: {
    name: "id_counter",
    keyPath: ["userId", "id"],
  },
};
const db = new AsyncDB("Message", storeConfig);

window.addEventListener("beforeunload", () => {
  indexedDB.deleteDatabase("Message");
});

export const loadMore = createAsyncThunk(
  "messages/loadMore",
  async ({ userId, id, count }, { rejectWithValue }) => {
    try {
      const messages = await db.getRange([userId, id], [userId, id - count]);
      return { userId, messages };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addMessage = createAsyncThunk(
  "messages/addMessage",
  async ({ userId, message }, { rejectWithValue }) => {
    try {
      await db.add(message);
      return { userId, message };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const slice = createSlice({
  name: "messages and progresses",
  initialState: {
    byUser: {},
    byId: {},
  },
  reducers: {
    invalidateMessages(state, action) {
      const { userId, count } = action.payload;
      state.byUser[userId] = state.byUser[userId]?.slice(count);
    },

    updateProgress(state, action) {
      const { tId, percentage } = action.payload;
      if (!(tId in state.byId))
        state.byId[tId] = {
          tId,
          percentage,
        };
      const prev = state.byId[tId];
      prev.percentage = percentage;
      state.byId[tId] = prev;
    },

    addProgress(state, action) {
      const { tId, precentage, extras } = action.payload;
      state.byId[tId] = {
        tId,
        precentage,
        extras,
      };
    },

    removeProgress(state, action) {
      const { tId } = action.payload;

      delete state.byId[tId];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loadMore
      .addCase(loadMore.pending, (state) => {
        state.error = null;
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        const { userId, messages } = action.payload;
        const prev = state.byUser[userId] || [];
        state.byUser[userId] = [...messages, ...prev];
      })
      .addCase(loadMore.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Handle addMessage
      .addCase(addMessage.pending, (state) => {
        state.error = null;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        const { userId, message } = action.payload;
        if (!state.byUser[userId]) state.byUser[userId] = [];
        if (state.byUser[userId].lenght > 30)
          state.byUser[userId] = state.byUser[userId].slice(10);

        state.byUser[userId].push(message);
      })
      .addCase(addMessage.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  invalidateMessages,
  updateProgress,
  addProgress,
  removeProgress,
} = slice.actions;

export default slice.reducer;
