"use client"
import SelectEproduct from "../../../../../../components/selector/SelectEproductTree"

import { Row } from "antd"

import { OptionTree, block } from "@/app/(types)/eProduct"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"
import { uniqueValue } from "@/app/(utilities)/ArrayUtilities"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"

export interface DataTranfeCustom extends DataTranfer {
    block: block[]
}
const HeaderUi = () => {
    const {
        setListRight,
        setListLeft,
        listLeft,
        dataGlobal,
        listRight,
        setDataGlobal
    } = useContextMyWorkDetail()

    const onSelect = (selectedKeys: string, info: OptionTree) => {
        if (listLeft.length > 0) {
            setListLeft([])
        }
        setDataGlobal((data) => ({ ...data, idEProduct: selectedKeys }))
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
        // setListRight([])
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
