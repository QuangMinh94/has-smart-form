"use client"
import React, { useState } from "react"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { Dropdown, Input } from "antd"
import { debounce } from "lodash"
const App: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<boolean>(false)
    const [items, setItems] = useState<any[]>([])
    const { dataGlobal } = useContextMyWorkDetail()
    const dataMyWork = dataGlobal.dataMywork
    const HanderChange = debounce((e: any) => {
        const mywork = dataMyWork.find(
            (item) => item.citizenId === e.target.value
        )
        if (mywork) {
            setItems([
                {
                    label: (
                        <div
                            onClick={(e) => {
                                console.log("mywork", mywork)
                            }}
                        >
                            {mywork.name}
                        </div>
                    ),
                    key: "mywork"
                }
            ])
        } else {
            setItems([])
        }
    }, 300)

    return (
        <>
            <Dropdown menu={{ items }} trigger={["click"]}>
                <Input onChange={HanderChange} />
            </Dropdown>
        </>
    )
}

export default App
