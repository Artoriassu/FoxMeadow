import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import { Route, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import LoginPage from './components/Login/Login'
import { initializeApp } from './redux/app-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) { return <Preloader /> }

    return (
      <div className='app-wrapper' >
        <HeaderContainer />
        <NavbarContainer />
        <div className='app-wrapper-content'>
          <Route path="/dialogs"
            render={() => <DialogsContainer />} />
          <Route path="/profile/:userId?"
            render={() => <ProfileContainer />} />
          <Route path="/users"
            render={() => <UsersContainer />} />
          <Route path="/news" />
          <Route path="/music" />
          <Route path="/settings" />
          <Route path="/login"
            render={() => <LoginPage />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);
