import { connect } from "react-redux";
import React from "react";
import { getDataUsers, follow, unfollow } from "../../../Redux/findUsersReducer";
import FindUsers from "./FindUsers";
import { getUsers, getPageSize, getTotalUsers, getPage, getIsLoading, getfollowingInProgress } from "../../../Redux/selectors";
import { RootReducersType } from "../../../Redux/Redux__store";
import { UsersType } from "../../../Redux/findUsersReducer"; 

type PropsType = {
    pageTitle: string
};

type StateType = {
    users: Array<UsersType>
    pageSize: number
    totalUsers: number
    currentPage: number
    isLoading: boolean
    followingInProgress: Array<number>
};

type DispatchType = {
    getDataUsers: (currentPage: number, pageSize: number) => void
    follow: (id: number) => void     
    unfollow: (id: number) => void
};

type AllTypes = PropsType & StateType & DispatchType;

class FindUsersContainer extends React.Component<AllTypes> {
    componentDidMount() {
        this.props.getDataUsers(this.props.currentPage, this.props.pageSize);
    }

    clickPage = (numPage: number) => {
        this.props.getDataUsers(numPage, this.props.pageSize);
    }

    render() {
        return <FindUsers 
            users={this.props.users}
            totalUsers={this.props.totalUsers}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            clickPage={this.clickPage}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
            isLoading={this.props.isLoading}
        />
    }
}


let mapStateToProps = (state: RootReducersType): StateType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsers: getTotalUsers(state),
        currentPage: getPage(state),
        isLoading: getIsLoading(state),
        followingInProgress: getfollowingInProgress(state),
    };
}
export default connect<StateType, DispatchType, PropsType, RootReducersType>(mapStateToProps, { getDataUsers, follow, unfollow })(FindUsersContainer);