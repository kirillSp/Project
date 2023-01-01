import { ADD_POST_ACTION_CREATER, increment } from "../../../Redux/profileReducer";
import MyPosts from "./my-post";
import { connect } from "react-redux";


let mapStateToProps = state => {
	return { 
		postsData: state.profilePage.postsData,
		profile: state.profilePage.profile,
	}
};

let mapDispatchToProps = dispatch => {
	return {
		updatePost: (formData) => dispatch(ADD_POST_ACTION_CREATER(formData)),
	}
};

const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

 
export default MyPostContainer;