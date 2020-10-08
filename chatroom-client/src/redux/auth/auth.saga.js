import { takeLatest, put } from "redux-saga/effects";
import { auth_types } from "./auth.types";
import { fetchData } from "../fetchHttp";
import { authSuccess, authFaliure, checkSessionSuccess, checkSessionFaliure, deleteUserSuccess, deleteUserFaliure } from "./auth.actions";
import {getLocalHost} from '../../getLocalHost';

export function* authenticateStart(){
    yield takeLatest(auth_types.AUTH_START,authenticate);
};

export function* checkSessionInitiate(){
    yield takeLatest(auth_types.CHECK_SESSION_START,checkSession);
}

export function* deleteInit(){
    yield takeLatest(auth_types.DELETE_START,deleteUser);
}

export function* deleteUser({payload:{username,_id}}){
    try {
        const header = yield {'Content-Type':'application/json'};
        const message = yield fetchData(`${getLocalHost()}deleteUser`,{username,_id},header,'delete');
        yield put(deleteUserSuccess(message));
    } catch (error) {
        yield put(deleteUserFaliure(error));
    }
}

export function* authenticate({payload:{username,chatroom,url,history}}){
   try {
    const header = yield {'Content-Type':'application/json'};
    const user = yield fetchData(`${getLocalHost()}joinroom`,{username,chatroom},header,'post');
    yield put(authSuccess(user));
    localStorage.setItem('junChatroomToken',user.token);   
    history.push(`${url}room`);
   } catch (error) {
    yield put(authFaliure(error));
   }
}

export function* checkSession({payload:{bearerHeader}}){
    try {
        const header = yield bearerHeader;
        const user = yield fetchData(`${getLocalHost()}chatroomSession`,{},header,'post');
        if(user){
            localStorage.setItem('junChatroomToken',user.token);   
            yield put(checkSessionSuccess(user));
        }
    } catch (error) {
        yield put(checkSessionFaliure(error));
    }
}

