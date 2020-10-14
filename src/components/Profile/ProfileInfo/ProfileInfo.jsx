import React, { useState } from 'react';
import view from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import standartPhoto from '../../../assets/f1.jpeg';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }
  else {
    const onMainPhotoSelected = (e) => {
      if (e.target.files.length) {
        props.savePhoto(e.target.files[0]);
      }
    }
    const onSubmit = (formdata) => {
      props.saveProfile(formdata).then(() => {
        setEditMode(false);
      });
    }
    return (
      <div className={view.description}>
        <img src={props.profile.photos.large || standartPhoto} className={view.mainPhoto} />
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected} />}
        {editMode
          ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
          : <ProfileData profile={props.profile} isOwner={props.isOwner}
            goToEditMode={() => { setEditMode(true) }} />}
        <ProfileStatusWithHooks status={props.status}
          updateStatus={props.updateStatus} />
      </div>
    )
  }
}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
    <div><b>Full name</b>: {profile.fullName}</div>
    <div><b>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</b></div>
    {profile.lookingForAJob &&
      <div><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>
    }
    <div><b>About me</b>: {profile.aboutMe}</div>
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}


const Contact = ({ contactTitle, contactValue }) => {
  return <div className={view.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;