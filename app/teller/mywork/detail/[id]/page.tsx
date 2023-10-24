import Tranfer from "../../../(components)/mywork/Detail/TranferMyWork"
import Provider from "../../../(components)/provider/ProviderMywork"
const DetailMyWork = ({ params }: { params: { id: string } }) => {
    return (
        <Provider>
            <Tranfer />
        </Provider>
    )
}

export default DetailMyWork
