import { faBell } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { INotificationBellProps } from "@novu/notification-center"
import { Avatar, Badge } from "antd"

const NotiBell = (props: INotificationBellProps) => {
    return (
        <Badge className="cursor-pointer" count={props.unseenCount}>
            <Avatar
                className="cursor-pointer"
                style={{ backgroundColor: "white" }}
                icon={<FontAwesomeIcon icon={faBell} color="black" />}
            />
        </Badge>
    )
}

export default NotiBell
