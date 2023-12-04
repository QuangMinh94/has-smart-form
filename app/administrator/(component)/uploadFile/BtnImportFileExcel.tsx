import { Button, Spin } from "antd"
import axios from "axios"
import React, { useRef, useState } from "react"
import { read, utils } from "xlsx"
import { useContextAdmin } from "@/components/cusTomHook/useContext"
import { AuthenProvider } from "@/app/(types)/AuthenProvider"
import { Department } from "@/app/(types)/Department"
import { Group } from "@/app/(types)/Group"
import { TemlateExcel, Users } from "@/app/(types)/Users"
import { useEnvContext } from "next-runtime-env"
import useCustomCookies from "@/components/cusTomHook/useCustomCookies"
import { GetAuthen } from "@/app/(service)/authen"
import { getDepartment } from "@/app/(service)/department"
import { getGroup } from "@/app/(service)/group"
import { useContextAdminUser } from "@/components/cusTomHook/useContext"
type Typeprops = {
    setmodal: React.Dispatch<React.SetStateAction<boolean>>
    setOpenPopoverOption: React.Dispatch<React.SetStateAction<boolean>>
}

const BtnImportFileExcel: React.FC<Typeprops> = ({
    setmodal,
    setOpenPopoverOption
}) => {
    const {
        NEXT_PUBLIC_GET_AUTH,
        NEXT_PUBLIC_GET_GROUP,
        NEXT_PUBLIC_GET_DEPARTMENT
    } = useEnvContext()
    const { token, session } = useCustomCookies()
    const domInputFile = useRef<any>()
    const { messageApi } = useContextAdmin()
    const [loading, setLoading] = useState<boolean>(false)
    const { setDataGlobal } = useContextAdminUser()
    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        const typeFile = file.name.split(".").pop().toLowerCase()
        const reader = new FileReader()
        reader.onload = async (event: any) => {
            setLoading(true)
            try {
                const data = event.target.result
                const workbook = read(data, { type: "binary" })
                // Lấy dữ liệu từ sheet đầu tiên
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const excelData: TemlateExcel[] = utils.sheet_to_json(worksheet)

                const cusTomExcelData: Users[] = []
                const [reqGroup, reqDepartment, reqAuthen] = await axios.all([
                    getGroup({
                        url: NEXT_PUBLIC_GET_GROUP!,
                        bodyRequest: { Active: true },
                        session,
                        token
                    }),
                    getDepartment({
                        url: NEXT_PUBLIC_GET_DEPARTMENT!,
                        bodyRequest: { Active: true },
                        session,
                        token
                    }),
                    GetAuthen({
                        url: NEXT_PUBLIC_GET_AUTH!,
                        bodyRequest: { Active: true },
                        session,
                        token
                    })
                ])

                const Listgroups: Group[] = reqGroup?.data
                const ListDepartment: Department[] = reqDepartment?.data
                const ListAuthen: AuthenProvider[] = reqAuthen?.data
                // add vào id tương ứng trong database
                excelData.forEach((item) => {
                    const _Department = ListDepartment.find(
                        (item2) =>
                            item2?.name?.toLowerCase().trim() ===
                            item?.Department?.toLowerCase().trim()
                    )
                    const _Group = Listgroups.filter(
                        (item) => item.department?._id === _Department?._id
                    ).find(
                        (item2) =>
                            item2?.name?.toLowerCase().trim() ===
                            item?.Group?.toLowerCase().trim()
                    )
                    const _Authen = ListAuthen.find(
                        (item2) =>
                            item2?.type?.toLowerCase().trim() ===
                            item?.AuthenProvider?.toLowerCase().trim()
                    )
                    cusTomExcelData.push({
                        firstName: item?.FirstName?.toString() ?? "",
                        lastName: item?.LastName?.toString() ?? "",
                        group: [
                            { _id: _Group?._id ?? "", name: item?.Group ?? "" }
                        ],
                        mail: item.Email,
                        department: {
                            _id: _Department?._id ?? "",
                            name: item?.Department ?? "",
                            active: true,
                            organization: "",
                            parent: "",
                            type: "",
                            code: "",
                            address: "",
                            stage: "",
                            distric: ""
                        },
                        authenProvider: {
                            _id: _Authen?._id ?? "",
                            Name: _Authen?.name ?? "",
                            Type: _Authen?.type ?? "",
                            NameMsg: item?.AuthenProvider ?? ""
                        },
                        userName: item?.UserName?.toString() ?? "",
                        _id: item?.__rowNum__,
                        active: true,
                        phone: item?.PhoneNumber?.toString() ?? "",
                        defaultGroup: {
                            _id: _Group?._id ?? "",
                            name: item?.Group ?? ""
                        }
                    })
                })
                const checkCusTomExcelData = cusTomExcelData.find((item) => {
                    return (
                        `${item.firstName}`.length <= 0 ||
                        `${item.lastName}`.length <= 0 ||
                        `${item?.userName}`.length <= 0 ||
                        `${item?.mail}`.length <= 0 ||
                        (item?.department?._id || "").length <= 0 ||
                        `${item?.group?.[0]._id}`.length <= 0 ||
                        item.authenProvider?._id.length <= 0
                    )
                })
                // nếu checkCusTomExcelData  === undefined thì nghĩa là dữ liệu đầy đủ tất cả các trường
                if (!checkCusTomExcelData) {
                    messageApi(
                        "success",
                        `${file.name} file uploaded sccessfully`
                    )
                    setmodal(true)
                    setOpenPopoverOption(false)
                    setDataGlobal((data) => ({
                        ...data,
                        DataUploadUsers: cusTomExcelData
                    }))
                } else {
                    function msgErr(data: {
                        stt: string
                        Field: string
                        valueField: string
                    }): string {
                        return `Stt: "${data.stt + 1}"   ${data.Field}: "${
                            data.valueField
                        }" error`
                    }
                    const msg =
                        `${checkCusTomExcelData.firstName}`.length <= 0
                            ? msgErr({
                                  stt: checkCusTomExcelData._id ?? "",
                                  Field: "FirstName",
                                  valueField:
                                      checkCusTomExcelData.firstName ?? ""
                              })
                            : `${checkCusTomExcelData.lastName}`.length <= 0
                            ? msgErr({
                                  stt: checkCusTomExcelData._id ?? "",
                                  Field: "LastName",
                                  valueField:
                                      checkCusTomExcelData.lastName ?? ""
                              })
                            : `${checkCusTomExcelData.userName}`.length <= 0
                            ? msgErr({
                                  stt: checkCusTomExcelData._id ?? "",
                                  Field: "UserName",
                                  valueField:
                                      checkCusTomExcelData.userName ?? ""
                              })
                            : `${checkCusTomExcelData.mail}`.length <= 0
                            ? msgErr({
                                  stt: checkCusTomExcelData._id ?? "",
                                  Field: "Mail",
                                  valueField: checkCusTomExcelData.mail ?? ""
                              })
                            : `${checkCusTomExcelData.department?._id}`
                                  .length <= 0
                            ? msgErr({
                                  stt: checkCusTomExcelData._id ?? "",
                                  Field: "Department",
                                  valueField:
                                      checkCusTomExcelData.department?.name ??
                                      ""
                              })
                            : `${checkCusTomExcelData?.group?.[0]._id}`
                                  .length <= 0
                            ? msgErr({
                                  stt: checkCusTomExcelData._id ?? "",
                                  Field: "Group",
                                  valueField:
                                      checkCusTomExcelData?.group?.[0]?.name ??
                                      ""
                              })
                            : checkCusTomExcelData.authenProvider?._id.length <=
                              0
                            ? msgErr({
                                  stt: checkCusTomExcelData._id ?? "",
                                  Field: "AuthenProvider",
                                  valueField:
                                      checkCusTomExcelData?.authenProvider
                                          ?.NameMsg ?? ""
                              })
                            : "lỗi"
                    messageApi("error", msg)
                }
            } catch (e) {
                alert("có lỗi")
            }
            setLoading(false)
            // Dữ liệu từ file Excel
        }
        if (typeFile === "csv" || typeFile === "xlsx" || typeFile === "xls") {
            reader.readAsBinaryString(file)
        } else {
            messageApi("error", "File type not allow")
        }
    }

    const handelerClick = () => {
        domInputFile?.current?.click()
        domInputFile.current.value = null
    }

    return (
        <>
            {loading && (
                <div
                    style={{
                        backgroundColor: "rgba(235, 231, 231, 0.5)",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999
                    }}
                >
                    <Spin tip="Loading" size="large" />
                </div>
            )}
            <Button
                className="button-export-view"
                type="text"
                onClick={handelerClick}
                size="middle"
                style={{ width: "100%" }}
            >
                Upload File
            </Button>
            <input
                style={{ display: "none" }}
                ref={domInputFile}
                type="file"
                onChange={handleFileChange}
            />
        </>
    )
}
export default BtnImportFileExcel
