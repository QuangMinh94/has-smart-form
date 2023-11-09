"use client"
import React, { useEffect, memo } from "react"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import "@/public/css/myWork/detailMyWork.css"
import Container from "./CustomTranfDrag/Container"
import ButtonLeftandRight from "./CustomTranfDrag/ButtonCusTom"
import LayoutTranfer from "./CustomTranfDrag/LayoutTranfer"

import HeaderUi from "../Detail/HeaderUiContent"

const DetailFormUser = () => {
    const {
        listLeft,
        listRight,
        setListLeft,
        setListRight,
        ChangeListFilter,
        setChangeListFilter,
        loading
    } = useContextMyWorkDetail()

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
