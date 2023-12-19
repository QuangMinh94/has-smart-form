"use client"
import SelectEproduct from "../../customSelect/SelectEproductTree"

import { Row } from "antd"

import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { OptionTree, block } from "@/app/(types)/eProduct"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"
import { uniqueValue } from "@/app/(utilities)/ArrayUtilities"

export interface DataTranfeCustom extends DataTranfer {
    block: block[]
}
const HeaderUi = () => {
    const { setListLeft, listLeft, dataGlobal, listRight } =
        useContextMyWorkDetail()

    const onSelect = (selectedKeys: string, info: OptionTree) => {
        if (listLeft.length > 0) {
            setListLeft([])
        }

        console.log("info", info)
        const dataListLeft: DataTranfeCustom[] = []
        info.formTemplate.forEach((tempalate) => {
            dataListLeft.push({
                id: tempalate?._id ?? "",
                name: tempalate?.name ?? "",
                checkBox: false,
                block: tempalate.block ?? []
            })
        })
        const uniqueListLeft = uniqueValue(dataListLeft, listRight)
        setListLeft(uniqueListLeft)
    }
    return (
        <Row>
            <SelectEproduct
                defalutValue={dataGlobal.nameEproduct}
                typeQuery="getProduct"
                onSelect={onSelect}
                placeholder="Sản phẩm"
            />
        </Row>
    )
}
export default HeaderUi