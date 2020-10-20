import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import view from '../common/FormsControls/FormsControls.module.css'

const LoginForm = (props) => {
    debugger;
    return (
        <form onSubmit={props.handleSubmit}>
            {createField('Email', 'email', [required], Input)}
            {createField('Password', 'password', [required], Input, { type: 'password' })}
            {createField(null, 'rememberMe', [], Input, { type: 'checkbox' }, 'rememberMe')}

            {props.captchaUrl && <img src={props.captchaUrl} />}
            {props.captchaUrl && createField('Symbols from image', 'captcha', [required], Input, {})}

            { props.error && <div className={view.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>)
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formdata) => {
        props.login(formdata.email, formdata.password, formdata.rememberMe, formdata.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, { login })(Login);