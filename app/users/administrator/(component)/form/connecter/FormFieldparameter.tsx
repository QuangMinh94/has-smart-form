"use client"
import { parametter } from "@/app/(types)/formFiled/FormConnectManager/parametter"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import {
    useContextAdmin,
    useContextAdminconnectManager
} from "@/components/cusTomHook/useContext"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Input } from "antd"
import React, { memo, useState } from "react"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeForm
    dataRow: parametter
}
type FieldType = parametter
const FormFieldParametter: React.FC<Props> = ({
    CancelModal,
    typeForm,
    dataRow
}) => {
    const [field, setField] = useState<string>("")
    const { setDataForm } = useContextAdminconnectManager()
    const { messageApi } = useContextAdmin()
    const onAdd = () => {
        if (!field.trim() && typeForm === "ADD_MODAL") {
            messageApi("error", "vui lòng nhập field")
            return
        }
        setDataForm((dataForm) => {
            const parametters = dataForm.parametter
            console.log("alo")
            if (typeForm === "ADD_MODAL") {
                parametters.unshift({ field })
            }
            if (typeForm === "REMOVE_MODAL") {
                const index = parametters.findIndex(
                    (item, index) => index === Number(dataRow.key) - 1
                )
                parametters.splice(index, 1)
            }

            return { ...dataForm, parametter: parametters }
        })
        CancelModal()
    }

    return (
        <div className="flex items-center  h-[30px]">
            {typeForm === "REMOVE_MODAL" || (
                <Input
                    onChange={(e) => {
                        setField(e?.target?.value)
                    }}
                    value={field}
                    style={{ width: "20vw", height: "25px" }}
                    size="small"
                    placeholder="field"
                />
            )}

            <div
                className={` w-[100%] my-[25px] ml-[5px] flex   ${
                    typeForm === "REMOVE_MODAL" ? "justify-end" : ""
                } `}
            >
                <Button onClick={CancelModal}>
                    <FontAwesomeIcon icon={faTimes} style={{ color: "red" }} />
                </Button>
                <div className="ml-[10px]">
                    <Button onClick={onAdd}>
                        <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: "green" }}
                        />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default memo(FormFieldParametter)
