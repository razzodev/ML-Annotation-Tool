import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import { useStoreState } from 'pullstate';
import { NewForm } from '../formai_states';
import React, { useState, useEffect, useRef } from 'react';
import { useFiles } from '../hooks/CustomHooks';
import './dragAndDropElStyle.css';

export default function DragAndDropEl() {
	const user_name = localStorage.getItem('username')
	const [over, setover] = useState(false);
	const [files, setfiles] = useFiles('hello');
	const $input = useRef(null);

	function handleFile(e, method) {
		method === 'dnd'
			? convertToBase64(e.dataTransfer.files[0])
			: convertToBase64(e.target.files[0]);
	}
	const convertToBase64 = doc => {
		let reader = new FileReader();
		reader.onloadend = async () => {
			NewForm.update(s => {
				s.pdf_file = doc;
				s.base64 = reader.result;
				s.username = user_name;
			});
		};
		reader.readAsDataURL(doc);
	};

	return (
		<>
			<div
				onClick={() => {
					$input.current.click();
				}}
				onDrop={e => {
					e.preventDefault();
					e.persist();
					handleFile(e, 'dnd');
				}}
				onDragOver={e => {
					e.preventDefault();
					setover(true);
				}}
				onDragLeave={e => {
					e.preventDefault();
					setover(false);
				}}
				className={over ? 'upload-container over' : 'upload-container'}>
				<div>
					<FontAwesomeIcon className="plus" icon={faPlus} />
				</div>
				<div className="uploadTxt">Upload form</div>
				<input
					style={{ display: 'none' }}
					type="file"
					accept="application/pdf"
					ref={$input}
					onChange={e => {
						handleFile(e, 'click');
					}}
				/>
			</div>
		</>
	);
}
