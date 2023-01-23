import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { dataProfile, getStatus, updateStatus, updateImgProfile } from "../../Redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { WithAuthRedirectComponent } from "../../HOC/WithAuthRedirectComponent";
import { compose } from "redux";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}



class ProfileContainer extends React.Component {
    profileUpdate() {
        let userId = this.props.router.params.userId;
        if (!userId) userId = this.props.myId;
        
        this.props.dataProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.profileUpdate();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.profileUpdate();
        }
    }

    render() {
        return <>
            <Profile {...this.props} status={this.props.status} updateStatus={this.props.updateStatus} updateImgProfile={this.props.updateImgProfile} isParamId={!!this.props.router.params.userId}/>
        </>
    }

}

let mapStateToProps = state => { 
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        myId: state.auth.id,
        auth: state.auth.auth
    } 
};

export default compose(
    connect(mapStateToProps, { dataProfile, getStatus, updateStatus, updateImgProfile }),
    withRouter,
    WithAuthRedirectComponent
)(ProfileContainer);