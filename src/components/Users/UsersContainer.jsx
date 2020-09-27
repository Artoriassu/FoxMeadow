import {
    follow, unfollow, setCurrentPage, getUsers,
    toggleFollowingProgress
} from '../../redux/usersReducer';
import Users from './Users';
import React from 'react';
import { connect } from 'react-redux';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getAllUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/users-selectors';



class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }
    debugger;
    render() {
        return <>
            {this.props.isFetching ? <Preloader />
                : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }


}

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        /* users: getAllUsers(state), */
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}



export default compose(
    connect(mapStateToProps, {
        follow, unfollow, setCurrentPage, getUsers,
        toggleFollowingProgress
    }),
)(UsersContainer)

/* let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountAC(totalCount));
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingAC(isFetching));
        },
    }
} */