import { instance, resultCodeForCaptcha, resultCodesEnum, ResponseType } from "./api";


type meResponseDataType = {
    id: number
    email: string
    login: string
}

type loginResponseDataType = {
    userId: number

}

export const authAPI = {
    me() {
        return instance.get<ResponseType<meResponseDataType>>(`auth/me`);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<loginResponseDataType, resultCodesEnum | resultCodeForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}