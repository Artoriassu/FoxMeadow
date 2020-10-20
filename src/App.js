import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import { BrowserRouter, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import LoginPage from './components/Login/Login'
import { initializeApp } from './redux/app-reducer';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { findAllInRenderedTree } from 'react-dom/test-utils';


class App extends React.Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert('Some error occured');
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount(){
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) { return <Preloader /> }

    return (
      <div className='app-wrapper' >
        <HeaderContainer />
        <NavbarContainer />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path="/"
              render={() => <Redirect to={'/profile'} />} />
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
            <Route path="*"
              render={() => <div>404 PAGE NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SocialNetApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SocialNetApp;