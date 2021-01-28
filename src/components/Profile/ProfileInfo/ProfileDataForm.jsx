import React from 'react';
import view from './ProfileInfo.module.css';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import style from '../../common/FormsControls/FormsControls.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        {error && <div className={style.formSummaryError}>
            {error}
        </div>}
        <div><button className={view.ProfileButton}>Save</button></div>
        <div><b>Full name</b>:{createField('Fullname', 'fullName', [], Input)}</div>
        <div><b>Looking for a job</b>:
            {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
        </div>
        <div>
            <b>My professional skills</b>:
            {createField('My professional skills', 'lookingForAJobDescription', [], Textarea)}
        </div>
        <div><b>About me</b>: {createField('About me', 'aboutMe', [], Textarea)}</div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return <div key={key} className={view.contact}>
                    <b>{createField(key, 'contacts.' + key, [], Input)}</b>
                </div>
            })}
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm)
export default ProfileDataFormReduxForm;