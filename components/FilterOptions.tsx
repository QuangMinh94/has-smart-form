"use client"

import { CategoryTypes } from "@/app/(types)/Categories"
import { EndDateFormat, StartDateFormat } from "@/app/(utilities)/DateFormatter"
import {
    faFilter,
    faFilterCircleXmark
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, DatePicker, Flex, Input, Popover, Row } from "antd"
import { RangePickerProps } from "antd/es/date-picker"
import dayjs, { Dayjs } from "dayjs"
import { useCookies } from "next-client-cookies"
import { useEnvContext } from "next-runtime-env"
import { useRouter } from "next/navigation"
import { ReactNode, useContext, useState } from "react"
import QueriesContext, { createDate } from "./context/queriesContext"
import RemoteSelectorCategory from "./selector/RemoteSelectorCategory"
import RemoteSelectorUser from "./selector/RemoteSelectorUser"

const { Search } = Input

const FilterOption = () => {
    const [openFilter, setOpenFilter] = useState(false)
    const router = useRouter()
    const {
        citizenId,
        setCitizenId,
        appointmentCode,
        name,
        channel,
        createDate,
        status,
        executor,
        eProduct,
        officeBranch
    } = useContext(QueriesContext)

    const onEnterKeyPress = () => {
        let routeParams = "?"
        routeParams = MapParams(routeParams, "citizenId", citizenId)
        routeParams = MapParams(routeParams, "appointmentCode", appointmentCode)
        routeParams = MapParams(routeParams, "name", name)
        routeParams = MapParams(routeParams, "channel", channel.toString())
        if (createDate) {
            MapParams(routeParams, "from", createDate.from.toString())
            MapParams(routeParams, "to", createDate.to.toString())
        }
        routeParams = MapParams(routeParams, "status", status.toString())
        routeParams = MapParams(routeParams, "executor", executor.toString())
        routeParams = MapParams(routeParams, "eProduct", eProduct.toString())
        routeParams = MapParams(
            routeParams,
            "officeBranch",
            officeBranch.toString()
        )
        const lastChar = routeParams.substring(routeParams.length - 1) // => "1"
        if (lastChar === "&") {
            routeParams = routeParams.slice(0, -1)
        }
        router.replace("/teller/queries/" + routeParams)
    }
    return (
        <Flex align="center" gap={10}>
            <Search
                style={{ width: 300 }}
                placeholder="Tìm theo CCCD"
                allowClear
                value={citizenId}
                onChange={(e) => setCitizenId(e.target.value.trim())}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onEnterKeyPress()
                    }
                }}
            />

            <Button type="primary" onClick={onEnterKeyPress}>
                Tìm kiếm
            </Button>
            <Popover
                placement="bottom"
                title={<h1>Filter</h1>}
                content={<FilterComponent onKeyPress={onEnterKeyPress} />}
                trigger="click"
                onOpenChange={async () => {
                    setOpenFilter(!openFilter)
                }}
            >
                {!openFilter ? (
                    <FontAwesomeIcon
                        icon={faFilter}
                        size="lg"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => setOpenFilter(!openFilter)}
                    />
                ) : (
                    <FontAwesomeIcon
                        icon={faFilterCircleXmark}
                        size="lg"
                        style={{ float: "right", cursor: "pointer" }}
                        onClick={() => setOpenFilter(!openFilter)}
                    />
                )}
            </Popover>
        </Flex>
    )
}

const MapParams = (params: string, field: string, value: string) => {
    if (value && !params.includes(field)) {
        params += field + "=" + value + "&"
    }
    return params
}

const MiniComp = ({
    condition,
    value
}: {
    condition: ReactNode
    value: ReactNode
}) => {
    return (
        <Row gutter={10} style={{ marginBottom: "5px" }}>
            <Col span={8}>{condition}</Col>
            <Col span={16} style={{ width: "100%" }}>
                {value}
            </Col>
        </Row>
    )
}

const rangePresets: {
    label: string
    value: [Dayjs, Dayjs]
}[] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] }
]

const FilterComponent = ({ onKeyPress }: { onKeyPress: () => void }) => {
    const {
        citizenId,
        setCitizenId,
        appointmentCode,
        setAppointmentCode,
        setName,
        setCreateDate,
        createDate,
        setStatus,
        setExecutor
    } = useContext(QueriesContext)
    const { NEXT_PUBLIC_CATEGORY, NEXT_PUBLIC_GET_EXECUTOR } = useEnvContext()
    const { RangePicker } = DatePicker
    const cookies = useCookies()
    const axiosHeader: any = {
        Authorization: "Bearer " + cookies.get("token"),
        Session: cookies.get("session")
    }

    const onRangeDueDateChange = (
        value: RangePickerProps["value"],
        dateString: [string, string] | string
    ) => {
        if (value) {
            const dateFilter: createDate = {
                from: StartDateFormat(value[0]!),
                to: EndDateFormat(value[1]!)
            }

            setCreateDate(dateFilter)
        } else {
            setCreateDate(undefined)
        }
    }
    return (
        <Flex vertical>
            {/* <MiniComp
                condition={<p>CCCD</p>}
                value={
                    <Input
                        onChange={(e) => setCitizenId(e.target.value.trim())}
                    />
                }
            />*/}
            <MiniComp
                condition={<p>Mã giao dịch</p>}
                value={
                    <Input
                        onBlur={(e) =>
                            setAppointmentCode(e.target.value.trim())
                        }
                    />
                }
            />
            <MiniComp
                condition={<p>Tên khách hàng</p>}
                value={<Input onBlur={(e) => setName(e.target.value.trim())} />}
            />
            <MiniComp
                condition={<p>Sản phẩm</p>}
                value={<Input onBlur={(e) => setName(e.target.value.trim())} />}
            />
            <MiniComp
                condition={<p>Kênh</p>}
                value={
                    <RemoteSelectorCategory
                        type={CategoryTypes.CHANNEL}
                        url={NEXT_PUBLIC_CATEGORY!}
                        header={axiosHeader}
                    />
                }
            />
            <MiniComp
                condition={<p>Ngày tạo</p>}
                value={
                    <RangePicker
                        allowClear
                        presets={rangePresets}
                        onChange={onRangeDueDateChange}
                        style={{ width: "100%" }}
                        placeholder={["From", "To"]}
                    />
                }
            />
            <MiniComp
                condition={<p>Trạng thái</p>}
                value={
                    <RemoteSelectorCategory
                        type={CategoryTypes.STATUS_FORM}
                        url={NEXT_PUBLIC_CATEGORY!}
                        header={axiosHeader}
                    />
                }
            />
            <MiniComp
                condition={<p>Người thực hiện</p>}
                value={
                    <RemoteSelectorUser
                        url={NEXT_PUBLIC_GET_EXECUTOR!}
                        header={axiosHeader}
                    />
                }
            />
            <MiniComp
                condition={<p>Đơn vị</p>}
                value={<Input onBlur={(e) => setName(e.target.value.trim())} />}
            />
            <Button type="primary" onClick={onKeyPress}>
                Xác nhận
            </Button>
        </Flex>
    )
}

export default FilterOption
