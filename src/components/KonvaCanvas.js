// node_modules
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { Stage, Layer, Transformer, Group, Rect, Text } from 'react-konva';
import { useStoreState } from 'pullstate';
// hooks
import { consoleJSON } from '../hooks/CustomHooks';
// states
import { NewForm } from '../formai_states';
import KonvaRect from './KonvaRect';

// const width = 600;
// const height = width * 1.414;

function KonvaCanvas({ width, height }) {
	const $canvas = useRef();
	const $stage = useRef();

	const fields = useStoreState(NewForm, s => s.fields);
	const [active, triggerActive] = useState(false);
	const activeField = useStoreState(NewForm, s => s.activeField);
	const currentPage = useStoreState(NewForm, s => s.currentPage);
	const lastChange = useStoreState(NewForm, s => s.lastChange);

	// ======================= KONVA ===============================
	function loadCanvas() {
		return <Layer>{addKonva()}</Layer>;
	}
	function addKonva() {
		const myNode = ReactDOM.findDOMNode(
			$canvas.current
		).getBoundingClientRect();
		return Object.keys(fields).map((item, index) => {
			return (
				fields[item].page === currentPage && (
					<KonvaRect
						key={item}
						item={item}
						myNode={myNode}
						updateActive={() => updateActive(item)}
					/>
				)
			);
		});
	}
	// =========================== EVENT LISTENERES =================
	function addListener(e) {
		if (activeField && !activeField.page) {
			const myNode = ReactDOM.findDOMNode($canvas.current);
			myNode.addEventListener('click', clickCanvas);
		}
	}
	function removeListener() {
		const myNode = ReactDOM.findDOMNode($canvas.current);
		myNode.removeEventListener('click', clickCanvas);
	}

	function clickCanvas(e) {
		console.log('clicked');
		const myNode = ReactDOM.findDOMNode(
			$canvas.current
		).getBoundingClientRect();
		const newX = (e.clientX - myNode.left) / myNode.width;
		const newY = (e.clientY - myNode.top) / myNode.height;
		console.log(newX, newY);
		NewForm.update(s => {
			s.activeField.loc.x1 = newX;
			s.activeField.loc.y1 = newY;
			s.activeField.loc.x2 = s.activeField.loc.x1 + 0.2;
			s.activeField.loc.y2 = s.activeField.loc.y1 + 0.03;
			s.activeField.page = currentPage;
			s.fields[activeField.id] = s.activeField;
			s.lastChange = new Date().getTime();
		});
		triggerActive(activeField);
	}
	// ======================== UPDATE ==========================
	async function updateActive(item) {
		console.log('updated');
		removeListener();
		NewForm.update(s => {
			s.activeField = fields[item];
			// s.lastChange = new Date().getTime();
		});
		addListener();
		triggerActive(new Date().getTime());
	}

function editFormHandler() {
	const myNode = ReactDOM.findDOMNode(
		$canvas.current
	).getBoundingClientRect();
	triggerActive(new Date().getTime());
}

	useEffect(
		e => {
			addListener(e);
			editFormHandler()
			return () => {
				removeListener(e);
			};
		},
		[
			fields, 
			activeField, 
			currentPage, 
		]
	);
	return (
		<>
			<div
				id="konvaStage"
				ref={$canvas}
				style={{
					width: `${width}px`,
					height: `${height}px`,
					cursor: activeField && !activeField.loc.x1 ? 'cell' : 'default'
				}}>
				<Stage
					ref={$stage}
					width={width}
					height={height}
					className="konvaStage"
					style={{ zIndex: '1', position: 'absolute' }}
					onMouseDown={e => {
						const clickedOnEmpty = e.target === e.target.getStage();
						{
							!activeField ||
								(clickedOnEmpty &&
									activeField.page &&
									NewForm.update(s => {
										s.activeField = null;
									}));
						}
					}}>
					{active && loadCanvas()}
				</Stage>
			</div>
		</>
	);
}

export default KonvaCanvas;
