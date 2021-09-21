import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import { PDFJS } from 'pdfjs-dist';
// import { log } from 'fabric/fabric-impl';
import { useStoreState } from 'pullstate';
import { NewForm } from '../formai_states';

const pdf_options = {
	cMapUrl: 'cmaps/',
	cMapPacked: true,
	scale: '0.4',
	zoom: '10%',
	width: '30%'
};

function PreviewPDF({width}) {
    const $page = useRef();

    const doc = useStoreState(NewForm, s => s.pdf_file);
	const activeField = useStoreState(NewForm, s => s.activeField);
	const fields = useStoreState(NewForm, s => s.fields);
    const currentPage = useStoreState(NewForm, s => s.currentPage);
    
	async function onDocumentLoadSuccess({ numPages }) {
		NewForm.update(s => {
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
				onLoadSuccess={e => onDocumentLoadSuccess(e)}
				options={pdf_options}>
				<Page
					ref={$page}
					className="pdf-preview__page"
					key={`page_${currentPage}`}
					pageNumber={currentPage}
					width={width}></Page>
			</Document>
		</>
	);
}

export default PreviewPDF;
