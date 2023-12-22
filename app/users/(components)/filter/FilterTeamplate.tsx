"use client"
import DatePicker from "@/components/DatePickerFillter"
import SlectorFilter from "@/components/selector/RemoteSlectorFilter"
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Popover, theme } from "antd"
import { useRouter, useSearchParams } from "next/navigation"
import React, { memo, useCallback, useState, useTransition } from "react"
function removeCharAt(str: string, index: number) {
    const firstPart = str.substring(0, index)
    const secondPart = str.substring(index + 1)
    const result = firstPart + secondPart
    return result
}
const conditionParams = (
    key:
        | "creator"
        | "approved"
        | "status"
        | "major"
        | "timecreate"
        | "timeend"
        | "name",
    value: string
): string => {
    return value ? `&${key}=${encodeURIComponent(value)}` : ""
}
export const params = ({
    creator,
    approved,
    status,
    major,
    timecreate,
    timeend,
    name
}: {
    creator: string
    approved: string
    status: string
    major: string
    timecreate: string
    timeend: string
    name: string
}): string => {
    creator = conditionParams("creator", creator)
    approved = conditionParams("approved", approved)
    status = conditionParams("status", status)
    major = conditionParams("major", major)
    timecreate = conditionParams("timecreate", timecreate)
    timeend = conditionParams("timeend", timeend)
    name = conditionParams("name", name)
    const query = `?${creator}${approved}${status}${major}${timecreate}${timeend}${name}`
    return removeCharAt(query, 1)
}
export const useCustomeSearchParamsFilter = () => {
    const searchParams = useSearchParams()
    return {
        creator: searchParams.get("creator") ?? "",
        approved: searchParams.get("approved") ?? "",
        status: searchParams.get("status") ?? "",
        major: searchParams.get("major") ?? "",
        timecreate: searchParams.get("timecreate") ?? "",
        timeend: searchParams.get("timeend") ?? "",
        name: searchParams.get("name") ?? ""
    }
}
const RowContent: React.FC<{
    label: string
    select: React.ReactElement
}> = ({ label, select }) => {
    return (
        <div className="flex my-[20px] items-center">
            <div className="flex-1 font-semibold"> {label}</div>
            <div className="w-[70%]">{select}</div>
        </div>
    )
}
const ContenPopover: React.FC = () => {
    const { creator, approved, status, major, timecreate, timeend, name } =
        useCustomeSearchParamsFilter()
    const route = useRouter()
    const [loading, transition] = useTransition()
    const defaultValue = {
        creator,
        approved,
        status,
        major,
        timecreate,
        timeend
    }
    const [value, setValue] = useState<{
        creator: string
        approved: string
        status: string
        major: string
        timecreate: string
        timeend: string
    }>(defaultValue)
    console.log(value)
    const onChangeCreator = useCallback((value: string) => {
        setValue((data) => ({ ...data, creator: value }))
    }, [])
    const onChangeApproved = useCallback((value: string) => {
        setValue((data) => ({ ...data, approved: value }))
    }, [])
    const onChangeStatus = useCallback((value: string) => {
        setValue((data) => ({ ...data, status: value }))
    }, [])
    const onChangeMajor = useCallback((value: string) => {
        setValue((data) => ({ ...data, major: value }))
    }, [])
    const onChangeTimecreate = useCallback((value: string) => {
        setValue((data) => ({ ...data, timecreate: value }))
    }, [])
    const onChangeTimeEnd = useCallback((value: string) => {
        setValue((data) => ({ ...data, timeend: value }))
    }, [])
    const HanderOnClick = (type: "search" | "notSearch") => {
        transition(() => {
            if (type === "search") {
                route.push(
                    params({
                        creator: value.creator,
                        approved: value.approved,
                        status: value.status,
                        major: value.major,
                        timecreate: value.timecreate,
                        timeend: value.timeend,
                        name: name
                    })
                )
            } else {
                route.push("?")
                setValue({
                    creator: "",
                    status: "",
                    major: "",
                    timecreate: "",
                    timeend: "",
                    approved: ""
                })
            }
        })
    }
    return (
        <div className="min-w-[25vw] max-w-[25vw]">
            <RowContent
                label="Người tạo"
                select={
                    <SlectorFilter
                        enabledFecthData={true}
                        type="getUser"
                        onChange={onChangeCreator}
                        value={value.creator}
                    />
                }
            />
            <RowContent
                label="Người duyệt"
                select={
                    <SlectorFilter
                        enabledFecthData={true}
                        type="getUser"
                        onChange={onChangeApproved}
                        value={value.approved}
                    />
                }
            />
            <RowContent
                label="Trạng thái"
                select={
                    <SlectorFilter
                        enabledFecthData={true}
                        type="getcategories"
                        onChange={onChangeStatus}
                        value={value.status}
                    />
                }
            />
            <RowContent
                label="Nghiêp vụ"
                select={
                    <SlectorFilter
                        enabledFecthData={true}
                        type="getEProduct"
                        onChange={onChangeMajor}
                        value={value.major}
                    />
                }
            />
            <RowContent
                label="Ngày tạo"
                select={
                    <DatePicker
                        onChange={onChangeTimecreate}
                        defaultValue={value.timecreate}
                    />
                }
            />
            <RowContent
                label="Ngày kết thúc"
                select={
                    <DatePicker
                        onChange={onChangeTimeEnd}
                        defaultValue={value.timeend}
                    />
                }
            />
            <div className="flex justify-end">
                <Button
                    style={{ marginRight: "10px" }}
                    onClick={() => HanderOnClick("notSearch")}
                    loading={loading}
                    type="primary"
                    danger
                >
                    Hủy Tìm
                </Button>
                <Button
                    onClick={() => HanderOnClick("search")}
                    loading={loading}
                    type="primary"
                >
                    Tìm kiếm
                </Button>
            </div>
        </div>
    )
}
const Fillter: React.FC = () => {
    const [open, setOpen] = useState(false)
    const {
        token: { colorPrimary }
    } = theme.useToken()

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    return (
        <Popover
            destroyTooltipOnHide={true}
            content={<ContenPopover />}
            title={
                <div className="flex items-center border-b-[1px] border-solid border-stone-500">
                    <h1 className="flex-1  text-lg">Bộ lọc</h1>
                    <FontAwesomeIcon
                        className="cursor-pointer hover:opacity-40 text-base "
                        style={{ color: "black" }}
                        icon={faTimes}
                        onClick={() => {
                            handleOpenChange(false)
                        }}
                    />
                </div>
            }
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            <FontAwesomeIcon
                className="cursor-pointer hover:opacity-40 text-xl"
                style={{ color: colorPrimary }}
                icon={faFilter}
            />
        </Popover>
    )
}

export default memo(Fillter)
