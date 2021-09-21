import React, { useEffect, useState, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react/lib/agGridReact';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { getManageForms, getFormBlob } from '../lib/api';
import { GridColumn } from '../model/templates';
import Create from '../pages/Create';

function ManageAgGrid() {
	const [gridApi, setGridApi] = useState();
	const [columnApi, setColumnApi] = useState();
	const [classWithEditor, setClassWithEditor] = useState();
	const [loadingGrid, setLoadingGrid] = useState(true);
	const [loadingEditor, setLoadingEditor] = useState(false);
	const [formEditor, setFormEditor] = useState(false);
	const [columnDefs, setColumnDefs] = useState([]);
	const [rowData, setRowData] = useState([]);

	async function fetchData() {
		const response = await getManageForms();
		loadColumnsAndRows(response.data);
	}
	async function loadColumnsAndRows(data) {
		const columns = [];
		const editCol = new GridColumn('edit');
		editCol['cellRenderer'] = renderEditButton();
		columns.push(editCol);
		const dataKeys = Object.keys(data[0]);
		dataKeys.forEach(key => {
			let column = new GridColumn(key);
			columns.push(column);
		});

		data.map(row => {
			row['edit'] = row['doc_name'];
		});
		setColumnDefs(columns);
		setRowData(data);
		setLoadingGrid(false);
	}

	function renderEditButton() {
		function createButton(params) {
			var eDiv = document.createElement('div');
			eDiv.innerHTML = `<button class="edit-button">Edit</button>`;
			var eButton = eDiv.querySelectorAll('.edit-button')[0];
			eButton.addEventListener('click', async function(e) {
				setFormEditor(false);
				setLoadingEditor(true);
				setClassWithEditor('gridWithEditor');
				const response = await getFormBlob(params.value);
				const parsedForm = JSON.parse(response.data[0]['json']);
				setFormEditor(parsedForm);
				setLoadingEditor(false);
			});
			return eDiv;
		}
		return createButton;
	}
	useEffect(() => {
		fetchData();
		return () => {};
	}, [formEditor]);
	return (
		<>
			<div
				style={{
					display: 'flex',
					position: 'relative',
					flexDirection: 'column',
					alignItems: 'center',
					minWidth: '775px',
					width: '-webkit-fill-available'
				}}>
				<div
					className="ag-theme-balham"
					style={{
						height: '275px',
						width: '90%',
						display: 'inline-block',
						backgroundColor: '#F6F9FE'
					}}>
					<h1 className="heading1">Manage Forms</h1>
					{loadingGrid && <h1>Loading... </h1>}
					{!loadingGrid && rowData && (
						<div className={`manageAgGrid--wrapper ${classWithEditor}`}>
							<AgGridReact
								defaultColDef={{ resizable: true }}
								columnDefs={columnDefs}
								rowData={rowData}
								style={{ height: '20px' }}
								onGridReady={params => {
									setGridApi(params.api);
									setColumnApi(params.api);
								}}></AgGridReact>
						</div>
					)}
					<div className="underAgGrid"></div>
					<div style={{ position: 'relative' }}>
						{loadingEditor && <h1>Loading... </h1>}
					</div>
				</div>
			</div>
				<div className='formEditor--wrapper'>{formEditor && <Create form={formEditor} />}</div>
		</>
	);
}

export default ManageAgGrid;
