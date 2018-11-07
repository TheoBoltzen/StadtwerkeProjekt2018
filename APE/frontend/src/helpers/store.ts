import {createLogger} from "redux-logger";
import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'

const loggerMiddleware = createLogger()

export const store = createStore(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
)
