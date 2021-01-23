import { UserType } from './../types/types';
import { usersAPI } from "../api/users-api";
import { updateObjectInArray } from "../utils/object-helpers";
import { AppStateType, InferActionsTypes, BaseThunkType } from './redux-store';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalItemsCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of user`s id`s
    portionSize: 10,
    searchWords: ""
};

const usersReducer = (state = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {
        case "users/FOLLOW":
            {
                return {
                    ...state,
                    users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
                }
            }
        case "users/UNFOLLOW":
            {
                return {
                    ...state,
                    users: updateObjectInArray(state.users, action.userId,
                        'id', { followed: false })
                }
            }
        case "users/SET_USERS":
            {
                return {
                    ...state,
                    users: action.users
                }
            }
        case "users/SET_CURRENT_PAGE":
            {
                return {
                    ...state,
                    currentPage: action.currentPage,
                }
            }
        case "users/SET_TOTAL_USERS_COUNT":
            {
                return {
                    ...state,
                    totalItemsCount: action.count,
                }
            }
        case "users/TOGGLE_IS_FETCHING":
            {
                return {
                    ...state,
                    isFetching: action.isFetching,
                }
            }
        case "users/USER_SEARCH":
            {
                return {
                    ...state,
                    searchWords: action.searchWords,
                }
            }
        default:
            return state;
    }
}


export const actions = {
    followSuccess: (userId: number) => ({ type: "users/FOLLOW", userId } as const),
    unfollowSuccess: (userId: number) => ({ type: "users/UNFOLLOW", userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: "users/SET_USERS", users } as const),
    setCurrentPage: (currentPage: number) => ({ type: "users/SET_CURRENT_PAGE", currentPage } as const),
    settotalItemsCount: (totalItemsCount: number) => ({ type: "users/SET_TOTAL_USERS_COUNT", count: totalItemsCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: "users/TOGGLE_IS_FETCHING", isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: "users/TOGGLE_IS_FETCHING", isFetching, userId } as const),
    userSearch: (searchWords: string) => ({ type: "users/USER_SEARCH", searchWords } as const)
}

export const getUsers = (currentPage: number, pageSize: number
    , searchWords: string | undefined): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {

        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(currentPage));
        let searchWords = getState().usersPage.searchWords
        let data = await usersAPI.getUsers(currentPage, pageSize, searchWords);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.settotalItemsCount(data.totalCount));
    }
}
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}
export const follow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess);
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess);
    }
}

export default usersReducer;

type initialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>