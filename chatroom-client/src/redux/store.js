import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./root-saga";
const { createStore, applyMiddleware } = require("redux");
const { default: rootReducer } = require("./root-reducer");

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];
if(process.env.NODE_ENV==='development'){
middlewares.push(logger);
}
const store = createStore(rootReducer,applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export default store;