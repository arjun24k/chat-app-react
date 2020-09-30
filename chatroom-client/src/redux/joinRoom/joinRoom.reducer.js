import { joinRoom_types } from "./joinRoom.types";

const INIT_VALUE = {
    socket:undefined
};

export const joinRoomReducer = (state=INIT_VALUE,action) =>{
    switch (action.type) {
        case joinRoom_types.SOCKET_INIT:
            return {
                ...state,
                socket:action.payload
            }    
        default:
            return {
                ...state
            }
    }
}