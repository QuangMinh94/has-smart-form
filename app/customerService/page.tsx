import CustomerServiceComp from "./CustomerServiceComp"

interface Props {
    searchParams: { status: string }
}

const CustomerServicePage = ({ searchParams }: Props) => {
    return <CustomerServiceComp searchParam={searchParams.status} />
}

export default CustomerServicePage
