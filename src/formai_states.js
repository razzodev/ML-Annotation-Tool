import { Store } from 'pullstate';

export const formObj = {
	activeField: null,
	base64:null,
	currentPage: 1,
	fields: {},
	history: [],
	historyState: null,
	lastChange: null,
	name: '',
	numPages: null,
	pdf_file: null,
	username: null,

};

export const NewForm = new Store(formObj);

export function resetFormState(formObj) {
	const formKeys = Object.keys(formObj);
	formKeys.map(key =>
		NewForm.update(s => {
			s[key] = formObj[key];
		})
	);
}
