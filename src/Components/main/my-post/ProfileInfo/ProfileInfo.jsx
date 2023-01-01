import React from "react";
import S from "./ProfileInfo.module.css"
import Preloader from "../../../GlobalComponent/Preloader/Preloader";
// import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";

const ProfileInfo = props => {
    if (!props.profile) return <Preloader />

    return (
        <div className={S.posts}>
            <div className="userProfile">
                <div>
                    <img src={props.profile.photos.small} />
                </div>
                <b>{props.profile.fullName}</b>
                <p>{props.profile.aboutMe}</p>
                <ProfileStatusWithHooks status={props.status || "Укажите статус"} updateStatus={props.updateStatus}/>
                {/* <ProfileStatus status={props.status || "Укажите статус"} updateStatus={props.updateStatus}/> */}
            </div>
        </div>
    )
}

export default ProfileInfo;