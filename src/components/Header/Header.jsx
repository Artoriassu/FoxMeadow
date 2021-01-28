import React from 'react';
import view from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={view.header}>
      <img className={view.logo} src='https://www.logologo.com/logos/fox-logo.jpg' />
      <div className={view.SiteName}>Fox Meadow</div>
      <div className={view.loginBlock}>
        {props.isAuth 
        ? <div className={view.Logged}> {props.login} - <button onClick={props.logout}>Log out</button> </div>
          : <div>
            <a href="https://social-network.samuraijs.com/signUp" target="_blank">Registration</a>
            <NavLink to={'/login'}>Login </NavLink></div>
            }
      </div>
    </header>
  )
}

export default Header;