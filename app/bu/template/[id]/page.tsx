import OzViewer from "@/components/OzViewer"
import TemplatesProvider from "@/components/context/templateContext"
import axios from "axios"
import dynamic from "next/dynamic"
import { v4 } from "uuid"
import { ColumnType, TaskBoardType } from "./_assets"
import { DragDropProvider } from "./_components"
//import { Board } from "./_components"
const Board = dynamic(() => import("./_components").then((res) => res.Board), {
    ssr: false
})

const TemplateDetailPage = async ({ params }: { params: { id: string } }) => {
    const responseTk = await axios.post(
        "http://10.4.18.143:3000/eform/forcs/itemList",
        { repository: "Dịch vụ tài khoản" }
    )

    const responseThẻ = await axios.post(
        "http://10.4.18.143:3000/eform/forcs/itemList",
        { repository: "Thẻ" }
    )

    const allBlock: ColumnType = {
        id: v4(),
        title: "Danh sách block",
        tasks: []
    }

    responseTk.data.forEach((item: any) => {
        allBlock.tasks.push({ content: item.name, id: v4() })
    })

    const chosenBLock: ColumnType = {
        id: v4(),
        title: "Danh sách block được chọn",
        tasks: []
    }

    const allColumns: TaskBoardType = {
        columns: [allBlock, chosenBLock]
    }

    return (
        <>
            <TemplatesProvider>
                <DragDropProvider data={allColumns.columns}>
                    <Board />
                </DragDropProvider>
                <OzViewer url={process.env.EFORM_SERVER_APP!} />
            </TemplatesProvider>
        </>
    )
}
export default TemplateDetailPage
