import React, { useState, useEffect, useRef } from "react";
import ToolbarField from "./ToolbarField";
import { useStoreState } from "pullstate";
import { NewForm } from "../formai_states";
// import {toolbarFieldTemplate} from '../model/templates'
// const template = require('../model/templates')
import "./toolbarStyle.css";
import { ToolbarItem } from "../model/templates";
import DeleteModal from "./DeleteModal";
import SendFormModal from "./SendFormModal";

export default function Toolbar() {
  const formName = useStoreState(NewForm, (s) => s.name);
  const form = useStoreState(NewForm);
  const fields = useStoreState(NewForm, (s) => s.fields);
  const [sendFormModal, setSendFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // const history = useStoreState(NewForm, s => s.history);
  // const historyState = useStoreState(NewForm, s => s.historyState);

  // const [render, triggerRender] = useState(false);

  // function undoRedo(factor) {
  // 	const index = historyState - 1;
  // 	var key = history[index][0]
  // 	var value = history[index][1]
  // 	NewForm.update(s=> {s.fields[key] = value;
  // 	s.historyState = historyState + factor})
  // 	console.log(history[index][1].loc)
  // 	triggerRender(historyState)
  // }
  const addField = async () => {
    const timestamp = new Date().getTime();
    const id = "toolbarField--" + timestamp;
    const newField = new ToolbarItem(id);
    NewForm.update((s) => {
      s.fields[id] = newField;
    });
  };

  function renderFields() {
    let fieldsKeys = Object.keys(fields);
    return fieldsKeys.map((field) => {
      return <ToolbarField key={field} item={field} />;
    });
  }

  function toggleDelete() {
    setDeleteModal(!deleteModal);
  }
  function toggleSend() {
    setSendFormModal(!sendFormModal);
  }

  //   function promptCancel(e) {
  //     setDeleteModal(true);
  //   }
  const $addButton = useRef();
  useEffect(() => {
    $addButton.current.scrollIntoView({ behavior: "smooth" });
    return () => {
      //   renderFields();
    };
  }, [fields]);

  return (
    <div className="create__toolbar">
      <div className="toolbar__wrapper">
        <div className="toolbar__header">
          <input
            className="tbInput doc-name"
            placeholder="Enter document name:"
            value={formName}
            onChange={(e) =>
              NewForm.update((s) => {
                s.name = e.target.value;
              })
            }
          />
          {/* <div onClick={()=> undoRedo(-1)} className="create-form-button" style={historyState == 0 ? {visibility:'hidden'}: null} >undo</div>
					<div onClick={()=> undoRedo(+1)} className="create-form-button" style={historyState == history.length ? {visibility:'hidden'}: null}>redo</div> */}
        </div>
        <div className="toolbar-field__wrapper">
          {fields && renderFields()}
          <div
            className="create-form-button"
            id="addNewAttrButton"
            onClick={addField}
            ref={$addButton}
          >
            <span>+ Add new attribute</span>
          </div>
        </div>
      </div>
      <div className="submit-wrapper">
        <div onClick={toggleDelete} className="create-form-button cancelButton">
          <span>Cancel</span>
        </div>
        <div onClick={toggleSend} className="create-form-button okButton">
          <span>Submit</span>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          itemToRemove={form}
          altText={"form"}
          reset={true}
          exit={toggleDelete}
        />
      )}
      {sendFormModal && <SendFormModal exit={toggleSend} />}
    </div>
  );
}
