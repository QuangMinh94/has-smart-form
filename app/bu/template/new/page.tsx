import ProviderTemplate from "@/components/context/providerTemplate"
import NewTemplateWrapper from "./NewTemplateWrapper"

const NewTemplate = () => {
    return (
        <ProviderTemplate>
            <NewTemplateWrapper key="insert" data={[]} />
        </ProviderTemplate>
    )
}

export default NewTemplate
