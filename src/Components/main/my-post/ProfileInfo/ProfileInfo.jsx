import React from "react";
import S from "./ProfileInfo.module.css"
import Preloader from "../../../GlobalComponent/Preloader/Preloader";
// import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import ProfileInfoS from "./ProfileInfoS.module.css";

const ProfileInfo = props => {
    if (!props.profile) return <Preloader />

    let selectPhoto = (e) => {
        props.updateImgProfile(e.target.files[0]);
    }

    return (
        <div className={S.posts}>
            <div className="userProfile">
                <div>
                    <img className={ProfileInfoS.profileImg} src={props.profile.photos.small || "https://pbs.twimg.com/media/EaEDOYFU4AUCbH3.jpg"} />
                </div>
                <div>{
                    props.isParamId || <input type="file" onChange={selectPhoto}/>
                }</div>
                <b>{props.profile.fullName}</b>
                <p>{props.profile.aboutMe}</p>
                <ProfileStatusWithHooks status={props.status || "Укажите статус"} updateStatus={props.updateStatus} />
                {/* <ProfileStatus status={props.status || "Укажите статус"} updateStatus={props.updateStatus}/> */}
            </div>
        </div>
    )
}

export default ProfileInfo;