import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
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
                ...state,
                profile: action.profile,
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        case DELETE_POST: {
            return {
                ...state, posts_Data: state.posts_Data.filter(p => p.id != action.id)
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

export default profileReducer;