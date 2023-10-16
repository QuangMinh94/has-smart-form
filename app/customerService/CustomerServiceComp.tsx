import { faCloudSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Flex } from "antd"
import CustomerServiceFilter from "./CustomerServiceFilter"

const CustomerServiceComp = ({ searchParam }: { searchParam: string }) => {
    return (
        <Flex vertical className="ml-3">
            <div>
                <FontAwesomeIcon className="w-5" icon={faCloudSun} />
            </div>
            <p>Chúc bạn buổi chiều vui vẻ,</p>
            <p>Hôm nay quý khách đang tìm kiếm thông tin gì</p>
            <CustomerServiceFilter searchParam={searchParam} />
        </Flex>
    )
}

export default CustomerServiceComp
