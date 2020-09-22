import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { login } from '../../redux/auth-reducer';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Input } from '../common/FormsControls/FormsControls';

const maxLength = maxLengthCreator(25);

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'} component={Input}
                    validate={[required, maxLength]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} component={Input}
                    type={'password'} validate={[required, maxLength]} />
            </div>
            <div>
                <Field component={Input} name={'rememberMe'} type={'checkbox'}
                /> remember me
            </div>
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
        props.login(formdata.email, formdata.password, formdata.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(Login);