"use client"

import OzViewer from "@/components/OzViewer"

const OzViewerWrapper = () => {
    const onPreview = () => {}
    const onSubmit = () => {}
    const onSave = () => {}
    const onCancel = () => {}
    return (
        <OzViewer
            url={process.env.NEXT_PUBLIC_EFORM_SERVER_APP!}
            onPreview={onPreview}
            onSubmit={onSubmit}
            onSave={onSave}
            onCancel={onCancel}
        />
    )
}

export default OzViewerWrapper
