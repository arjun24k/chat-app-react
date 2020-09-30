import { chatFieldTypes } from "./chatField.types";

const CHAT_INITIAL_STATE = {
    chatMessages:[],
};

export const fieldReducer = (state=CHAT_INITIAL_STATE,action)=>{
    switch (action.type) {
        case chatFieldTypes.OLD_CHATS:
            action.payload.forEach(msg=>state.chatMessages.push(msg));
            return {
                ...state
            }
        case chatFieldTypes.FIELD_VALUE:
            return {
                ...state,
                chatMessages:[...state.chatMessages,action.payload]
            };
        case chatFieldTypes.ENTRY_MESSAGE:
            return{
                ...state,
                chatMessages:[...state.chatMessages,action.payload]
            };
        default:
            return {
                ...state
            }
    }
};