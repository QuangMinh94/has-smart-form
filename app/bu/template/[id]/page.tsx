import axios from "axios"
import dynamic from "next/dynamic"
import { api } from "./_assets"
import { Board /* DragDropProvider */ } from "./_components"

const DragDropProvider = dynamic(
    () => import("./_components").then((res) => res.DragDropProvider),
    {
        loading: () => <p>Loading...</p>,
        ssr: false
    }
)

const TemplateDetailPage = async ({ params }: { params: { id: string } }) => {
    const response = await axios.post(
        "http://10.4.18.143:3000/eform/forcs/itemList",
        { repository: "Dịch vụ tài khoản" }
    )

    //generate data

    return (
        <DragDropProvider data={api.columns}>
            <Board />
        </DragDropProvider>
    )
}
export default TemplateDetailPage
