"use client"
// Core viewer
import { Viewer, Worker } from "@react-pdf-viewer/core"

// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

const View = () => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin()
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    height: "750px"
                }}
            >
                <Viewer
                    fileUrl={"./test.pdf"}
                    plugins={[
                        // Register plugins
                        defaultLayoutPluginInstance
                    ]}
                />
            </div>
        </Worker>
    )
}
export default View
