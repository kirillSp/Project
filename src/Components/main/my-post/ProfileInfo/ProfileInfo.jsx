// import ProfileStatus from "./ProfileStatus/ProfileStatus";

import React, { useState } from "react";
import Preloader from "../../../GlobalComponent/Preloader/Preloader";
import ProfileInfoS from "./ProfileInfoS.module.css";
import ProfileData from "./ProfileData/ProfileData"
import ProfileDataReduxForm from "./ProfileDataForm/ProfileDataForm";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);
    let { profile, updateImgProfile, isParamId, status, updateStatus } = props;

    if (!profile) return <Preloader />

    let selectPhoto = (e) => {
        updateImgProfile(e.target.files[0]);
    }

    let sendUpdatedProfileInfo = (formData) => { 
        props.updateDataProfile(formData).then(() => setEditMode(!editMode));
    };

    return (
        <div className={ProfileInfoS.posts}>
            {/* <ProfileStatus status={props.status || "Укажите статус"} updateStatus={props.updateStatus}/> */}
            
            <div>
                <img className={ProfileInfoS.profileImg} src={profile.photos.small || "https://pbs.twimg.com/media/EaEDOYFU4AUCbH3.jpg"} />
            </div>

            <div>{
                isParamId || <input type="file" onChange={selectPhoto} />
            }</div>

            <>{
                editMode
                    ? <ProfileDataReduxForm initialValues={profile} onSubmit={sendUpdatedProfileInfo} updateStatus={updateStatus} />
                    : <ProfileData profile={profile} status={status} updateStatus={updateStatus} isParamId={isParamId} setEditMode={() => setEditMode(!editMode)} />
            }</>

        <div>
            <b>Status: </b>
            <ProfileStatusWithHooks status={props.status || "Укажите статус"} updateStatus={props.updateStatus} />
        </div>
        </div>
    )
}

export default ProfileInfo;