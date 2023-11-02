"use client"
import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useContextMyWorkDetail } from "@/components/cusTomHook/useContext"
import axios from "axios"
import "@/public/css/myWork/detailMyWork.css"
import Container from "./CustomTranfDrag/Container"
import ButtonLeftandRight from "./CustomTranfDrag/ButtonCusTom"
import LayoutTranfer from "./CustomTranfDrag/LayoutTranfer"
import { DataTranfer } from "@/app/(types)/typeDataTranfe"
import { EformList } from "@/app/(types)/EformList"
import Loading from "@/app/teller/mywork/loading"
import SelectEproduct from "../../customSelect/SelectEproduct"
import HeaderUi from "../Detail/HeaderUiContent"
interface DataTranfeCustom extends DataTranfer {
    repository: string
}
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
        setListRight([])
    }, [])
   
    return (
        <LayoutTranfer
            ColLeft={
                <Container
                    HidenUI={<HeaderUi />}
                    setChangeListFilter={setChangeListFilter}
                    ChangeListFilter={ChangeListFilter}
                    title="Danh sách block"
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
                    title="Block được chọn"
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

export default DetailFormUser
