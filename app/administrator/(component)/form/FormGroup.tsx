"use client"
import React, { memo, useCallback, useState, useMemo, useEffect } from "react"
import { Group } from "@/app/(types)/Group"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { Button, Form, Input, Checkbox } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { useEnvContext } from "next-runtime-env"
import BtnModel, { typeForm } from "@/app/administrator/(component)/BtnModal"
import SelectForm from "@/components/SelectForm"
import { RevalidateListGroup } from "@/app/(actions)/action"
import {
    useContextAdmin,
    useContextTransferANTD
} from "@/components/cusTomHook/useContext"
import { addAndUpdateGroup, addUserToGroup } from "@/app/(service)/group"
import { bodyGroupRequest } from "@/app/(types)/Group"
const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
}
import { ObjIdChidrenParentPlat } from "./ObjIdParentPlats"
type Props = {
    CancelModal: () => void
    typeForm: typeForm
    rowData: Group
    addTreeChidlren: boolean
}

const FormGroup: React.FC<Props> = ({
    CancelModal,
    typeForm,
    rowData,
    addTreeChidlren
}) => {
    const {
        NEXT_PUBLIC_UPDATE_GROUP,
        NEXT_PUBLIC_ADD_GROUP,
        NEXT_PUBLIC_ADD_USER_TO_GROUP
    } = useEnvContext()
    const [form] = Form.useForm()
    const { token, session } = useCustomCookies()
    const { messageApi } = useContextAdmin()
    const [loadingBtn, setLoadingBtn] = useState<boolean>(false)
    const { setTargetKeys, targetKeys } = useContextTransferANTD()
    const [active, setActive] = useState<boolean>(
        typeForm === "UPDATE_MODAL" ? !!rowData?.active : true
    )

    useEffect(() => {
        if (typeForm === "UPDATE_MODAL") {
            setTargetKeys(rowData?.user ?? [])
        }
        if (typeForm === "ADD_MODAL") {
            setTargetKeys([])
        }
    }, [])
    const onFinish = (data: {
        nameGroup: string
        groupParent: string
        department: string
        role: string[]
    }) => {
        const bodyRequest: bodyGroupRequest = {
            parent: data.groupParent,
            name:
                data.nameGroup.charAt(0).toUpperCase() +
                data.nameGroup.slice(1),
            department: data.department,
            active: active,
            role: data.role
        }

        if (typeForm === "ADD_MODAL") {
            if (!data.groupParent) {
                delete bodyRequest.parent
            }
            addGroupFC(bodyRequest)
        }
        if (typeForm === "UPDATE_MODAL") {
            bodyRequest.id = rowData._id
            updateGroupFC(bodyRequest)
        }
    }
    const addGroupFC = async (body: bodyGroupRequest) => {
        setLoadingBtn(true)
        try {
            const resGroup = await addAndUpdateGroup({
                url: NEXT_PUBLIC_ADD_GROUP!,
                bodyRequest: body,
                token,
                session
            })
            if (resGroup.status === 200) {
                if (targetKeys.length > 0) {
                    const resUserToGroup = await addUserToGroup({
                        url: NEXT_PUBLIC_ADD_USER_TO_GROUP!,
                        bodyRequest: {
                            groupId: resGroup?.data._id,
                            listUser: targetKeys
                        },
                        token,
                        session
                    })
                }

                await RevalidateListGroup()
                CancelModal()
                messageApi("success", "Thêm mới nhóm thành công")
            }
        } catch (e: any) {
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }
    const updateGroupFC = async (body: bodyGroupRequest) => {
        setLoadingBtn(true)
        try {
            const res = await addAndUpdateGroup({
                url: NEXT_PUBLIC_UPDATE_GROUP!,
                bodyRequest: body,
                token,
                session
            })
            if (res.status === 200) {
                await RevalidateListGroup()
                CancelModal()
                messageApi("success", "Cập nhật thành công")
            }
        } catch (e: any) {
            console.log("err", e)
            messageApi("error", "có lỗi vui lòng thử lại sau")
        }
        setLoadingBtn(false)
    }

    const HandlerOnchangeGroupParent = useCallback((value: string) => {
        form.setFieldsValue({ groupParent: value })
    }, [])
    const HandlerOnchangeDepartment = useCallback((value: string) => {
        form.setFieldsValue({ department: value })
    }, [])
    const HandlerOnchangeRole = useCallback((value: string) => {
        form.setFieldsValue({ role: value })
    }, [])
    console.log("rowData", rowData)
    const objChidrenParentPlat = useMemo(() => {
        if (typeForm === "UPDATE_MODAL") {
            return ObjIdChidrenParentPlat(rowData)
        }
        return undefined
    }, [])

    return (
        <>
            <Form
                name="basic"
                form={form}
                labelCol={{ span: 7 }}
                style={{ maxWidth: 600 }}
                initialValues={
                    typeForm === "UPDATE_MODAL"
                        ? {
                              nameGroup: rowData.name,
                              groupParent: rowData?.parent?._id,
                              department: rowData?.department?._id,
                              role: rowData.role
                          }
                        : { groupParent: rowData._id }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Tên nhóm"
                    name="nameGroup"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng nhập Tên nhóm"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Thuộc nhóm"
                    name="groupParent"
                >
                    <SelectForm
                        disabled={typeForm === "ADD_MODAL" && addTreeChidlren}
                        enabledFecthData={
                            typeForm === "UPDATE_MODAL" ||
                            (typeForm === "ADD_MODAL" && addTreeChidlren)
                        }
                        type="getGroup"
                        onChange={HandlerOnchangeGroupParent}
                        objcheck={objChidrenParentPlat}
                    />
                </Form.Item>

                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Vai trò"
                    name="role"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn vai trò",
                            type: "array"
                        }
                    ]}
                >
                    <SelectForm
                        enabledFecthData={typeForm === "UPDATE_MODAL"}
                        mode="multiple"
                        type="getRoles"
                        onChange={HandlerOnchangeRole}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Đơn vị"
                    name="department"
                    rules={[
                        {
                            required: true,
                            whitespace: true,
                            message: "Vui lòng chọn đơn vị"
                        }
                    ]}
                >
                    <SelectForm
                        enabledFecthData={typeForm === "UPDATE_MODAL"}
                        type="getDepartment"
                        onChange={HandlerOnchangeDepartment}
                    />
                </Form.Item>
                <Form.Item
                    style={{ marginBottom: "25px" }}
                    label="Hoạt động"
                    name="active"
                    rules={[
                        {
                            type: "boolean"
                        }
                    ]}
                >
                    <Checkbox
                        checked={active}
                        onChange={(e) => {
                            setActive(e.target.checked)
                        }}
                    />
                </Form.Item>
                <div className="flex justify-center">
                    <BtnModel
                        type="TRANSFERFORM"
                        pathModel="ADMIN_GROUP"
                        typeFormTransfer={
                            typeForm === "UPDATE_MODAL"
                                ? "UPDATE_TRANSFER"
                                : "ADD_TRANSFER"
                        }
                        titleModel=""
                        rowData={rowData}
                    />
                </div>
                <div className="my-[25px] flex justify-end ">
                    <Button
                        type="primary"
                        style={{ minWidth: "100px" }}
                        onClick={CancelModal}
                        danger
                    >
                        Hủy
                    </Button>
                    <div className="ml-[10px]">
                        <Button
                            icon={
                                typeForm === "ADD_MODAL" ? (
                                    <PlusOutlined />
                                ) : undefined
                            }
                            loading={loadingBtn}
                            type="primary"
                            htmlType="submit"
                        >
                            {typeForm === "ADD_MODAL"
                                ? "Thêm nhóm"
                                : "Lưu thông tin"}
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default memo(FormGroup)
