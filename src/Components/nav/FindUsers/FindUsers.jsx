import Preloader from "../../GlobalComponent/Preloader/Preloader";
import { ListUsers } from "./ListUsers/ListUsers";
import { SelectPage } from "../../GlobalComponent/SelectPage/SelectPage";

let FindUsers = props => {
    return <div>
        <SelectPage totalUsers={props.totalUsers} pageSize={props.pageSize} currentPage={props.currentPage} clickPage={props.clickPage} />
        <div>{props.isLoading ? <Preloader /> : null}</div>
        <ListUsers users={props.users} followingInProgress={props.followingInProgress} follow={props.follow} unfollow={props.unfollow} />
    </div>

};

export default FindUsers;