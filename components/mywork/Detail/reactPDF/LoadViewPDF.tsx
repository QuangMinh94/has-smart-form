import React from 'react';
import PDFViewer from './PDFview'; // Import component đã tạo

const LoadViewPDF:React.FC = ()=> {


  return (
    <div>
      <h1 style={{color:"red"}}>PDF Viewer</h1>
      <PDFViewer />
    </div>
  );
}

export default LoadViewPDF;