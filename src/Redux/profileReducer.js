import { profileAPI, usersAPI } from "../API/API";

const ADD_POST = "ADD-POST";
const SET_USER = "SET-USER";

let initialState = {
    postsData: [
        { id: 1, message: "Post 1", likesCount: 10, path: "http://www.clker.com/cliparts/R/S/Z/4/t/f/crossed-hammers-bw-100x100-md.png" },
        { id: 1, message: "Post 2", likesCount: 5, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjpT0a-IGi_4HMzlGEbc0Vd9WQCj6i2EMqg&usqp=CAU" },
        { id: 1, message: "Post 3", likesCount: 100, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSr2BXBAn41QkNQkwtxwr4vMLR7NytIIxHwCejVT5OhIFmxqyJA2o4Qxa43CJqL6Uiuv0&usqp=CAU" },
        { id: 1, message: "Post 4", likesCount: 30, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Zu7qrFjoQ_WmGjqTNz-CVZrljJnxbmrFGS7Vx-62zerLxMrKI6lMG0mWMgcu9nb5I_8&usqp=CAU" },
    ],

    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {
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
                profile: { ...state.profile, photos: { ...state.profile.photos, large: action.photo, small: action.photo } }
            }

        default:
            return state;
    }
};

export const dataProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.profile(userId)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const updateImgProfile = (photo) => async (dispatch) => {
    let response = await profileAPI.sendPhoto(photo);

    if (response.data.resultCode === 0) {
        dispatch(setPhotoAC(response.data.data.photos.small))
    }

}

export const ADD_POST_ACTION_CREATER = (formData) => ({ type: ADD_POST, formData });
export const setUserProfile = (getDataProfile) => ({ type: SET_USER, getDataProfile });
export const setStatus = (getStatus) => ({ type: "SET-STATUS", getStatus });
export const setPhotoAC = (photo) => ({ type: "SET-PHOTO", photo })

export default profileReducer; 