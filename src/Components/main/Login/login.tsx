import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField } from "../../GlobalComponent/FormControl/FormsControl";
import { requiredField, maxLengthCreator } from "../../../Util/Validate/Validate";
import { connect } from "react-redux";
import { login, logout } from "../../../Redux/authReducer";
import { Navigate } from "react-router-dom";
import messageError from "../../GlobalComponent/FormControl/FormControlS.module.css";
import { RootReducersType } from "../../../Redux/Redux__store";

let maxLength30 = maxLengthCreator(30);

type LoginFormOwnPropsType = { captchaUrl: string | undefined };

type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl: string | undefined
};

type MapDispatchToPropsType = { login: (login: string, password: string, remmemberMe: boolean, captcha?: undefined | string) => void };

let Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const sendForm = (formData: any) => {
        props.login(formData.login, formData.password, formData.remmemberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={sendForm} captchaUrl={props.captchaUrl} />
    </div>
}

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string | undefined
};

type PropsDataType = Extract<keyof FormDataType, string>;

let LoginForm: React.FC<InjectedFormProps<FormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField<PropsDataType>("login", Input, "login", [requiredField, maxLength30])}
        {createField<PropsDataType>("password", Input, "password", [requiredField, maxLength30], { type: "password" })}
        {createField<PropsDataType>("rememberMe", Input, undefined, [], { type: "checkbox" }, "remember me")}
        {props.error && <div className={messageError.wrongData}>{props.error}</div>}
        {props.captchaUrl && <img src={props.captchaUrl} />}
        {props.captchaUrl && createField<PropsDataType>("captcha", Input, "captcha", [])}
        <div>
            <button>Login</button>
        </div>
    </form>
};

let LoginReduxForm = reduxForm<FormDataType, LoginFormOwnPropsType>({ form: 'loginUser' })(LoginForm);

let mapStateToProps = (state: RootReducersType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect<MapStateToPropsType, MapDispatchToPropsType, null, RootReducersType>(mapStateToProps, { login })(Login);