"use client"
import React, { useEffect } from "react"
import { useContextMyWork } from "@/components/cusTomHook/useContext"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import "@/public/css/myWork/detailMyWork.css"
import Container from "./CustomTranfDrag/Container"
import ButtonLeftandRight from "./CustomTranfDrag/ButtonCusTom"
import LayoutTranfer from "./CustomTranfDrag/LayoutTranfer"

const DetailFormUser = () => {
    const {
        listLeft,
        listRight,
        setListLeft,
        setListRight,
        ChangeListFilter,
        setChangeListFilter
    } = useContextMyWork()

    useEffect(() => {
        function getMock() {
            const arr = []
            for (let i = 0; i <= 100; i++) {
                arr.push({
                    id: i,
                    name: `name ${i}`,
                    checkBox: false
                })
            }
            setListLeft(arr)
        }
        setListLeft([])
        getMock()
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <LayoutTranfer
                ColLeft={
                    <Container
                        setChangeListFilter={setChangeListFilter}
                        ChangeListFilter={ChangeListFilter}
                        title="col1"
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
                        title="col2"
                        type="right"
                        setChangeListFilter={setChangeListFilter}
                        ChangeListFilter={ChangeListFilter}
                        setList={setListRight}
                        list={listRight}
                        setRomoveList={setListLeft}
                    />
                }
            />
        </DndProvider>
    )
}

export default DetailFormUser
