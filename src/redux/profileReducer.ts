import { BaseThunkType, InferActionsTypes } from './redux-store';
import { postsDataType, profileType, PhotosType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { profileAPI } from "../api/profile-api";

let initialState = {
    posts_Data: [
        { id: 1, counter: 0, message: 'Hi' },
        { id: 2, counter: 0, message: 'I`m here.' },
        { id: 3, counter: 0, message: 'Hey?' },
        { id: 4, counter: 0, message: 'Do you hear me?' },
        { id: 5, counter: 0, message: '...' },
        { id: 6, counter: 0, message: '...' },
        { id: 7, counter: 1, message: 'I`m waiting...' },
    ] as Array<postsDataType>,
    profile: null as profileType | null,
    status: ``,
    newPostText: ``
};

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'profile/ADD-POST': {
            let messageBody = action.newPostText;
            return {
                ...state,
                posts_Data: [...state.posts_Data, { id: 8, message: messageBody, counter: 0 }],
            }
        }
        case 'profile/SET_USER_PROFILE': {
            return {
                ...state, profile: action.profile,
            }
        }
        case 'profile/SET_STATUS': {
            return {
                ...state, status: action.status,
            }
        }
        case 'profile/DELETE_POST': {
            return {
                ...state, posts_Data: state.posts_Data.filter(p => p.id != action.id)
            }
        }
        case 'profile/SAVE_PHOTO_SUCCESS': {
            return {
                ...state, profile: { ...state.profile, photos: action.photos } as profileType
            }
        }
        default:
            return state;
    }
}

export const actions = {
    addPost_actionCreator: (newPostText: string) => ({ type: 'profile/ADD-POST', newPostText } as const),
    setUserProfile: (profile: profileType) => ({ type: 'profile/SET_USER_PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'profile/SET_STATUS', status } as const),
    deletePost: (id: number) => ({ type: 'profile/DELETE_POST', id } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'profile/SAVE_PHOTO_SUCCESS', photos } as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: profileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileAPI.saveProfile(profile);

    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId));
        }
        else {
            throw new Error("UserId can not be null")
        }

    }
    else {

        dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
}
export default profileReducer;

export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>