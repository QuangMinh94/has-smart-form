"use client"
import React, { useEffect, memo } from "react"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import "@/public/css/myWork/detailMyWork.css"
import Container from "@/components/CustomTranfDrag/Container"
import ButtonLeftandRight from "@/components/CustomTranfDrag/ButtonCusTom"
import LayoutTranfer from "@/components/CustomTranfDrag/LayoutTranfer"
import { usePathname } from "next/navigation"
import HeaderUi from "../Detail/HeaderUiContent"

const DetailFormUser = ({ Disabled }: { Disabled: boolean }) => {
    const {
        listLeft,
        listRight,
        setListLeft,
        setListRight,
        ChangeListFilter,
        setChangeListFilter,
        loading
    } = useContextMyWorkDetail()

    const pathName = usePathname()
    useEffect(() => {
        if (listRight.length > 0) {
            setListRight([])
        }
        if (listLeft.length > 0) {
            setListLeft([])
        }
    }, [])

    return (
        <LayoutTranfer
            isDisabled={Disabled}
            HiddenColLeft={pathName.startsWith("/ksvteller")}
            ColLeft={
                <Container
                    HidenUI={<HeaderUi />}
                    setChangeListFilter={setChangeListFilter}
                    ChangeListFilter={ChangeListFilter}
                    title="Danh sách biểu mẫu"
                    type={"left"}
                    setList={setListLeft}
                    list={listLeft}
                    setRomoveList={setListRight}
                    loading={loading}
                />
            }
            Button={
                <ButtonLeftandRight
                    listLeft={listLeft}
                    listRight={listRight}
                    setListLeft={setListLeft}
                    setListRight={setListRight}
                    setChangeListFilter={setChangeListFilter}
                />
            }
            ColRight={
                <Container
                    title="Biểu mẫu được chọn"
                    type="right"
                    setChangeListFilter={setChangeListFilter}
                    ChangeListFilter={ChangeListFilter}
                    setList={setListRight}
                    list={listRight}
                    setRomoveList={setListLeft}
                />
            }
        />
    )
}

export default memo(DetailFormUser)
