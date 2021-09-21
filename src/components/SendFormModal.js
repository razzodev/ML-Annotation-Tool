import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
// import { addNewForm, updateForm } from "../lib/api";
import { NewForm } from "../formai_states";
import "./promptModalStyle.css";
import { consoleJSON } from "../hooks/CustomHooks";
const portalRoot = document.getElementById("portalRoot");

function SendFormModal({ itemToRemove, altText, reset, exit }) {
  const formName = NewForm.useState((s) => s.name);
  const fields = NewForm.useState((s) => s.fields);
  const [myFormName, setMyFormName] = useState(formName);
  const $overlay = useRef();

  function handleCancel(e) {
    NewForm.update((s) => {
      s.name = myFormName;
    });
    exit();
  }
  const handleSendForm = useCallback(async () => {
    await NewForm.update((s) => {
      s.name = myFormName;
    });
    // edit ? updateForm(myForm) : addNewForm(myForm);
    consoleJSON(fields);
    exit();
  }, [exit, myFormName, fields]);

  const eventKeys = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        exit();
      }
      if (e.keyCode === 13) {
        handleSendForm();
      }
    },
    [exit, handleSendForm]
  );
  useEffect(
    (e) => {
      window.addEventListener("keydown", eventKeys);
      return () => {
        window.removeEventListener("keydown", eventKeys);
      };
    },
    [fields, eventKeys]
  );
  return ReactDOM.createPortal(
    <div ref={$overlay} className="promptModal__overlay" style={{ zIndex: 1 }}>
      <div className="promptModal__body">
        {!formName && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ marginBottom: "6px" }}>
              Please give your form a name:
            </span>
            <input
              className="tbInput"
              type="text"
              placeholder="document name"
              onChange={(e) => {
                setMyFormName(e.target.value);
              }}
            />
          </div>
        )}
        <div>Send {formName ? formName : myFormName} to database?</div>
        <div style={{ width: "80%" }}>
          <button
            onClick={handleCancel}
            className="promptModal-button cancelButton"
          >
            Cancel
          </button>
          <button
            disabled={!myFormName ? true : false}
            onClick={handleSendForm}
            className="promptModal-button okButton"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    portalRoot
  );
}

export default SendFormModal;
