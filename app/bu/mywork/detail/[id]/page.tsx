import Tranfer from "@/components/mywork/Detail/TranferMyWork"
import LoadviewPDF from "@/components/mywork/Detail/reactPDF/LoadViewPDF"
const DetailMyWork = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <Tranfer />
            <LoadviewPDF />
        </>
    )
}

export default DetailMyWork
