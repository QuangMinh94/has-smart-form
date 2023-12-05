"use client"
import React, { useEffect, memo } from "react"
import {
    useContextTranfer,
    useContextBa
} from "@/components/cusTomHook/useContext"

import "@/public/css/myWork/detailMyWork.css"
import Container from "@/components/CustomTranfDrag/Container"
import ButtonLeftandRight from "@/components/CustomTranfDrag/ButtonCusTom"
import LayoutTranfer from "@/components/CustomTranfDrag/LayoutTranfer"

import CheckboxForm from "./CheckboxFormLeft"
import TreeSelectEproduct from "./TreeSelectEproduct"
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
    const { dataGlobal } = useContextBa()
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
                    HidenUI={
                        <>
                            <CheckboxForm />
                            {dataGlobal.checkedForm || (
                                <div className="mt-[8px]">
                                    <TreeSelectEproduct />
                                </div>
                            )}
                        </>
                    }
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
                    title="Biểu mẫu của nghiệp vụ"
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

export default memo(TranferNV)
