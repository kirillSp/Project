import Preloader from "../../GlobalComponent/Preloader/Preloader";
import { ListUsers } from "./ListUsers/ListUsers";
import { Paginator } from "../../GlobalComponent/Paginator/Paginator";
import { UsersType } from "../../../Redux/findUsersReducer";

type PropsType = {    
    totalUsers: number
    pageSize: number
    currentPage: number
    clickPage: (numPage: number) => void
    users: Array<UsersType>
    follow: (id: number) => void
    unfollow: (id: number) => void
    followingInProgress: Array<number> 
    isLoading: boolean
};

let FindUsers: React.FC<PropsType> = (props) => {
    return <div>
        <Paginator totalUsers={props.totalUsers} pageSize={props.pageSize} currentPage={props.currentPage} clickPage={props.clickPage} />
        <div>{props.isLoading ? <Preloader /> : null}</div>
        <ListUsers users={props.users} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} />
    </div>

};

export default FindUsers;