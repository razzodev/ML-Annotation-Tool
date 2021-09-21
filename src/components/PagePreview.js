import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import { PDFJS } from 'pdfjs-dist';
// import { log } from 'fabric/fabric-impl';
import Konva from 'konva';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { useStoreState } from 'pullstate';
import { NewForm } from '../formai_states';
import PreviewPDF from './PreviewPDF';
import KonvaCanvas from './KonvaCanvas';
import './pagePreviewStyle.css'
const pdf_options = {
	cMapUrl: 'cmaps/',
	cMapPacked: true,
	scale: '0.4',
	zoom: '10%',
	width: '30%'
};

const PAGE_WIDTH = 600;
const PAGE_HEIGHT = PAGE_WIDTH * 1.414;

function PagePreview() {
	const doc = useStoreState(NewForm, s => s.pdf_file);
	const activeField = useStoreState(NewForm, s => s.activeField);
	const fields = useStoreState(NewForm, s => s.fields);
	const currentPage = useStoreState(NewForm, s => s.currentPage);


	useEffect(() => {
		return () => {};
	}, [fields, activeField]);
	return (
		<div className="create__preview">
			<KonvaCanvas width={PAGE_WIDTH} height={PAGE_HEIGHT} />
			<PreviewPDF width={PAGE_WIDTH} height={PAGE_HEIGHT} />
		</div>
	);
}

export default PagePreview;

// <Page
// ref={$page}
// id={`pdf-preview__page_${currentPage}`}