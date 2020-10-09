import { auth_types } from "./auth.types";

const INITIAL_USER_DATA = {
    user:undefined,
    error:null,
    userInput:undefined,
    bearer:undefined,
    Userdeleted:undefined
};

export const authReducer = (state=INITIAL_USER_DATA,action) =>{
    switch (action.type) {
        case auth_types.AUTH_START:
            return{
                ...state,
                user:action.payload,
                userInput:action.payload,
            };
        case auth_types.CHECK_SESSION_START:
            return{
                ...state,
                bearer:action.payload
            };
        case auth_types.AUTH_SUCCESS:
            return{
                ...state,
                user:action.payload,
                };
        case auth_types.CHECK_SESSION_SUCCESS:
            return {
                user:action.payload,
                userInput:{
                    "username":action.payload.user.username,
                    "chatroom":action.payload.user.chatroom,
                    }
                };
        case auth_types.AUTH_FALIURE:
            case auth_types.CHECK_SESSION_FALIURE:
                case auth_types.DELETE_FALIURE:
            return{
                ...state,
                error:action.payload,
            };
        case auth_types.CLEAR_USER:
            return {
                ...state,
                "bearer":undefined,
                "user":undefined,
            };
        case auth_types.DELETE_SUCCESS:
            return{
                ...state,
                "Userdeleted":action.payload
            };
        default:
            return{
                ...state
            };
    };
};