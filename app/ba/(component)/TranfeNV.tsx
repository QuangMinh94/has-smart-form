"use client"
import React, { useEffect, memo } from "react"
import { useContextTranfer } from "@/components/cusTomHook/useContext"
import "@/public/css/myWork/detailMyWork.css"
import Container from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/Container"
import ButtonLeftandRight from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/ButtonCusTom"
import LayoutTranfer from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/LayoutTranfer"

import CheckboxForm from "./CheckboxFormLeft"
const TranferNV = () => {
    const {
        listLeft,
        listRight,
        setListLeft,
        setListRight,
        ChangeListFilter,
        setChangeListFilter,
        loading
    } = useContextTranfer()

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
            isCollapse={false}
            ColLeft={
                <Container
                    HidenUI={<CheckboxForm />}
                    setChangeListFilter={setChangeListFilter}
                    ChangeListFilter={ChangeListFilter}
                    title="Danh sách biểu mẫu"
                    type={"left"}
                    setList={setListLeft}
                    list={listLeft}
                    setRomoveList={setListRight}
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
                    title="Biểu mẫu của nghiệp vụ"
                    type="right"
                    setChangeListFilter={setChangeListFilter}
                    ChangeListFilter={ChangeListFilter}
                    setList={setListRight}
                    list={listRight}
                    setRomoveList={setListLeft}
                    loading={loading}
                />
            }
        />
    )
}

export default memo(TranferNV)
