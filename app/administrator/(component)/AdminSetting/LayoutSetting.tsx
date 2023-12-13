import React from "react"
import SettingImg from "./SettingImg"
import CustomerTab from "./CustomerTab"
const LayoutAdministrator: React.FC = ({}) => {
    return (
        <div>
            <div className="pb-[5px] border-b-[2px] border-color:black text-black flex  ">
                <h2 className="text-lg flex-1">Cài đặt</h2>
            </div>
            <div className=" flex justify-center my-[2.5vh]">
                <div>
                    <SettingImg />
                </div>
            </div>
            <div>
                <CustomerTab />
            </div>
        </div>
    )
}

export default LayoutAdministrator
