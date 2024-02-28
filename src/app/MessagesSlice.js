import { createSlice } from "@reduxjs/toolkit";


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
        if(user){
            user.push(newMessage);
        }
        else{
            state.Users[id] =  [newMessage];
        }
        state.Users = {...state.Users};    
    },
    loadMessages: (state, action) => {
        const id = action.payload.ID;
        const messages = action.payload.CONTENT;
        console.log("in loadMessages  -> ", id, messages);
        const user = state.Users[id];
        console.log("user -> ", user);
        
        if(user){
            user.unshift(...messages);
            
        }
        else{
            state.Users[id] =  messages;
        }
        state.Users = {...state.Users};
        console.log('updates messages');
        // state.Users = {...state.Users};
    },
    // addUser: (state, action) => {
    //     const id = action.payload.id;
        
    // },
  },
});
 
export const { appendMF, loadMessages } = messagesSlice.actions;

export default messagesSlice.reducer;