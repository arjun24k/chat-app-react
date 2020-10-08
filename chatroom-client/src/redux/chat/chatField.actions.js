import { chatFieldTypes } from "./chatField.types";

export const setField = message =>({
    type:chatFieldTypes.FIELD_VALUE,
    payload:message
})

export const setEntryMessage = message => ({
    type:chatFieldTypes.ENTRY_MESSAGE,
    payload:message
});

export const setOldChats = chatlist => ({
    type:chatFieldTypes.OLD_CHATS,
    payload:chatlist
});

export const toggleDrawer = () =>({
    type:chatFieldTypes.TOGGLE_DRAWER,
    payload:null
})

