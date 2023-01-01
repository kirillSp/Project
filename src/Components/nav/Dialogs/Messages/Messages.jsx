import React from "react";

const Messages = props => {
  return (
    <div className={props.attr}>
      <span><img src="#"/></span>
      {props.message}
    </div>
  );
};

export default Messages;