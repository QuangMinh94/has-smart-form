"use client"
import SelectEproduct from "../../customSelect/SelectEproduct"

import { Row } from "antd"

import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import { eProduct, OptionTree } from "@/app/(types)/eProduct"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"

interface DataTranfeCustom extends DataTranfer, eProduct {
    repository: string
    idFormTemplate: string
}
const HeaderUi = () => {
    const { setListLeft, listLeft, dataGlobal } = useContextMyWorkDetail()

    const onSelect = (selectedKeys: string, info: OptionTree) => {
        if (listLeft.length > 0) {
            setListLeft([])
        }

        console.log(info)
        const dataTranfer: DataTranfeCustom[] = []
        info.formTemplate.forEach((tempalate) => {
            tempalate?.block?.forEach((block) => {
                dataTranfer.push({
                    id: block?._id + tempalate?._id ?? "",
                    name: block?.name ?? "",
                    checkBox: false,
                    repository: block?.ozrRepository ?? "",
                    idFormTemplate: tempalate._id ?? ""
                })
            })
        })
        setListLeft(dataTranfer)
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
