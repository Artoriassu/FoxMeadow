import React, { useEffect, useState } from 'react';
import view from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const OnStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            { !editMode &&
                <div className={view.statusField}>
                    <b>Status</b>: <span /* onDoubleClick={activateEditMode} */>{props.status || `-----`}</span>
                    <button className={view.ProfileButton} onClick={activateEditMode}>Edit</button>
                </div>
            }
            { editMode &&
                <div>
                    <input className={view.statusInput} autoFocus={true}
                        onChange={OnStatusChange}
                        onBlur={deactivateEditMode}
                        value={status} />
                    <button className={view.ProfileButton} onClick={deactivateEditMode}>Ready</button>
                </div>
            }
        </div >
    )
}

export default ProfileStatusWithHooks;