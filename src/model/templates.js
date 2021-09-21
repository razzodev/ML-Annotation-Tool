import React from 'react'
export class ToolbarItem {
	constructor(id) {
		this.id = id;
		this.name = null;
		this.page = null;
		this.stat = null;
		this.type = null;
		this.typeStandard = true;
		this.value = null;
		this.loc = {
			x1: 0,
			y1: 0,
			x2: 0,
			y2: 0
		};
		// this.historyState = null;
		// this.history = [];
	}
}

export class GridColumn {
	constructor(field) {
		this.isEdit = field === 'edit'? true: false;
		this.headerName = field;
		this.field = field;
		this.sortable = true;

	}
}