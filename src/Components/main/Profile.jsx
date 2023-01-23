import React from "react";
import MyPostContainer from "./my-post/my__post__container";
import ProfileInfo from "./my-post/ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <main>
      <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} updateImgProfile={props.updateImgProfile} isParamId={props.isParamId} />
      <MyPostContainer/>
    </main>
  )
}

export default Profile;