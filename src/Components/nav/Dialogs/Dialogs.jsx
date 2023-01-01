import S from "./Dialogs.module.css"
import UsersDialog from "./UsersDialog/UsersDialog";
import Messages from "./Messages/Messages";
import { Field, reduxForm } from "redux-form";
import { requiredField, maxLengthCreator } from "../../../Util/Validate/Validate"
import { TextArea } from "../../GlobalComponent/FormControl/FormsControl";
import { Navigate } from "react-router-dom";

const maxLength10 = maxLengthCreator(10); 

const Dialogs = (props) => {
    let sendMessage = (formData) => props.addPost(formData);
    let userNameMessage = props.messagePage.dialogsData.map((d, i) => <UsersDialog key={i} name={d.name} id={d.id} />);
    let userDialogs = props.messagePage.messagesData.map((item, i) => <Messages key={i} message={item.message} />)


    // if (props.auth) return <Navigate to={"/dialogs/"} />

    return (
        <div className={S.dialogs}>
            <div className={S.dialogsItems}>
                <p>Names</p>
                <div>{userNameMessage}</div>
            </div>
            <div className={S.messages}>
                <p>Messages</p>
                <DialogsReduxForm onSubmit={sendMessage} />
                <div>{userDialogs}</div>
            </div>
        </div>
    )
}

const DialogsForm = (props) => {

    return <form onSubmit={props.handleSubmit}>
        <Field name={"dialogMessageForm"} component={TextArea} placeholder={"Введите сообщение"} validate={[requiredField, maxLength10]} />
        <button>onClick</button>
    </form>
}

const DialogsReduxForm = reduxForm({ form: "message" })(DialogsForm);

export default Dialogs;