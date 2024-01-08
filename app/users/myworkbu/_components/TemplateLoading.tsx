import TemplateTable from "../../(components)/templateTable"
import PageHeader from "./PageHeader"

export const TemplateLoading = () => {
    const data = [
        {
            key: "1",
            formName: "1",
            approval: "1",
            validFrom: "1",
            status: "1"
        },
        {
            key: "2",
            formName: "2",
            approval: "2",
            validFrom: "2",
            status: "2"
        }
    ]
    return (
        <div>
            <PageHeader path="/bu/template" addNewPermission={false}>
                <TemplateTable
                    readOnly={true}
                    data={data}
                    ksvPermission={false}
                    prerender={true}
                />
            </PageHeader>
        </div>
    )
}
