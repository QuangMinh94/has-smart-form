import React from "react"
import { Button } from "antd"
import { faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const ButtonLogOut: React.FC = () => {
    return (
        <Button  type="primary">
            <FontAwesomeIcon className="mr-2" icon={faSignOut} />
            Đăng xuất
        </Button>
    )
}
export default ButtonLogOut
