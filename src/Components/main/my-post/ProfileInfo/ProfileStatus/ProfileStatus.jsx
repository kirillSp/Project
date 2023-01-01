import React from "react";

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({ editMode: true });
    }

    deactivateEditMode = () => {
        this.setState({ editMode: false });
        this.props.updateStatus(this.state.status);
    }

    onChangeStatus = (e) => {
        this.setState({ status: e.target.value })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.status !== this.props.status) {
            this.setState({ status: this.props.status });
        }
    }

    render() {


        
        return <div>{
            this.state.editMode
                ? <input onChange={this.onChangeStatus} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                : <p onDoubleClick={this.activateEditMode}>{this.props.status}</p>
        }</div>
    }
}

export default ProfileStatus;