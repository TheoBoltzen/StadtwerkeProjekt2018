import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import rootReducer from "../redux/reducers";

const loggerMiddleware = createLogger()

export const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)
