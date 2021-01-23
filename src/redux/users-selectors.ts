import { createSelector } from 'reselect';
import { AppStateType } from './redux-store';

const UsersSearchWordSelector = (state: AppStateType) => state.usersPage.searchWords

export const getAllUsers = (state: AppStateType) => {
    return state.usersPage.users;
}
export const getSearchWords = (state: AppStateType) => {
    return state.usersPage.searchWords;
}
export const getUsersSelector = createSelector(getAllUsers,
    (users) => {
        return users.filter(u => true);
    });
export const getSearchedUsers = createSelector(getAllUsers, UsersSearchWordSelector,
    (users, searchWords) => {
        if (!!searchWords && searchWords.length != 0)
            return users.filter(user => user.name.includes(searchWords));
        else
            return users.filter(u => true);
    });
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getPortionSize = (state: AppStateType) => {
    return state.usersPage.portionSize;
}
export const gettotalItemsCount = (state: AppStateType) => {
    return state.usersPage.totalItemsCount;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress;
}
