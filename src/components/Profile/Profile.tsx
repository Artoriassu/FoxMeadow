import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { profileType } from '../../types/types';

type PropsType = {
  profile: profileType | null
  isOwner: boolean
  savePhoto: (file: any) => void
  status: string
  updateStatus: (status: string) => void 
  saveProfile: (profile: profileType) => void
}
const Profile: React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo profile={props.profile} isOwner={props.isOwner}
        savePhoto={props.savePhoto} status={props.status}
        updateStatus={props.updateStatus} saveProfile={props.saveProfile} />
      <MyPostsContainer />
    </div>
  )
}

export default Profile;