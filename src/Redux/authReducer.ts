import { ResultCodeEnum, authAPI, securityAPI } from "../API/API";
import { stopSubmit } from "redux-form";

const AUTH_USER = "AUTH-USER";
const GET_CAPTCHA_URL_SUCCESS = "GET-CAPTCHA-URL-SUCCESS";

let initinalState = {
        id: null as null | number,
        login: null as null | string,
        email: null as null | string,
        isAuth: false as boolean,
        captchaUrl: undefined as undefined | string
    };

type InitialStateType = typeof initinalState ;

let authReducer = (state = initinalState, action: any): InitialStateType => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                ...action.getDataAuth,
                a: "s" 
            }

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.payload 
            }

        default:
            return state;
    };
};

export let authUser = () => async (dispatch: any) => {
    let response = await authAPI.auth();

    if (!response.data.resultCode) {
        let { id, login, email } = response.data.data;
        dispatch(authAC(id, login, email, true));
    }

};

export const login = (login: string, password: string, remmemberMe: boolean, captcha: undefined | string = undefined) => async (dispatch: any) => {
    let response = await authAPI.login(login, password, remmemberMe, captcha);

    if (response.data.resultCode === ResultCodeEnum.success) {
        dispatch(authUser());
    } else {
        if (response.data.resultCode === ResultCodeEnum.error) dispatch(getCaptchaUrl())
        let responseMessage = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("loginUser", { _error: responseMessage }));
    }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
    let response = await securityAPI.getCaptcha();
    let captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(authAC(null, null, null, false));
    }
}

type getDataAuthType = {
    id: number | null;
    login: string | null;
    email: string | null;
    isAuth: boolean;
};

type authACType = {
    type: typeof AUTH_USER;
    getDataAuth: getDataAuthType;
};

export let authAC = (id: number | null, login: string | null, email: string | null, isAuth: boolean): authACType => {
    return { type: "AUTH-USER", getDataAuth: { id, login, email, isAuth } }
}

type getCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS;
    payload: string
};

export let getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessType => ({type: "GET-CAPTCHA-URL-SUCCESS", payload: captchaUrl})
export default authReducer;