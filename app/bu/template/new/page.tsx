import TemplatesProvider from "@/components/context/templateContext"
import OzViewerWrapper from "./OzViewerWrapper"
import TemplateForm from "./TemplateForm"

const NewTemplate = () => {
    return (
        <TemplatesProvider>
            {/*  <DragDropProvider data={allColumns.columns}>
                <Board />
            </DragDropProvider> */}
            <TemplateForm />
            <OzViewerWrapper />
        </TemplatesProvider>
    )
}

export default NewTemplate
