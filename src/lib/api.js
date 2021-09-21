import axios from "axios";
import { consoleJSON } from "../hooks/CustomHooks";
export const hostname = window.location.hostname;

const baseUrl = `http://${hostname}:5000`;

// export function getRowData() {
//     return axios.get(`${baseUrl}/get_docs`);
// }

// export function searchDocs(query) {
//     return axios.post(`${baseUrl}/search_docs`, query);
// }

// export function AddNewUser(newUser) {
//     return axios.post(`${baseUrl}/addusers`, newUser);
// }

// export function getForm() {
//     return axios.get(`${baseUrl}/detectform`);
// }

// export function convertPDF(pages, base64) {
//     return axios.get(`${baseUrl}/convert_pdf`, {
//         params: {
//             pages: pages,
//             base64: base64,
//         }
//     })

// }

export function addNewForm(newForm) {
  // return axios({
  //   method: "put",
  //   url: `${baseUrl}/add_new_form`,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     withCredentials: true,
  //     credentials: "same-origin",
  //   },
  //   proxy: {
  //     host: "0.0.0.0",
  //     port: 5000,
  //   },
  //   data: newForm,
  // });
  // consoleJSON(newForm);
}
export function updateForm(newForm) {
  return axios({
    method: "put",
    url: `${baseUrl}/update_form`,
    headers: {
      "Access-Control-Allow-Origin": "*",
      withCredentials: true,
      credentials: "same-origin",
    },

    proxy: {
      host: "0.0.0.0",
      port: 5000,
    },
    data: newForm,
  });
}

// export function getManageForms() {
//     return axios.get(`${baseUrl}/manage_forms`);
// }

// export function getFormBlob(docName) {
//     console.log(docName)
//     return axios.get(`${baseUrl}/get_form_blob?doc_name=${docName}`);
// }
