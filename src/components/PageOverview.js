// node_modules
import ReactDOM from 'react-dom';
import { PDFJS } from 'pdfjs-dist';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Transformer, Group, Rect, Text } from 'react-konva';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import './Sample.less';
// states
import { useStoreState } from 'pullstate';
import { NewForm } from '../formai_states';
// comps / funcs / css
import OverviewPDF from './OverviewPDF';
import KonvaCanvas from './KonvaCanvas';
import { consoleJSON } from '../hooks/CustomHooks';

import './pageOverviewStyle.css';

const PAGE_WIDTH = 130;
const PAGE_HEIGHT = PAGE_WIDTH * 1.414;
const pdf_options = {
	cMapUrl: 'cmaps/',
	cMapPacked: true,
	scale: '0.4',
	zoom: '10%',
	width: '30%'
};

export default function PageOverview() {
	const file = useStoreState(NewForm, s => s.pdf_file);
	const currentPage = useStoreState(NewForm, s => s.currentPage);
	const activeField = useStoreState(NewForm, s => s.activeField);
	const lastChange = useStoreState(NewForm, s => s.lastChange);
	const fields = useStoreState(NewForm, s => s.fields);
	const [active, triggerActive] = useState();

	const numPages = useStoreState(NewForm, s => s.numPages);
	const pagesRef = useRef([]);

	async function onDocumentLoadSuccess({ numPages }) {
		NewForm.update(s => {
			s.numPages = numPages;
		});
	}

	useEffect(() => {
		return () => {};
	}, [
		numPages,
		currentPage,
		lastChange
		// pagesRef,
	]);
	return (
		<div className="create__overview">
			<div className="pdf-overview">
				<Document
					className="pdf-overview__doc"
					file={file}
					onLoadSuccess={e => onDocumentLoadSuccess(e)}
					options={pdf_options}>
					{Array.from(new Array(numPages), (el, index) => (
						<React.Fragment key={'fragment',index}>
							<PageComp pageNum={index + 1} pageWidth={PAGE_WIDTH} />
							<h5 className="page-overview-h5" key={('h5', index)}>
								{index + 1}
							</h5>
						</React.Fragment>
					))}
				</Document>
			</div>
		</div>
	);
}

function PageComp({ pageNum, pageWidth }) {
	const file = useStoreState(NewForm, s => s.pdf_file);
	const lastChange = useStoreState(NewForm, s => s.lastChange);
	const [active, triggerActive] = useState();
	const currentPage = useStoreState(NewForm, s => s.currentPage);
	const activeField = useStoreState(NewForm, s => s.activeField);

	const fields = useStoreState(NewForm, s => s.fields);
	const $pdfPage = useRef();
	const [isActive, setIsActive] = useState();

	function addKonva() {
		 
			const myNode = ReactDOM.findDOMNode(
				$pdfPage.current
			).getBoundingClientRect();
			return Object.keys(fields).map(
				item =>
					fields[item].page === pageNum && (
						<Rect
							key={'rect' + item}
							x={fields[item].loc.x1 * myNode.width}
							y={fields[item].loc.y1 * myNode.height}
							width={(fields[item].loc.x2 - fields[item].loc.x1) * myNode.width}
							height={
								(fields[item].loc.y2 - fields[item].loc.y1) * myNode.height
							}
							stroke={'#173751'}
							strokeWidth={PAGE_WIDTH / 150}
							// fill={'#0a0a0a'}
							// shadowBlur={2}
							cornerRadius={3}
						/>
					)
			);
		
	}

	function toggleActive() {
		currentPage == pageNum && setIsActive('active');
		currentPage != pageNum && setIsActive('');
	}
	function editFormHandler() {
		const myNode = ReactDOM.findDOMNode(
			$pdfPage.current
		).getBoundingClientRect();
		triggerActive(new Date().getTime());
	}
	function loadCanvas() {
		return <Layer>{addKonva()}</Layer>;
	}
	useEffect(() => {
		toggleActive();
		editFormHandler()
		return () => {};
	}, [currentPage]);
	return (
		<div
			className="pdf-overview__page--wrapper"
			onClick={() => {
				console.log(Object.keys(fields).length);
				NewForm.update(s => {
					s.currentPage = pageNum;
				});
			}}>
			<Stage
				width={pageWidth}
				height={pageWidth * 1.414}
				className="konvaStage"
				style={{ zIndex: '1', position: 'absolute' }}>
				{active && loadCanvas()}
			</Stage>
			<Page
				// ref={el => (pagesRef.current[index + 1] = el)}
				ref={$pdfPage}
				className={`pdf-overview__page ${isActive}`}
				pageNumber={pageNum}
				width={pageWidth}
			/>
		</div>
	);
}
