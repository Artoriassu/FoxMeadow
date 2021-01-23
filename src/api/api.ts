import axios from 'axios';
import { follow } from '../redux/usersReducer';
import { profileType, UserType } from '../types/types';

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '6a3a9973-6a76-4f80-b3dc-07dc549eada4'
    }
});

export enum resultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum resultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type ResponseType<D = {}, RC = resultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}