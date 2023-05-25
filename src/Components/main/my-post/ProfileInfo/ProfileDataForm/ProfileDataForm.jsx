import React from "react";
import { reduxForm } from 'redux-form'
import { createField, Input, TextArea } from "../../../../GlobalComponent/FormControl/FormsControl";
import { requiredField, maxLengthCreator } from "../../../../../Util/Validate/Validate";

const maxLength10 = maxLengthCreator(10)

let ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <button>save</button>
            {props.error && <div style={{color: "red"}}>{props.error}</div>}

        </div>

        <div>
            <b>Full name:</b>
            <span>{createField("fullName", Input, "full name", [requiredField, maxLength10])}</span>
        </div>

        <div>
            <b>About me</b>
            <span>{createField("aboutMe", TextArea, "about me", [requiredField])}</span>
        </div>

        <div>
            <b>Looking for job:</b>
            <span>{createField("lookingForAJob", Input, undefined, null, { type: "checkbox" }, undefined)}</span>
        </div>

        <div>
            <b>My Professional skills:</b>
            <span>{createField("lookingForAJobDescription", TextArea, "Скиллы", [requiredField])}</span>
        </div>

        <div>
            <b>Contacts:</b>
            <span>{
                Object.keys(props.initialValues.contacts).map(key => {
                    return <div key={key}>
                        <b>{key}</b>
                        <span>{createField("contacts." + key, Input, key, null)}</span>
                    </div>
                })
            }</span>
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm({ form: "ProfileDataForm" })(ProfileDataForm);

export default ProfileDataReduxForm;