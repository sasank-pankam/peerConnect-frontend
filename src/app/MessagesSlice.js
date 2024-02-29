import {createSlice} from "@reduxjs/toolkit";
import consts from '../Constants.js';

/* 
    state => 

    {
        Users:{
            id: number -> messages: [
                {
                    content:
                    // time:
                    etc...
                }
            ]
        }
    }
*/

const initialState = {
    Users: {},
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        appendMF: (state, action) => {
            // console.log("appednde a message", action.payload.newMessage, action.payload.id, Math.random());
            const newMessage = action.payload.newMessage;
            const id = action.payload.id;
            const user = state.Users[id];
            if (user) {
                user.push(newMessage);
            } else {
                state.Users[id] = [newMessage];
            }
            state.Users = {...state.Users};
        },
        loadMessages: (state, action) => {
            const id = action.payload.ID;
            const messages = action.payload.CONTENT;
            console.log("in loadMessages  -> ", id, messages);
            const user = state.Users[id];
            console.log("user -> ", user);

            if (user) {
                user.unshift(...messages);

            } else {
                state.Users[id] = messages;
            }
            state.Users = {...state.Users};
            console.log('updates messages');
            // state.Users = {...state.Users};
        },
        acceptedFile: (state, action) => {
            const id = action.payload.id;
            const fileId = action.payload.fileId;
            const messages = state.Users[id];
            state.Users[id] = messages.map((message) => {
                if (message.type === consts.FILE_TYPE && message.id === fileId) {
                    message.accepted = true;
                }
                return message;
            });
            state.Users = {...state.Users};
            // addUser: (state, action) => {
            //     const id = action.payload.id;

            // },
        },
    }
});

export const {appendMF, loadMessages, acceptedFile} = messagesSlice.actions;

export default messagesSlice.reducer;