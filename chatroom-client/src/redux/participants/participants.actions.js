import { participant_types } from "./participants.types";

export const setParticipants = (participants) => ({
    type:participant_types.SET_PARTICIPANT_LIST,
    payload:participants
});