'use client'
import React, { useState } from "react"
import { Document, Page } from "react-pdf"

function PDFViewer() {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess(numPages: any) {
        setNumPages(numPages)
    }

    return (
        <div>
            {/* <Document
                file="path/to/your.pdf" // Thay đổi thành URL của tệp PDF bạn muốn hiển thị
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document> */}
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    )
}

export default PDFViewer
