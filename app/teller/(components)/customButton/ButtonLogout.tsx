"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "antd"
import { faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const ButtonLogOut: React.FC = () => {
    const router = useRouter()
    return (
        <Button onClick={()=> router.push(process.env.NEXT_PUBLIC_SERVER_URL! + "/api/auth/signout")}  type="primary">
            <FontAwesomeIcon className="mr-2" icon={faSignOut} />
            Đăng xuất
        </Button>
    )
}
export default ButtonLogOut
