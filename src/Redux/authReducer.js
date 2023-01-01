import { authAPI } from "../API/API";
import { stopSubmit } from "redux-form";

let initinalState = {
    id: null,
    login: null,
    email: null,
    isAuth: false
};


let authReducer = (state = initinalState, action) => {
    switch (action.type) {
        case "AUTH-USER":
            return {
                ...state,
                ...action.getDataAuth,
            }
        default:
            return state;
    };
};

export let authUser = () => async (dispatch) => {
    let response = await authAPI.auth();

    if (!response.data.resultCode) {
        let { id, login, email } = response.data.data;
        dispatch(authAC(id, login, email, true));
    }

};

export const login = (login, password, remmemberMe) => async (dispatch) => {
    let response = await authAPI.login(login, password, remmemberMe);

    if (response.data.resultCode === 0) {
        dispatch(authUser());
    } else {
        let responseMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("loginUser", { _error: responseMessage }));
    }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(authAC(null, null, null, false));
    }
}

export default authReducer;
export let authAC = (id, login, email, isAuth) => ({ type: "AUTH-USER", getDataAuth: { id, login, email, isAuth } });