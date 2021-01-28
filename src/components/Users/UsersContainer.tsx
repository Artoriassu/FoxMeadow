import {
    follow, unfollow, getUsers, actions,
} from '../../redux/usersReducer';
import Users from './Users';
import React from 'react';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getAuth, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPortionSize, getSearchedUsers, getSearchWords, gettotalItemsCount, getUsersSelector } from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalItemsCount: number
    users: Array<UserType>
    portionSize: number
    followingInProgress: Array<number>
    searchWords: string
    isAuth:boolean
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number, searchWords: string ) => void
    userSearch: (searchWords: string) => void
}
type OwnPropsType = {
    pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize,searchWords } = this.props;
        this.props.getUsers(currentPage, pageSize, searchWords);
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize, searchWords } = this.props;
        this.props.getUsers(pageNumber, pageSize, searchWords);
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader />
                : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
                portionSize={this.props.portionSize}
                userSearch={this.props.userSearch}
                searchWords={this.props.searchWords}
                isAuth={this.props.isAuth}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalItemsCount: gettotalItemsCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state),
        searchWords: getSearchWords(state),
        isAuth: getAuth(state),
    }
}

export default compose(
    //<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, 
        {follow, unfollow, /* setCurrentPage */ getUsers, userSearch: actions.userSearch,
        /* toggleFollowingProgress */
    }),
)(UsersContainer)