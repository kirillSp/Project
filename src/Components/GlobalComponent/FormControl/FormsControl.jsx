import React from "react";
import FormCotrolS from "./FormControlS.module.css";

import { Field } from "redux-form";

export const TextArea = (props) => {
    let { input, meta, ...restProps } = props;
    return <FormControl {...props}><textarea {...restProps} {...input} /></FormControl>
}

export const Input = (props) => {
    let { input, meta, ...restProps } = props;
    return <FormControl {...props}><input {...restProps} {...input} /></FormControl>
}

const FormControl = ({ input, meta, ...props }) => {
    let { error, touched } = meta;
    let { formsControl, errorS } = FormCotrolS;
    let checkForms = error && touched;

    return <div className={formsControl + " " + (checkForms && errorS)}>
        <div>{props.children}</div>
        <div>{
            checkForms && <span>{error}</span>
        }</div>
    </div>
}

export const createField = (name, tag, placeholder, validate, typeInput = {}, text = "") => {
    return <div>
        <Field name={name} component={tag} placeholder={placeholder} validate={validate} {...typeInput} />{text}
    </div>
}