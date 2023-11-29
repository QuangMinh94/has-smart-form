import FilterOption from "@/components/FilterOptions"
import ResultTable from "@/components/ResultTable"
import QueriesTemplate from "@/components/context/queriesTemplate"

const QueriesPage = ({
    searchParams
}: {
    searchParams: {
        citizenId: string
        appointmentCode: string
        name: string
        channel: string[]
        fromDate: number | undefined
        toDate: number | undefined
        status: string
        executor: string[]
        eProduct: string[]
    }
}) => {
    let searchInput = {}
    if (searchParams) {
        for (var key in searchParams) {
            Object.assign(searchInput, {
                [key]: searchParams[key as keyof typeof searchInput]
            })
        }
    }
    console.log("SearchInput", searchInput)

    return (
        <QueriesTemplate>
            <FilterOption />
            <ResultTable data={[]} />
        </QueriesTemplate>
    )
}

export default QueriesPage
