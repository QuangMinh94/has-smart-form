"use client"
import { authenInfo } from "@/app/(types)/formFiled/FormConnectManager/authenInfo"
import { typeForm } from "@/app/users/administrator/(component)/BtnModal"
import { typeAuthen } from "@/app/users/administrator/(component)/ModalFiledForm/connecterManager/AuthenInfo"
import {
    useContextAdmin,
    useContextAdminconnectManager
} from "@/components/cusTomHook/useContext"
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Input, Row } from "antd"
import React, { memo, useState } from "react"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
type Props = {
    CancelModal: () => void
    typeForm: typeAuthen
    typeAcTionForm: typeForm
    datarow: authenInfo
}
type FieldType = authenInfo
const FormFieldAuthenInfo: React.FC<Props> = ({
    CancelModal,
    typeForm,
    typeAcTionForm,
    datarow
}) => {
    const { setDataForm } = useContextAdminconnectManager()
    const { messageApi } = useContextAdmin()
    const [value, setValue] = useState<FieldType>({})
    const HandelerCRUD = (dataHandeler: any, dataUpdate: FieldType) => {
        if (typeAcTionForm === "ADD_MODAL") {
            dataHandeler.unshift(dataUpdate)
        }
        // if (typeAcTionForm === "UPDATE_MODAL") {
        //     const index = dataHandeler.findIndex(
        //         (item: any, index: number) => index === Number(datarow.key) - 1
        //     )

        //     dataHandeler.splice(index, 1, dataUpdate)
        // }
        if (typeAcTionForm === "REMOVE_MODAL") {
            const index = dataHandeler.findIndex(
                (item: any, index: number) => index === Number(datarow.key) - 1
            )
            dataHandeler.splice(index, 1)
        }
    }
    const save = () => {
        if (typeAcTionForm === "ADD_MODAL") {
            if (!value.name?.trim()) {
                messageApi(
                    "error",
                    `vui lòng nhập ${
                        typeForm === "fieldHeader"
                            ? "thông tin"
                            : "trường hệ thống"
                    }`
                )
                return
            }
            if (!value.value?.trim() && typeForm !== "fieldHeader") {
                messageApi("error", "vui lòng nhập giá trị")
                return
            }
        }
        setDataForm((dataForm) => {
            const authenHeader = dataForm.authenInfo.header
            const authenBody = dataForm.authenInfo.body
            const authenFieldHeader = dataForm.authenInfo.fieldsHeader
            if (typeForm === "header") {
                HandelerCRUD(authenHeader, value)
            }
            if (typeForm === "body") {
                HandelerCRUD(authenBody, value)
            }
            if (typeForm === "fieldHeader") {
                HandelerCRUD(authenFieldHeader, value)
            }
            return {
                ...dataForm,
                authenInfo: {
                    ...dataForm.authenInfo,
                    header: authenHeader,
                    body: authenBody,
                    fieldsHeader: authenFieldHeader
                }
            }
        })
        CancelModal()
    }
    const HandelerChange = (e: any) => {
        const { name, value } = e.target
        setValue((data) => ({ ...data, [name]: value }))
    }
    return (
        <>
            <Row align={"middle"} gutter={10}>
                {typeAcTionForm === "REMOVE_MODAL" || (
                    <>
                        <Col span={8}>
                            <Input
                                onChange={HandelerChange}
                                name="name"
                                size="small"
                                placeholder={`${
                                    typeForm === "fieldHeader"
                                        ? "Nhập thông tin"
                                        : "Tên trường hệ thống"
                                }`}
                            />
                        </Col>
                        {typeForm === "fieldHeader" || (
                            <>
                                <Col span={8}>
                                    <Input
                                        onChange={HandelerChange}
                                        size="small"
                                        name="value"
                                        placeholder="Giá trị"
                                    />
                                </Col>
                                <Col span={8}>
                                    <Input.TextArea
                                        onChange={HandelerChange}
                                        name="description"
                                        size="small"
                                        placeholder="Mô tả"
                                    />
                                </Col>
                            </>
                        )}
                    </>
                )}
                <div className=" flex justify-end ">
                    <Button onClick={CancelModal} danger>
                        <FontAwesomeIcon
                            icon={faTimes}
                            style={{ color: "red" }}
                        />
                    </Button>
                    <div className="ml-[10px]">
                        <Button onClick={save}>
                            <FontAwesomeIcon
                                icon={faCheck}
                                style={{ color: "green" }}
                            />
                        </Button>
                    </div>
                </div>
            </Row>
        </>
    )
}

export default memo(FormFieldAuthenInfo)
