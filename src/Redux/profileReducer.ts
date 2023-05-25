import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../API/API";
import { PhotoType } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER = "SET-USER";
const SET_STATUS = "SET-STATUS";
const SET_PHOTO = "SET-PHOTO";

type PostDataType = {
    id: number
    message: string
    likesCount: number
    path: string
};

type ContactsType = {
    skype: string
    vk: string
    facebook: string
    icq: string,
    email: string,
    googlePlus: string,
    twitter: string,
    instagram: string,
    whatsApp: string

};

export type ProfileType = {
    aboutMe: string | null
    contacts: ContactsType
    lookingForAJob: boolean 
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number| null
    photos: null | PhotoType 
};

let initialState = {
    postsData: [
        { id: 1, message: "Post 1", likesCount: 10, path: "http://www.clker.com/cliparts/R/S/Z/4/t/f/crossed-hammers-bw-100x100-md.png" },
        { id: 1, message: "Post 2", likesCount: 5, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjpT0a-IGi_4HMzlGEbc0Vd9WQCj6i2EMqg&usqp=CAU" },
        { id: 1, message: "Post 3", likesCount: 100, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSr2BXBAn41QkNQkwtxwr4vMLR7NytIIxHwCejVT5OhIFmxqyJA2o4Qxa43CJqL6Uiuv0&usqp=CAU" },
        { id: 1, message: "Post 4", likesCount: 30, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Zu7qrFjoQ_WmGjqTNz-CVZrljJnxbmrFGS7Vx-62zerLxMrKI6lMG0mWMgcu9nb5I_8&usqp=CAU" },
    ] as Array<PostDataType>,

    profile: null as ProfileType | null,
    status: "",
};

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case "ADD-POST":
            return {
                ...state,
                // message: action.formData.profileMessage
                postsData: [...state.postsData, { id: 1, message: action.formData.profileMessage, likesCount: 10, path: "http://www.clker.com/cliparts/R/S/Z/4/t/f/crossed-hammers-bw-100x100-md.png" }],
            };

        case "SET-USER":
            return {
                ...state,
                profile: action.getDataProfile
            };

        case "SET-STATUS":
            return {
                ...state,
                status: action.getStatus
            };

        case "SET-PHOTO":
            return {
                ...state,
                profile: { ...state.profile, photos: { ...state.profile, large: action.photo, small: action.photo } } as ProfileType
            }

        default:
            return state;
    }
};

export const dataProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.profile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const updateImgProfile = (photo: any) => async (dispatch: any) => {
    let response = await profileAPI.sendPhoto(photo);

    if (response.data.resultCode === 0) {
        dispatch(setPhotoAC(response.data.data.photos.small));
    }
};

export const updateDataProfile = (data: ProfileType) => async (dispatch: any, getState: any) => {
    let userId = getState().auth.id;
    let response = await profileAPI.sendUpdatedDataProfile(data);

    if (response.data.resultCode === 0) {
        dispatch(dataProfile(userId));
    } else {
        dispatch(stopSubmit("ProfileDataForm", { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}

type AddPostActionType = { type: typeof ADD_POST, formData: string }
export const ADD_POST_ACTION_CREATER = (formData: string): AddPostActionType => ({ type: ADD_POST, formData });

type setUserProfileType = { type: typeof SET_USER, getDataProfile: ProfileType };
export const setUserProfile = (getDataProfile: ProfileType): setUserProfileType => ({ type: SET_USER, getDataProfile });

type setStatusType = { type: typeof SET_STATUS, getStatus: string }
export const setStatus = (getStatus: string): setStatusType => ({ type: "SET-STATUS", getStatus });

type setPhotoType = { type: typeof SET_PHOTO, photo: PhotoType }
export const setPhotoAC = (photo: PhotoType): setPhotoType => ({ type: "SET-PHOTO", photo })

export default profileReducer; 