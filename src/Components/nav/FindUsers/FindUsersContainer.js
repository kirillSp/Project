import { connect } from "react-redux";
import React from "react";
import { getDataUsers, follow, unfollow } from "../../../Redux/findUsersReducer";
import FindUsers from "./FindUsers";
import { getUsers, getPageSize, getTotalUsers, getPage, getIsLoading, getfollowingInProgress } from "../../../Redux/selectors"

class FindUsersContainer extends React.Component {
    componentDidMount() {
        this.props.getDataUsers(this.props.currentPage, this.props.pageSize);
    }

    clickPage = (numPage) => {
        this.props.getDataUsers(numPage, this.props.pageSize);
    }

    render() {
        return (
            <>
                <FindUsers totalUsers={this.props.totalUsers}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    clickPage={this.clickPage}
                    users={this.props.users}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    isLoading={this.props.isLoading}
                />
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsers: getTotalUsers(state),
        currentPage: getPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getfollowingInProgress(state)
    };
}

export default connect(mapStateToProps, { getDataUsers, follow, unfollow })(FindUsersContainer);