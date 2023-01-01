import { createStore, combineReducers, applyMiddleware } from "redux";

import profilePage from "./profileReducer";
import messagePage from "./messageReducer";
import sidebarPage from "./sidebarReducer";
import findUsers from "./findUsersReducer";
import auth from "./authReducer";
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./appReducer";

let reducers = combineReducers({ profilePage, messagePage, sidebarPage, findUsers, auth, appReducer, form: formReducer });
let store = createStore(reducers, applyMiddleware(thunk));

export default store;