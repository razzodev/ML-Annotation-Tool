import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import { addNewForm, updateForm } from "../lib/api";
import { useStoreState } from "pullstate";
import { NewForm } from "../formai_states";
import "./promptModalStyle.css";
import { consoleJSON } from "../hooks/CustomHooks";
const portalRoot = document.getElementById("portalRoot");

function SendFormModal({ itemToRemove, altText, reset, exit }) {
  const myForm = useStoreState(NewForm);
  const formName = useStoreState(NewForm, (s) => s.name);
  //   const pdf_file = useStoreState(NewForm, (s) => s.pdf_file);
  const fields = useStoreState(NewForm, (s) => s.fields);
  //   const activeField = useStoreState(NewForm, (s) => s.activeField);
  const edit = useStoreState(NewForm, (s) => s.edit);
  const [myFormName, setMyFormName] = useState(formName);
  const $overlay = useRef();

  function handleCancel(e) {
    NewForm.update((s) => {
      s.name = myFormName;
    });
    exit();
  }
  const handleSendForm = useCallback(async () => {
    NewForm.update((s) => {
      NewForm.update((s) => {
        s.name = myFormName;
      });
    });
    edit ? updateForm(myForm) : addNewForm(myForm);
    exit();
  }, [exit, myFormName, edit, myForm]);

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
      consoleJSON(fields);
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
