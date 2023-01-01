import { authUser } from "./authReducer";

let initinalState = {
    initialized: false
};

let appReducer = (state = initinalState, action) => {
    switch (action.type) {
        case "INITIALIZED":
            return { ...state, initialized: true };
        default:
            return state;
    }
}


export let initializedSuccessApp = () => ({ type: "INITIALIZED" });
export let initinalApp = () => (dispatch) => {
    let promise = dispatch(authUser());

    Promise.all([promise]).then(() => {
        dispatch(initializedSuccessApp())
    });
}

export default appReducer;