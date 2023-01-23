import Preloader from "../../GlobalComponent/Preloader/Preloader";
import { ListUsers } from "./ListUsers/ListUsers";
import { Paginator } from "../../GlobalComponent/Paginator/Paginator";

let FindUsers = (props) => {
    return <div>
        <Paginator totalUsers={props.totalUsers} pageSize={props.pageSize} currentPage={props.currentPage} clickPage={props.clickPage} />
        <div>{props.isLoading ? <Preloader /> : null}</div>
        <ListUsers users={props.users} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} />
    </div>

};

export default FindUsers;