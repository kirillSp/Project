import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToPropsForRedirect = state => ({auth: state.auth.isAuth});

export let WithAuthRedirectComponent = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.auth) return <Navigate to={"/login"} />
            return <Component {...this.props} />
        }
    }

    let redirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);
    return redirectComponent;
};