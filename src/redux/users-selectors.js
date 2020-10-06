import { createSelector } from 'reselect';

export const getAllUsers = (state) => {
    return state.usersPage.users;
}
export const getUsersSelector = createSelector(getAllUsers, (users) => {
    return users.filter(u => true);
});

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getPortionSize = (state) => {
    return state.usersPage.portionSize;
}
export const gettotalItemsCount = (state) => {
    return state.usersPage.totalItemsCount;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}
