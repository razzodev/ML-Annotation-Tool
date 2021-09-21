import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Logs.css';
import { getRowData, searchDocs } from '../../lib/api.js';
import AdvancedSearch from '.././AdvancedSearch/AdvancedSearch.js';

export default class Logs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			searchValue: '',
			showAdvanced: false,
			account_val: '',
			date_val: '',
			digital_sign_val: '',
			doc_new_id_val: '',
			doc_old_id_val: '',
			doc_sefah_val: '',
			first_page_val: '',
			footer_val: '',
			full_account_val: '',
			id_val: '',
			passport_val: '',
			title_val: '',
			filename: '',
			columnDefs: [
				{
					headerName: 'account',
					field: 'account_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'date',
					field: 'date_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'digital sign',
					field: 'digital_sign_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'doc new id',
					field: 'doc_new_id_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'doc old id',
					field: 'doc_old_id_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'doc sefah',
					field: 'doc_sefah_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'first page',
					field: 'first_page_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'footer',
					field: 'footer_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'full account',
					field: 'full_account_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'id',
					field: 'id_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'passport',
					field: 'passport_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'title',
					field: 'title_val',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter'
				},
				{
					headerName: 'filename',
					field: 'file',
					sortable: true,
					pivot: true,
					filter: 'agSetColumnFilter',
					cellRenderer: function(params) {
						return (
							`<a href="${process.env.PUBLIC_URL}/images/${params.value}.pdf" target="_blank">` +
							params.value +
							`</a>`
						);
					}
				}
			],
			rowData: []
		};
	}

	handleSearchValue = event => {
		this.setState({ searchValue: event.target.value });
	};

	handleKey = e => {
		// search db by pressing 'enter'
		if (e.keyCode === 13) {
			this.searchHandler();
		}
	};

	searchHandler = async () => {
		const regularSearch = { searchValue: this.state.searchValue };
		const response = await searchDocs(regularSearch);
		this.setState({ rowData: response.data, loading: false });
	};

	submitSearch = async advancedSearch => {
		const response = await searchDocs(advancedSearch);
		this.setState({ rowData: response.data, loading: false });
	};

	advancedButton = event => {
		event.preventDefault();
		if (this.state.showAdvanced) {
			this.setState({ showAdvanced: false });
		} else {
			this.setState({ showAdvanced: true });
		}
	};
	componentDidMount() {
		window.addEventListener('keydown', this.handleKey);
		this.fetchData();
	}
	async fetchData() {
		this.setState({ loading: true });
		const response = await getRowData();
		this.setState({ rowData: response.data, loading: false });
	}
	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKey);
	}

	render() {
		const { rowData, loading, showAdvanced } = this.state;
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					minWidth: '775px'
				}}>
				<div
					className="ag-theme-balham"
					style={{
						height: '275px',
						width: '90%',
						display: 'inline-block',
						backgroundColor: '#F6F9FE'
					}}>
					<h1 className="heading1">Analyze Logs</h1>
					<div className="searchRow">
						<input
							type="text"
							className="searchTemp"
							placeholder=" &#xf002;  Search"
							value={this.state.searchValue}
							onChange={this.handleSearchValue}
						/>
						<input
							id="searchButton"
							className="searchButton"
							type="button"
							value="Search"
							onClick={this.searchHandler}
						/>
						<button
							className="advancedButton"
							id="advancedButton"
							value={this.state.showAdvanced}
							onClick={this.advancedButton}>
							Advanced search
						</button>
					</div>
					<div id="tableSpacer" className="tableSpacer"></div>
					{showAdvanced && (
						<div className={`advancedWrapper ${showAdvanced ? 'visible': ''}`}>
							<AdvancedSearch submitSearch={this.submitSearch}></AdvancedSearch>
						</div>
					)}
					{loading && <h5>Loading... </h5>}
					{!loading && rowData && (
						<AgGridReact
							defaultColDef={{ resizable: true }}
							columnDefs={this.state.columnDefs}
							rowData={this.state.rowData}
							onGridReady={params => (this.gridApi = params.api)}></AgGridReact>
					)}
					<div className="underAgGrid"></div>
				</div>
			</div>
		);
	}
}
