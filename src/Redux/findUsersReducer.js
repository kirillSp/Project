import { usersAPI } from "../API/API"
import { updateStateButton } from "../Util/WrapperReducer/WrapperReducer";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsers: 40,
    currentPage: 1,
    isLoading: false,
    followingInProgress: []
};

let findUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateStateButton(state.users, action.userId, 'id', { followed: false })
            };

        case "UNFOLLOW":
            return {
                ...state,
                users: updateStateButton(state.users, action.userId, 'id', { followed: true })
            };

        case "SET_USERS":
            return { ...state, users: action.getUsers.map(item => item) };
            
        case "CURRENT_PAGE":
            return { ...state, currentPage: action.numPage };
        
        case "TOGGLE_IS_LOADING":
            return { ...state, isLoading: action.getToggleLoading }

        case "TOGGLE_IN_PROGRESS":
            return {
                ...state,
                followingInProgress: action.toggleInProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(users => users !== action.userId)
            }

        default:
            return state
    }
};

export let followAC = (userId) => ({ type: "FOLLOW", userId });
export let unfollowAC = (userId) => ({ type: "UNFOLLOW", userId });
export let setStateAC = (getUsers) => ({ type: "SET_USERS", getUsers });
export let currentPageAC = (numPage) => ({ type: "CURRENT_PAGE", numPage });
export let toggleIsLoadingAC = (getToggleLoading) => ({ type: "TOGGLE_IS_LOADING", getToggleLoading });
export let toggleInProgress = (toggleInProgress, userId) => ({ type: "TOGGLE_IN_PROGRESS", toggleInProgress, userId });

export let getDataUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsLoadingAC(true));
    dispatch(currentPageAC(currentPage));

    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsLoadingAC(false));
    dispatch(setStateAC(response.items));

};

let followUnfollowFlow = async (dispatch, id, responseToggle, getToggleAC) => {
    dispatch(toggleInProgress(true, id));
    let response = await responseToggle(id);

    if (response.data.resultCode === 0) dispatch(getToggleAC(id));
    dispatch(toggleInProgress(false, id));
}

export const follow = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), followAC)
};

export const unfollow = (id) => async (dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), unfollowAC);
};

export default findUsersReducer;