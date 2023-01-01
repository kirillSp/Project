import React from "react";
import Header from "./header";
import { connect } from "react-redux";
import { logout } from "../../Redux/authReducer";

class HeaderContainer extends React.Component {    
    render() {
        return <Header {...this.props} />;
    }
}

let mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, { logout })(HeaderContainer);