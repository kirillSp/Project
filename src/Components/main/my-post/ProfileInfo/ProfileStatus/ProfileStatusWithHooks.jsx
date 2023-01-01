import React, { useState, useEffect } from "react";

let ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
    useEffect(() => setStatus(props.status), [props.status]);

    let activateEditMode = () => {
        setEditMode(true);
    };

    let deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    let onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    return <div>{
        editMode
            ? <input autoFocus={true} onBlur={deactivateEditMode} onChange={onChangeStatus} value={status} />
            : <p onDoubleClick={activateEditMode}>{props.status}</p>
    }</div>

}

export default ProfileStatusWithHooks;