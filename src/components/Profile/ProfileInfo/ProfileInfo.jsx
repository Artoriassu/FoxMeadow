import React from 'react';
import view from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />
  }
  else {
    return (
      <div>
        <div className={view.description}>
          <img src={props.profile.photos.large} />
          <div>
            Status:  <ProfileStatusWithHooks status={props.status}
              updateStatus={props.updateStatus} />
          </div>
        </div>
      </div>
    )
  }
}



export default ProfileInfo;