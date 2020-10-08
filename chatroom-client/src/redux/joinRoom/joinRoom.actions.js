import { joinRoom_types } from "./joinRoom.types";

export const initSocket = (socket_obj) =>({
    type:joinRoom_types.SOCKET_INIT,
    payload:socket_obj
});

export const closeSocket = () => ({
    type:joinRoom_types.SOCKET_CLOSE,
    payload:undefined
});