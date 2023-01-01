import { createSelector } from "reselect";

export const getUsersSelector = (state) => state.findUsers.users;
export const getUsers = createSelector(getUsersSelector, (userList) => {
    return userList.filter(i => true);
});
export const getPageSize = (state) => state.findUsers.pageSize;
export const getTotalUsers = (state) => state.findUsers.totalUsers;
export const getPage = (state) => state.findUsers.currentPage;
export const getIsLoading = (state) =>  state.findUsers.isLoading;
export const getfollowingInProgress = (state) =>  state.findUsers.followingInProgress;