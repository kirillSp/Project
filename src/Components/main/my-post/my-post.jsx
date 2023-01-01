import React from "react";
import { Field, reduxForm } from "redux-form";
import PostsStyle from "./my-post.module.css";
import Post from "./post-1/post-one.jsx";
import { TextArea } from "../../GlobalComponent/FormControl/FormsControl";
import { requiredField, maxLengthCreator } from "../../../Util/Validate/Validate";

const maxLength10 = maxLengthCreator(10)


const MyPosts = (props) => {
    const posts = props.postsData.map((e, i) => <Post key={i} likes={e.likes} message={e.message} path={e.path} />);
    const sendPost = (formData) => props.updatePost(formData)

    return (
        <main>
            <ProfileReduxForm onSubmit={sendPost} />
            <div className={PostsStyle.post}>{posts}</div>
        </main>
    )
};

let ProfileForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <h1>My Post</h1>
        <Field name={"profileMessage"} placeholder={"Input message"} component={TextArea} validate={[requiredField, maxLength10]} />
        <br />
        <button>Button</button>
    </form>
}

let ProfileReduxForm = reduxForm({ form: "profileForm" })(ProfileForm);

export default MyPosts;