import React from "react"

type typeProps = {
    title: string
    Table: React.ReactElement
    HeaderAction: React.ReactElement
    BtnAdd: React.ReactElement
}

const LayoutAdministrator: React.FC<typeProps> = ({
    title,
    Table,
    HeaderAction,
    BtnAdd
}) => {
    return (
        <div>
            <div className="pb-[5px] border-b-[2px] border-color:black text-black flex  ">
                <h2 className="text-lg flex-1">{title}</h2>
                {BtnAdd}
            </div>
            <div className="min-h-[10vh] flex items-center ">
                {HeaderAction}
            </div>
            <div>{Table}</div>
        </div>
    )
}

export default LayoutAdministrator
