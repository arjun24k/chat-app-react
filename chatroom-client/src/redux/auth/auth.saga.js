import { takeLatest, put } from "redux-saga/effects";
import { auth_types } from "./auth.types";
import { fetchData } from "../fetchHttp";
import { authSuccess, authFaliure, checkSessionSuccess, checkSessionFaliure } from "./auth.actions";

export function* authenticateStart(){
    yield takeLatest(auth_types.AUTH_START,authenticate);
};

export function* checkSessionInitiate(){
    yield takeLatest(auth_types.CHECK_SESSION_START,checkSession);
}

export function* authenticate({payload:{username,chatroom,url,history}}){
   try {
    const header = yield {'Content-Type':'application/json'};
    const user = yield fetchData('/joinroom',{username,chatroom},header);
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
        const user = yield fetchData('/chatroomSession',{},header);
        yield put(checkSessionSuccess(user));
    } catch (error) {
        yield put(checkSessionFaliure(error));
    }
}