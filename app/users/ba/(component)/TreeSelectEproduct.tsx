"use client"
import { OptionTree, block } from "@/app/(types)/eProduct"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"
import { uniqueValue } from "@/app/(utilities)/ArrayUtilities"
import {
    useContextBa,
    useContextTranfer
} from "@/components/cusTomHook/useContext"
import SelectEproduct from "@/components/selector/SelectEproductTree"
import { Row } from "antd"
import { memo } from "react"
import "./css/customcssSlectTree.css"

export interface DataTranfeCustom extends DataTranfer {
    block: block[]
}
const TreeSelectProduct = () => {
    const { setListLeft, listLeft, listRight } = useContextTranfer()
    const { setDataGlobal } = useContextBa()
    const onSelect = (selectedKeys: string, info: OptionTree) => {
        if (listLeft.length > 0) {
            setListLeft([])
        }

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
    const onClear = () => {
        setDataGlobal((data) => ({ ...data, checkedForm: !data.checkedForm }))
    }
    return (
        <Row>
            <SelectEproduct
                typeQuery="getProduct"
                onSelect={onSelect}
                onClear={onClear}
                placeholder="vui lòng chọn sản phẩm "
            />
        </Row>
    )
}
export default memo(TreeSelectProduct)
