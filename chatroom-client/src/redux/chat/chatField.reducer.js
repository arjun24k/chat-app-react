import { auth_types } from "../auth/auth.types";
import { chatFieldTypes } from "./chatField.types";

const CHAT_INITIAL_STATE = {
    chatMessages:[],
    "showDrawer":false
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
        case chatFieldTypes.TOGGLE_DRAWER:
            return {
                ...state,
                "showDrawer":!state.showDrawer
            };
        case auth_types.CLEAR_USER:
            return {
                ...state,
                chatMessages:[],
                "showDrawer":false
            };
        default:
            return {
                ...state
            }
    }
};