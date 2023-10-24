"use client"
import ButtonLeftandRight from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/ButtonCusTom"
import Container from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/Container"
import LayoutTranfer from "@/app/teller/(components)/mywork/Detail/CustomTranfDrag/LayoutTranfer"
import { useContextTemplate } from "@/components/cusTomHook/useContextTemplate"
import "@/public/css/myWork/detailMyWork.css"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const TransferTemplate = () => {
    const { listLeft, listRight, setListLeft, setListRight } =
        useContextTemplate()

    return (
        <DndProvider backend={HTML5Backend}>
            <LayoutTranfer
                ColLeft={
                    <Container
                        title="Danh sách block"
                        type={"left"}
                        setList={setListLeft}
                        list={listLeft}
                        setRomoveList={setListRight}
                    />
                }
                Button={<ButtonLeftandRight />}
                ColRight={
                    <Container
                        title="Block được chọn"
                        type={"right"}
                        setList={setListRight}
                        list={listRight}
                        setRomoveList={setListLeft}
                    />
                }
            />
        </DndProvider>
    )
}

export default TransferTemplate
