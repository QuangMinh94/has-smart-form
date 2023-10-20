import React from 'react';
import PDFViewer from './PDFview'; // Import component đã tạo

const LoadViewPDF:React.FC = ()=> {
  const pdfUrl = '/path/to/your/pdf.pdf'; // Thay bằng URL của tệp PDF của bạn

  return (
    <div>
      <h1 style={{color:"red"}}>PDF Viewer</h1>
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
}

export default LoadViewPDF;