import { Field, reduxForm } from "redux-form";
import { Input, createField } from "../../GlobalComponent/FormControl/FormsControl";
import { requiredField, maxLengthCreator } from "../../../Util/Validate/Validate";
import { connect } from "react-redux";
import { login } from "../../../Redux/authReducer";
import { Navigate } from "react-router-dom";
import messageError from "../../GlobalComponent/FormControl/FormControlS.module.css";

let maxLength30 = maxLengthCreator(30);

let Login = (props) => {
    const sendForm = (formData) => {
        props.login(formData.login, formData.password, formData.remmemberMe);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={sendForm} />
    </div>
}

let LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {createField("login", Input, "login", [requiredField, maxLength30])}
        {createField("password", Input, "password", [requiredField, maxLength30], { type: "password" })}
        {createField("rememberMe", Input, null, [], { type: "checkbox" }, "remember me")}
      
        {props.error && <div className={messageError.wrongData}>{props.error}</div>}
      
        <div>
            <button>Login</button>
        </div>
    </form>
};

let LoginReduxForm = reduxForm({ form: 'loginUser' })(LoginForm);
let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, { login })(Login);