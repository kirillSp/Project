import { ResultCodeEnum, usersAPI } from "../API/API"
import { updateStateButton } from "../Util/WrapperReducer/WrapperReducer";
import { PhotoType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { RootReducersType } from "./Redux__store";
import { Dispatch } from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS"
const CURRENT_PAGE = "CURRENT-PAGE";
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING";
const TOGGLE_IN_PROGRESS = "TOGGLE-IN-PROGRESS";

export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotoType
};

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 3,
    totalUsers: 40,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>,
};

type initialStateType = typeof initialState;

let findUsersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateStateButton(state.users, action.userId, 'id', { followed: false })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateStateButton(state.users, action.userId, 'id', { followed: true })
            };

        case SET_USERS:
            return { ...state, users: action.getUsers.map((item: any) => item) }; // Problem!!

        case CURRENT_PAGE:
            return { ...state, currentPage: action.numPage };

        case TOGGLE_IS_LOADING:
            return { ...state, isLoading: action.getToggleLoading }

        case TOGGLE_IN_PROGRESS:
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

export const actions = {
    followAC: (userId: number) => ({ type: "FOLLOW", userId }),
    unfollowAC: (userId: number) => ({ type: "UNFOLLOW", userId }),
    setStateAC: (getUsers: Array<UsersType>) => ({ type: "SET-USERS", getUsers }),
    currentPageAC: (numPage: number) => ({ type: "CURRENT-PAGE", numPage }),
    toggleIsLoadingAC: (getToggleLoading: boolean) => ({ type: "TOGGLE-IS-LOADING", getToggleLoading }),
    toggleInProgress: (toggleInProgress: boolean, userId: number) => ({ type: "TOGGLE-IN-PROGRESS", toggleInProgress, userId }),
};

type ActionsTypes = any;
type ThunkType = ThunkAction<Promise<void>, RootReducersType, unknown, ActionsTypes>;


export let getDataUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(actions.currentPageAC(currentPage));
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(actions.toggleIsLoadingAC(false));
    dispatch(actions.setStateAC(response.items));
};

let followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, id: number, responseToggle: any, getToggleAC: (id: number) => any) => {
    dispatch(actions.toggleInProgress(true, id));
    let response = await responseToggle(id);

    if (response.data.resultCode === ResultCodeEnum.success) dispatch(getToggleAC(id));
    dispatch(actions.toggleInProgress(false, id));
}

export const follow = (id: number): ThunkType => async (dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.follow.bind(usersAPI), actions.followAC)
};

export const unfollow = (id: number): ThunkType => async (dispatch) => {
    followUnfollowFlow(dispatch, id, usersAPI.unfollow.bind(usersAPI), actions.unfollowAC);
};

export default findUsersReducer;