import { AxiosPromise } from "axios";
import { GetItemsType, instance,ResponseType } from "./api";

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, searchWords = "") {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${searchWords}`)
            .then(response => {
                return response.data
            });
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<ResponseType>
    },
}