import React, { useEffect } from "react";

import Toolbar from "../components/Toolbar";
import PageOverview from "../components/PageOverview";
import PagePreview from "../components/PagePreview.js";
import DragAndDropEl from "../components/DragAndDropEl.js";
import { useStoreState } from "pullstate";
import { NewForm, formObj, resetFormState } from "../formai_states";
import "./create.css";

export default function Create({ form }) {
  const doc = useStoreState(NewForm, (s) => s.pdf_file);
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  useEffect(() => {
    if (form) {
      const base64 = form.base64; //.slice(28)
      const file = dataURLtoFile(base64, "myFormExample.pdf");
      form.pdf_file = file;
      form.activeField = null;
      form.lastChange = null;
      form.currentPage = 1;
      form["edit"] = true;
      resetFormState(form);
    }
    return () => {
      resetFormState(formObj);
    };
  }, [form]);

  return (
    <>
      <div className="create__body">
        {doc && <PageOverview />}
        {doc ? <PagePreview /> : <DragAndDropEl />}
        {doc && <Toolbar />}
      </div>
    </>
  );
}
