import React from "react";
import H from "./header.module.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return <header className={H.header}>
        <img src="#" />
        <div className="LoginHeader">{
            props.auth.isAuth
                ? <div>{props.auth.email} <button onClick={props.logout}>Log out</button></div>
                : <NavLink to={"/login"}>Login</NavLink>

        }</div>
    </header>
}

export default Header;