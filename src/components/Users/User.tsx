import React from 'react';
import view from './Users.module.css';
import userPhoto from '../../assets/f1.jpeg'
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isAuth: boolean
}
let User: React.FC<PropType> = (props) => {
    let user = props.user;
    return <div className={view.item}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto} />
            </NavLink>
        </div>

        <div>
            <div className={view.NameForm}>Name: <a className={view.Name}>{user.name}</a></div>
            <div className={view.status}>
                <span>Status : <a className={view.stat}>{user.status} </a></span>
            </div>
            <div className={view.FolButton}>
               {props.isAuth ?
                  (  user.followed
                    ? <button className={view.itemFollowButton} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                        props.unfollow(user.id);
                    }}>Unfollow</button>
                    : <button className={view.itemFollowButton} disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                        props.follow(user.id);
                    }}>Follow</button>)
                : null
               }
            </div>
        </div>
    </div>
}

export default User;