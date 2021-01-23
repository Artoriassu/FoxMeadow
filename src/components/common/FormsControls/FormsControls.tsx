import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from '../../../utils/validators/validators';
import view from './FormsControls.module.css'

type FormControlPropsType = {
    meta: WrappedFieldMetaProps

}

const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {

    const hasError = touched && error;
    return (
        <div className={view.form_control + ' ' + (hasError ? view.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}>
        <textarea className={view.textArea} {...input} {...restProps} />
    </FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}>
        <input className={view.LoginInput} {...input} {...restProps} />
    </FormControl>
}
export const SearchInput: React.FC<WrappedFieldProps> = (props) => {
    const { input, meta, ...restProps } = props;
    return <FormControl {...props}>
        <input className={view.searchField} {...input} {...restProps} />
        <button className={view.searchButton}><FontAwesomeIcon icon={faSearch} fixedWidth/></button>
    </FormControl>
}
export function createField<FormKeysType extends string>(placeholder: string | undefined,
    name: FormKeysType,
    validators: Array<FieldValidatorType>,
    component: React.FC<WrappedFieldProps>,
    props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
            validate={validators} component={component}
            {...props} /> {text}
    </div>
}