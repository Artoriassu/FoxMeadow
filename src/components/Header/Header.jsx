import React from 'react';
import view from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
  return (
    <header className={view.header}>
      <img className={view.logo} src='https://www.logologo.com/logos/fox-logo.jpg' />
      <div className={view.loginBlock}>
        {props.isAuth 
        ? <div> {props.login} - <button onClick={props.logout}>Log out</button> </div>
          : <NavLink to={'/login'}>Login </NavLink>}
      </div>
    </header>
  )
}

export default Header;