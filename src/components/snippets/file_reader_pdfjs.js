
	// const onFileChange = e => {
	// 	console.log(e.target.files);
	// 	let file = e.target.files[0];
	// 	let reader = new FileReader();
	// 	// reader.onload = function() {
	// 	//     var typedarray = new Uint8Array(file);
	// 	//     PDFJS.getDocument(typedarray).then(function(pdf) {
	// 	//         // you can now use *pdf* here
	// 	//         console.log("the pdf has ",pdf.numPages, "page(s).")
	// 	//         pdf.getPage(pdf.numPages).then(function(page) {
	// 	//             console.log(page)
	// 	//           })
	// 	//         })
	// 	//     }

	// 	reader.readAsDataURL(file);
	// 	// reader.onloadend = () => {
	// 	//     let jpgPreffix = 'data:image/png'
	// 	//     let newBase64 = jpgPreffix + reader.result.substring(20)
	// 	//     console.log(newBase64)
	// 	//     this.setState({base64: newBase64})
	// 	//     console.log(file)}
	// 	setfile(e.target.files[0]);
	// };