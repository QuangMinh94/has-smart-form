import { faCloudSun, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Col, Flex, Row } from "antd"
import { ReactNode } from "react"
import CustomerServiceFilter from "./CustomerServiceFilter"

const CustomerServiceComp = ({ searchParam }: { searchParam: string }) => {
    return (
        <Card>
            <Flex vertical className="ml-3" gap={10}>
                <Flex vertical>
                    <div>
                        <FontAwesomeIcon className="w-5" icon={faCloudSun} />
                    </div>
                    <p>Chúc bạn buổi chiều vui vẻ,</p>
                    <p>Hôm nay quý khách đang tìm kiếm thông tin gì</p>
                </Flex>
                <CustomerServiceFilter searchParam={searchParam} />

                <Row>
                    <Col
                        lg={4}
                        className="bg-cover"
                        style={{ backgroundImage: `url(/img/money.png)` }}
                    >
                        <PictureComp
                            title={"Tiền gửi"}
                            icon={<FontAwesomeIcon icon={faMoneyBill} />}
                        />
                    </Col>
                    <Col
                        lg={4}
                        className="bg-cover"
                        style={{ backgroundImage: `url(/img/phone.png)` }}
                    ></Col>
                    <Col
                        lg={4}
                        className="bg-cover"
                        style={{ backgroundImage: `url(/img/piggyBank.png)` }}
                    ></Col>
                    <Col
                        lg={4}
                        className="bg-cover"
                        style={{ backgroundImage: `url(/img/rock.png)` }}
                    ></Col>
                    <Col
                        lg={4}
                        className="bg-cover"
                        style={{ backgroundImage: `url(/img/card.png)` }}
                    ></Col>
                </Row>
            </Flex>
        </Card>
    )
}

const PictureComp = ({ title, icon }: { title: string; icon: ReactNode }) => {
    return (
        <Flex vertical align="center" justify="space-between">
            <p>{title}</p>
            {icon}
        </Flex>
    )
}

export default CustomerServiceComp
