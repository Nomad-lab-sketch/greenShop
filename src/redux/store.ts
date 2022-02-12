import {applyMiddleware, combineReducers, createStore} from "redux";
import loginReducer from "./reducers/login-reducer";
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
const reducers = combineReducers({
    loginCatalog: loginReducer
})

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends{[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;


