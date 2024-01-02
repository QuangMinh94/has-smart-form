"use client"
import ActionHeaderBu from "@/app/users/administrator/(component)/ActionHeader/connecter/acttachBusiness"
import TableCorrection from "@/app/users/administrator/(component)/table/connecter/tableCorrection"
import TreeAttachBu from "@/app/users/administrator/(component)/table/connecter/treeAttachBu"
import {
    useContextAdmin,
    useContextAdminAttachBu
} from "@/components/cusTomHook/useContext"
import { Button, Tabs, TabsProps } from "antd"
import ProviderTree from "./provider/ProviderTree"

const BtnAttachBu = () => {
    const { setTab } = useContextAdminAttachBu()
    const {
        dataGlobal: { Connecter }
    } = useContextAdminAttachBu()
    const { messageApi } = useContextAdmin()
    const idCorrection = Connecter.filter((item) => item.checked)[0]?._id ?? ""
    return (
        <>
            <Button
                type="primary"
                onClick={() => {
                    if (!idCorrection) {
                        messageApi("error", "Vui lòng chon connection muốn gán")
                        return
                    }
                    setTab("ADMIN_CORRECTION")
                }}
            >
                Gán
            </Button>
        </>
    )
}
const items: TabsProps["items"] = [
    {
        key: "ADMIN_ATTACH_BUSINESS",
        label: "Gán nghiệp vụ",
        children: (
            <ProviderTree>
                <ActionHeaderBu />
                <TreeAttachBu />
                <div className="flex justify-end">
                    <BtnAttachBu />
                </div>
            </ProviderTree>
        )
    },
    {
        key: "ADMIN_CORRECTION",
        label: "Hiệu chỉnh connecter",
        children: <TableCorrection />
    }
]
const TabBu: React.FC = () => {
    const { tab, setTab } = useContextAdminAttachBu()

    return (
        <Tabs
            onChange={(key: string) => {
                setTab(key)
            }}
            activeKey={tab}
            items={items}
        />
    )
}

export default TabBu
