import React from "react"
import { Document, Page, pdfjs } from "react-pdf"

// Sét đặt cài đặt pdfjs để sử dụng worker của thư viện
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function PDFViewer({ pdfUrl }: { pdfUrl: string }) {
    return (
        <div>
            <Document file={pdfUrl}>
                <Page pageNumber={1} />
            </Document>
        </div>
    )
}

export default PDFViewer
