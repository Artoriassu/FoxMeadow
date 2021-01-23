import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profileReducer';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { profileType } from '../../types/types';

type MapStatePropsType = {
  profile: profileType | null
  status: string
  authorizedUserId: number | null
  isAuth: boolean
}
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getStatus: (userId: number) => void
  savePhoto: (file: any) => void
  updateStatus: (status: string) => void 
  saveProfile: (profile: profileType) => void
}
type OwnPropsType = {
  match: any
  history: any
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps : any, prevState: any, snapshot: any) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} isOwner={!this.props.match.params.userId}
        status={this.props.status} updateStatus={this.props.updateStatus} 
        savePhoto={this.props.savePhoto}/>
    )
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth

})

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile  }),
  withRouter,
)(ProfileContainer);