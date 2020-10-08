import { combineReducers } from "redux";
import { fieldReducer } from "./chat/chatField.reducer";
import { joinRoomReducer } from "./joinRoom/joinRoom.reducer";
import { authReducer } from "./auth/auth.reducer";
import { participantReducer } from "./participants/participants.reducer";
import { loadingReducer } from "./loading/loading.reducer";

export default combineReducers({
    chat:fieldReducer,
    getSocketObj:joinRoomReducer,
    authStart:authReducer,
    getParticipants:participantReducer,
    loadingState:loadingReducer
});