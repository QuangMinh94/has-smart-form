import React from "react"
import { Checkbox } from "antd"
import { useContextBa } from "@/components/cusTomHook/useContext"
const CheckboxCustom: React.FC = () => {
    const { setDataGlobal, dataGlobal } = useContextBa()
    console.log(dataGlobal)
    const HanderChange = (e: any) => {
        setDataGlobal((data) => ({ ...data, checkedForm: e.target.checked }))
    }
    return (
        <Checkbox checked={dataGlobal.checkedForm} onChange={HanderChange}>
            Biểu mẫu chưa thuộc nghiệp vụ
        </Checkbox>
    )
}
export default CheckboxCustom
