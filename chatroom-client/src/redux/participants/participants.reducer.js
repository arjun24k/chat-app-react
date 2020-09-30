import { participant_types } from "./participants.types";

const INITIAL_PARTICIPANTS = {
    participants:undefined
};

export const participantReducer = (state=INITIAL_PARTICIPANTS,action) =>{
    switch (action.type) {
        case participant_types.SET_PARTICIPANT_LIST:
            return {
                ...state,
                participants:action.payload
            } 
        default:
            return {
                ...state
            }
    }
}