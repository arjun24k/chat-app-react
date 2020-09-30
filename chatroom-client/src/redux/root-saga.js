import { authenticateStart, checkSessionInitiate } from './auth/auth.saga';

const {all,call}=require('redux-saga/effects')

export default function* rootSaga(){
    yield all([
        call(authenticateStart),
        call(checkSessionInitiate)
    ]);
};