import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { AppStateType } from '../../redux/redux-store';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormsControls/FormsControls';
import view from '../common/FormsControls/FormsControls.module.css'
import loginView from './Login.module.css'

export type LoginFormValuesTypes = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesTypes, string>

type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesTypes, LoginFormOwnProps> & LoginFormOwnProps>
    = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div className={loginView.logForm}>E-Mail {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}</div>
                <div className={loginView.logForm}>Password {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}</div>
                <div className={loginView.logForm}>Remember me? {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }/* , 'rememberMe' */)}</div>

                {props.captchaUrl && <img src={props.captchaUrl} />}
                {props.captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', [required], Input, {})}

                { props.error && <div className={view.formSummaryError}>
                    {props.error}
                </div>}
                <div>
                    <button className={loginView.but1}>Login</button>
                </div>
            </form>)
    }

const LoginReduxForm = reduxForm<LoginFormValuesTypes, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginPropsType = MapStatePropsType & MapDispatchPropsType

const Login: React.FC<LoginPropsType> = (props) => {
    const onSubmit = (formdata: any) => {
        props.login(formdata.email, formdata.password, formdata.rememberMe, formdata.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div className = {loginView.LogPage}>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, { login })(Login);