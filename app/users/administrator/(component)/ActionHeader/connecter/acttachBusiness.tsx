import FillterTree from "@/app/users/administrator/(component)/TreeCustome/FillterTree"
import React, { memo } from "react"
import FilterConnecter from "../../fillterConnecter/FilterConnecter"
const ActionHeacderAttach: React.FC = () => {
    return (
        <div className="flex">
            <div className="w-[50%]">
                <div className="w-[80%]">
                    <FillterTree />
                </div>
            </div>
            <div className="w-[50%]">
                <div className="w-[80%]">
                    <FilterConnecter />
                </div>
            </div>
        </div>
    )
}
export default memo(ActionHeacderAttach)
