import React from 'react';
import view from './Dialogs.module.css';
import { NavLink, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength = maxLengthCreator(100);

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={view.dialog}>
            <img src={props.avatar} />
            <NavLink className={view.dialog_person} to={path}> {props.person}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={view.message}>{props.text}</div>
    )
}

const Dialogs = (props) => {

    let dialogs_Elements = props.dialogsPage.dialogs
        .map(dial_info => <DialogItem id={dial_info.id} avatar={dial_info.avatar} person={dial_info.person} />)

    let messages_Elements = props.dialogsPage.messages
        .map(mes_info => <Message text={mes_info.text} />)

    const addNewMessage = (values) => {
        props.addMessage(values.newMessageBody);
    }

    if (!props.isAuth) return <Redirect to={'/login'} />;

    return (
        <div className={view.dialogs}>

            <div className={view.dialogs_items}>
                {dialogs_Elements}
            </div>
            <div className={view.messages}>
                {messages_Elements}
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={view.newMessage_TextArea}>
                <Field component={Textarea} name='newMessageBody' placeholder='Your message' 
                validate={[required, maxLength ]} />
            </div>
            <div> <button>Add</button> </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;