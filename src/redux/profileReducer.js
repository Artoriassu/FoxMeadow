import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';
let initialState = {
    posts_Data: [
        { id: 1, counter: 0, message: 'Hi' },
        { id: 2, counter: 0, message: 'I`m here.' },
        { id: 3, counter: 0, message: 'Hey?' },
        { id: 4, counter: 0, message: 'Do you hear me?' },
        { id: 5, counter: 0, message: '...' },
        { id: 6, counter: 0, message: '...' },
        { id: 7, counter: 1, message: 'I`m waiting...' },
    ],
    profile: null,
    status: ``,
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let messageBody = action.newPostText;
            return {
                ...state,
                posts_Data: [...state.posts_Data, { id: 8, message: messageBody, counter: 0 }],
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile,
            }
        }
        case SET_STATUS: {
            return {
                ...state, status: action.status,
            }
        }
        case DELETE_POST: {
            return {
                ...state, posts_Data: state.posts_Data.filter(p => p.id != action.id)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: { ...state.profile, photos: action.photos }
            }
        }
        default:
            return state;
    }
}


export const addPost_actionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (id) => ({ type: DELETE_POST, id })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
   const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
  
    if (response.data.resultCode === 0) {
       dispatch(getUserProfile(userId));
    }
    else {
        
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0]);
    }
}
export default profileReducer;