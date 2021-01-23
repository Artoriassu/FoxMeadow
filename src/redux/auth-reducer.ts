import { FormAction, stopSubmit } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { resultCodesEnum, resultCodeForCaptcha } from './../api/api';
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";
import { Dispatch } from 'redux';


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null,
};

const authReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'auth/SET-USER-DATA':
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}


export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'auth/SET-USER-DATA', payload: { userId, email, login, isAuth } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) =>
        ({ type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl } } as const),
}


export const getAuthUserData = (): ThunkType => async (dispatch: Dispatch<ActionsType>) => {
    let response = await authAPI.me();
    if (response.data.resultCode === resultCodesEnum.Success) {
        let { id, email, login } = response.data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === resultCodesEnum.Success) {
        dispatch(getAuthUserData());
    }
    else {
        if (response.data.resultCode === resultCodeForCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch: any) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}
export const logout = (): ThunkType => async (dispatch: any) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;


export type initialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>