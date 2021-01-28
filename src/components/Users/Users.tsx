import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { UserType } from '../../types/types';
import { createField, Input, SearchInput } from '../common/FormsControls/FormsControls';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import view from './Users.module.css'

type PropType = {
    totalItemsCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    userSearch: (searchWords: string) => void
    searchWords: string
    isAuth:boolean
}
export type UserSearchFormValuesTypes = {
    searchWords: string
}
type UserSearchFormValuesTypeKeys = Extract<keyof UserSearchFormValuesTypes, string>

const UserSearchForm: React.FC<InjectedFormProps<UserSearchFormValuesTypes>> = (props) => {
    return (<form onSubmit={props.handleSubmit}>
        <div>
            {createField<UserSearchFormValuesTypeKeys>('Search User', 'searchWords', [], SearchInput)}
        </div>
    </form>)
}

const UserSearchReduxForm = reduxForm<UserSearchFormValuesTypes>({
    form: 'userSearch'
})(UserSearchForm)

const Users: React.FC<PropType> = (props) => {
    const onSubmit = (formData: any) => {
        props.userSearch(formData.searchWords)
        props.onPageChanged(1)
    }
    return <div>
        <UserSearchReduxForm onSubmit={onSubmit} />
        <Paginator currentPage={props.currentPage} onPageChanged={props.onPageChanged}
            totalItemsCount={props.totalItemsCount} pageSize={props.pageSize} portionSize={props.portionSize} />
        {
            props.users.map(u =>
                <User key={u.id} user={u}
                    followingInProgress={props.followingInProgress}
                    unfollow={props.unfollow}
                    follow={props.follow}
                     isAuth={props.isAuth}  />)
        }
    </div>
}

export default Users;