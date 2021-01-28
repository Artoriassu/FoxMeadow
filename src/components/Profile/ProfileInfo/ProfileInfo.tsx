import React, { useState } from 'react';
import view from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import standartPhoto from '../../../assets/f1.jpeg';
import ProfileDataForm from './ProfileDataForm';
import { profileType } from '../../../types/types';

type PropsType = {
  profile: profileType | null
  isOwner: boolean
  savePhoto: (file: any) => void
  status: string
  updateStatus: (status: string) => void
  saveProfile: (profile: profileType) => void
}
const ProfileInfo: React.FC<PropsType> = (props) => {

  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />
  }
  else {
    const onMainPhotoSelected = (e: any) => {
      if (e.target.files.length) {
        props.savePhoto(e.target.files[0]);
      }
    }

    const onSubmit = (formdata: any) => {
      //@ts-ignore
      props.saveProfile(formdata).then(() => {
        setEditMode(false);
      });
    }
    return (
      <div className={view.description}>
        <div className={view.profilePhoto}>
          <img src={props.profile.photos.large || standartPhoto} className={view.mainPhoto} />
          {props.isOwner &&
            <div>
              <input className={view.ProfilePhotoInput} id={"ProfPhoto"} type={'file'} onChange={onMainPhotoSelected} />
              <label className={view.ProfilePhotoButton} htmlFor={"ProfPhoto"} >
                Change Photo
            </label>
            </div>
          }
        </div>
        {editMode
          //@ts-ignore
          ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
          : <ProfileData profile={props.profile} isOwner={props.isOwner}
            goToEditMode={() => { setEditMode(true) }} />}
        <ProfileStatusWithHooks status={props.status}
          updateStatus={props.updateStatus} />
      </div>
    )
  }
}

type ProfileDataPropsType = {
  profile: profileType
  isOwner: boolean
  goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return <div>
    {isOwner && <div><button className={view.ProfileButton} onClick={goToEditMode}>Edit</button></div>}
    <div className={view.ProfileDescr}><b>Full name</b>: {profile.fullName}</div>
    <div className={view.ProfileDescr}><b>Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}</b></div>
    {profile.lookingForAJob &&
      <div className={view.ProfileDescr}><b>My professional skills</b>: {profile.lookingForAJobDescription}</div>
    }
    {/* <div><b>About me</b>: {profile.aboutMe}</div> */}
    <div>
      <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        //@ts-ignore
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
      })}
    </div>
  </div>
}

//@ts-ignore
const Contact = ({ contactTitle, contactValue }) => {
  return <div className={view.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;