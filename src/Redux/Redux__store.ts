import { createStore, combineReducers, applyMiddleware } from "redux";

import profilePage from "./profileReducer";
import messagePage from "./messageReducer";
import sidebarPage from "./sidebarReducer";
import findUsers from "./findUsersReducer";
import auth from "./authReducer";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./appReducer";

let rootReducers = combineReducers({ profilePage, messagePage, sidebarPage, findUsers, auth, appReducer, form: formReducer });

export type RootReducersType = ReturnType<typeof rootReducers> 

type PropertiesType<T> = T extends { [key in string]: infer U } ? U : never; 
type ActionsType<T extends ()> = T

let store = createStore(rootReducers, applyMiddleware(thunk));
export default store;