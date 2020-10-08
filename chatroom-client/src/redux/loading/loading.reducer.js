import { loading_type } from "./loading.types";

const INITIAL_STATE = {
    isLoading:false
};

export const loadingReducer = (state=INITIAL_STATE,action) =>{
    switch (action.type) {
        case loading_type.LOAD_START:
            return{
                ...state,
                isLoading:action.payload
            }; 
        case loading_type.LOAD_STOP:
            return{
                ...state,
                isLoading:action.payload
            };
        default:
            return{
                ...state
            };
    };
};