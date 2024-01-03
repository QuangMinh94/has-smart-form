"use client"
import { useContextAdminconnectManager } from "@/components/cusTomHook/useContext"
import { Input, Select } from "antd"
import React, { memo } from "react"
const optionstype = [
    {
        label: "NO AUTH",
        value: "NO AUTH"
    },
    {
        label: "BASIC AUTH",
        value: "BASIC AUTH"
    },
    {
        label: "BEARER TOKEN",
        value: "BEARER TOKEN"
    },
    {
        label: "API KEY",
        value: "API KEY"
    }
]
const optionsMethod = [
    {
        label: "POST",
        value: "POST"
    },
    {
        label: "GET",
        value: "GET"
    }
]
const FormFieldAuthenText: React.FC = () => {
    const {
        setDataForm,
        DataForm: { authenInfo }
    } = useContextAdminconnectManager()

    const { textInfo } = authenInfo

    const onChange = (
        value: string,
        type: "type" | "method" | "urlToken" | "fieldToken"
    ) => {
        setDataForm((dataForm) => {
            const textInfo = {
                ...dataForm.authenInfo.textInfo,
                [type]: value.trim()
            }
            return {
                ...dataForm,
                authenInfo: {
                    ...dataForm.authenInfo,
                    textInfo: textInfo
                }
            }
        })
    }
    return (
        <div>
            <div className="my-[14px]">
                <label>type</label>
                {/* <Input
                    style={{ marginTop: "5px" }}
                    value={value.type}
                    onChange={(e) => {
                        onChange(e.target.value, "type")
                    }}
                /> */}
                <Select
                    allowClear
                    value={textInfo.type}
                    style={{ width: "100%", marginTop: "5px" }}
                    onChange={(value) => {
                        onChange(value, "type")
                    }}
                    options={optionstype}
                />
            </div>
            <div className="my-[14px]">
                <label>method</label>
                {/* <Input
                    style={{ marginTop: "5px" }}
                    value={value.method}
                    onChange={(e) => {
                        onChange(e.target.value, "method")
                    }}
                /> */}
                <Select
                    allowClear
                    value={textInfo.method}
                    style={{ width: "100%", marginTop: "5px" }}
                    onChange={(value) => {
                        onChange(value, "method")
                    }}
                    options={optionsMethod}
                />
            </div>
            <div className="my-[14px]">
                <label>urlToken</label>
                <Input
                    style={{ marginTop: "5px" }}
                    value={textInfo.urlToken}
                    onChange={(e) => {
                        onChange(e.target.value, "urlToken")
                    }}
                />
            </div>
            <div className="my-[14px]">
                <label>fieldToken</label>
                <Input
                    style={{ marginTop: "5px" }}
                    value={textInfo.fieldToken}
                    onChange={(e) => {
                        onChange(e.target.value, "fieldToken")
                    }}
                />
            </div>
            {/* <div className="my-[25px] flex justify-end ">
                <div className="ml-[10px]">
                    <Button type="primary" onClick={HandelerSave}>
                        Lưu
                    </Button>
                </div>
            </div> */}
        </div>
    )
}

export default memo(FormFieldAuthenText)
