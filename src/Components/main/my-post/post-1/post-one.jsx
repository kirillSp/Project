import React from "react";

import PostOneStyle from "./postOne.module.css";

const PostsList = props => {
  return (
    <div className={PostOneStyle.item}>
      <img src={props.path} />
      <span>{props.message}</span>
      <div>
        <span>{props.likes}</span>
      </div>
    </div>
  )
}

export default PostsList;
