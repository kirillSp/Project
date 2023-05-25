import { authUser } from "./authReducer";

const INITIALIZED = "INITIALIZED";

type initialStateType = {
    initialized: boolean
}

let initinalState: initialStateType = {
    initialized: false
};

let appReducer = (state = initinalState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED:
            return { ...state, initialized: true };
        default:
            return state;
    }
}


export let initinalApp = () => (dispatch: any) => {
    let promise = dispatch(authUser());

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccessApp())
    });
}

type initializedSuccessAppType = { type: typeof INITIALIZED }

export let initializedSuccessApp = (): initializedSuccessAppType => ({ type: "INITIALIZED" });
export default appReducer;