// import React, { Component, useState, useEffect } from "react";
// import { Document, Page } from "react-pdf/dist/entry.webpack";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import { convertPDF } from "../lib/api";
// // import './Sample.less';
// // import pdfFile from '../PersonalRegistration.pdf';
// // import pdfjsLib from 'pdfjs-dist';

// pdfjsLib.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.js";

// function UploadFile() {
//   const [docPages, setDocPages] = useState([]);
//   const [numOfPages, setNumOfPages] = useState(0);

//   useEffect(() => {
//     return () => {};
//   }, [docPages]);

//   const handleUpload = (e) => {
//     let fileList = e.target.files;
//     let fileListCount = Object.keys(fileList).length;
//     for (let i = 0; i < fileListCount; i++) {
//       splitMultiplePages(fileList[i]);
//     }
//   };

//   const splitMultiplePages = async (doc) => {
//     // split pdf file to pages
//     let loadTask = pdfjsLib.getDocument(doc.name).then(async (pdf) => {
//       await setNumOfPages(pdf.numPages);

//       // for (let i = 1; i < pdf.numPages; i++) {
//       // 	let page = await pdf.getPage(i);
//       // 	convertToBase64(page);
//       // }
//     });
//     convertToBase64(doc);
//   };

//   const convertToBase64 = (page) => {
//     let reader = new FileReader();
//     reader.onloadend = async () => {
//       let jpgPreffix = "data:image/png";
//       let newBase64 = jpgPreffix + reader.result.substring(20);
//       // setDocPages(docPages, ...newBase64);
//       const getPages = await convertPDF(numOfPages, reader.result);
//       console.log(getPages);
//     };
//     console.log(page);
//     reader.readAsDataURL(page);
//   };
//   const loadImages = () => {
//     docPages.forEach((page) => {
//       return <canvas src={page} />;
//     });
//   };
//   return (
//     <div>
//       <input type="file" multiple onChange={(e) => handleUpload(e)} />
//       {() => loadImages()}
//     </div>
//   );
// }

// export default UploadFile;
