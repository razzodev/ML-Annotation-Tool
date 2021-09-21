import React, { useEffect, useRef } from "react";

import { useStoreState } from "pullstate";
import { NewForm } from "../formai_states";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const pdf_options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  scale: "0.4",
  zoom: "10%",
  width: "30%",
};

function PreviewPDF({ width }) {
  const $page = useRef();

  const doc = useStoreState(NewForm, (s) => s.pdf_file);
  const activeField = useStoreState(NewForm, (s) => s.activeField);
  const fields = useStoreState(NewForm, (s) => s.fields);
  const currentPage = useStoreState(NewForm, (s) => s.currentPage);

  async function onDocumentLoadSuccess({ numPages }) {
    NewForm.update((s) => {
      s.numPages = numPages;
    });
  }

  useEffect(() => {
    return () => {};
  }, [currentPage, doc, activeField, fields]);
  return (
    <>
      <Document
        className="pdf-preview__doc"
        file={doc}
        onLoadSuccess={(e) => onDocumentLoadSuccess(e)}
        options={pdf_options}
      >
        <Page
          ref={$page}
          className="pdf-preview__page"
          key={`page_${currentPage}`}
          pageNumber={currentPage}
          width={width}
        ></Page>
      </Document>
    </>
  );
}

export default PreviewPDF;
