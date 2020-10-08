import { loading_type } from "./loading.types";

export const loadStart = (loadStart) => ({
    type:loading_type.LOAD_START,
    payload:loadStart
});

export const loadStop = (loadStop) => ({
    type:loading_type.LOAD_STOP,
    payload:loadStop
});

