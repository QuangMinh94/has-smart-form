import CustomerServiceComp from "./CustomerServiceComp"

interface Props {
    searchParams: { product: string }
}

const CustomerServicePage = ({ searchParams }: Props) => {
    return <CustomerServiceComp searchParam={searchParams.product} />
}

export default CustomerServicePage
