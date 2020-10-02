import React from 'react';
import view from './Users.module.css';
import userPhoto from '../../assets/f1.jpeg'
import { NavLink } from 'react-router-dom';

let User = (props) => {
    let user = props.user;
    return <div className={view.item}>
        <div>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : userPhoto} />
            </NavLink>
        </div>
        {user.name}
        <div>
            {user.followed
                ? <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                    props.unfollow(user.id);
                }}>Unfollow</button>
                : <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                    props.follow(user.id);
                }}>Follow</button>}
        </div>
        <div>
            <span>Status : {user.status}</span>
        </div>
    </div>
}

export default User;