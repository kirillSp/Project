import React from "react";
import { NavLink } from "react-router-dom";
import S from "./UsersDialogs.module.css";

const setActive = ({ isActive }) => isActive ? S.active : "";
const UsersDialog = props => {
  return (
    <div>
      <NavLink to={`/dialogs/${props.id}`} className={setActive}>{props.name}</NavLink>
    </div>
  )
};

export default UsersDialog;