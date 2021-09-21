import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useStoreState } from 'pullstate';
import { NewForm, resetFormState, formObj } from '../formai_states';
import './promptModalStyle.css';
const portalRoot = document.getElementById('portalRoot');

function DeleteModal({ itemToRemove, altText, reset, exit }) {
	const fields = useStoreState(NewForm, s => s.fields);
	const activeField = useStoreState(NewForm, s => s.activeField);
	const $overlay = useRef();
	function handleCancel(e) {
		exit();
	}
	function deleteCondition() {
		reset ? resetFormState(formObj) : deleteItem();
		exit();
	}

	function deleteItem() {
		NewForm.update(s => {
			delete s.fields[itemToRemove];
			s.activeField = null;
			s.lastChange = new Date().getTime();
		});
	}

	function eventKeys(e) {
		if (e.keyCode == 27) {
			exit();
		}
		if (e.keyCode == 13) {
			deleteCondition();
		}
	}
	useEffect(e => {
		window.addEventListener('keydown', eventKeys)
		return () => {
			window.removeEventListener('keydown', eventKeys)
		};
	}, []);
	return ReactDOM.createPortal(
		<div ref={$overlay} className="promptModal__overlay" style={{ zIndex: 1 }}>
			<div className="promptModal__body">
				<div>
					Delete {altText} "{itemToRemove.name ? itemToRemove.name : 'unnamed'}
					"?
				</div>
				<div>
					<div
						onClick={handleCancel}
						className="promptModal-button cancelButton">
						<span>Cancel</span>
					</div>
					<div
						onClick={deleteCondition}
						className="promptModal-button okButton">
						<span>OK</span>
					</div>
				</div>
			</div>
		</div>,
		portalRoot
	);
}

export default DeleteModal;
