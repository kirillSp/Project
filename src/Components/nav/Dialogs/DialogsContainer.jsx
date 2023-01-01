import Dialogs from "./Dialogs";
import { ADD_MESSAGE_POST_ACTION_CREATER } from "../../../Redux/messageReducer";
import { connect } from "react-redux";
import { compose } from "redux";
import { WithAuthRedirectComponent } from "../../../HOC/WithAuthRedirectComponent";
    
let mapStateToProps = (state) => ({messagePage: state.messagePage});
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (formData) => dispatch(ADD_MESSAGE_POST_ACTION_CREATER(formData)),
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirectComponent
)(Dialogs);