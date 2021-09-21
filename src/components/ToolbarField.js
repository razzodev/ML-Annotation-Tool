import React, { useEffect, useRef, useState, useCallback } from "react";
import { useStoreState } from "pullstate";
import { NewForm } from "../formai_states";

import DeleteModal from "./DeleteModal";
import "./toolbarFieldStyle.css";
const inputTypeOptions = {
  "type:": null,
  text: "text",
  integer: "integer",
  float: "float",
  boolean: "boolean",
};

const standardFieldsOptions = {
  "select:": null,
  account: "text",
  date: "text",
  "digital sign": "boolean",
  "doc new id": "text",
  "first page": "boolean",
  footer: "boolean",
};
// const CLASS_NAME = "toolbar__field--wrapper";

export default function ToolbarField({ item }) {
  const fields = useStoreState(NewForm, (s) => s.fields);
  const activeField = useStoreState(NewForm, (s) => s.activeField);
  const $tbField = useRef();
  const [isActive, setisActive] = useState("");
  const [standard, setStandard] = useState(fields[item]["typeStandard"]);
  const [fieldName, setFieldName] = useState(fields[item]["name"] || "");
  const [fieldType, setFieldType] = useState(fields[item]["type"] || "");
  const [fieldValue, setFieldValue] = useState(fields[item]["value"] || "");
  const [displayModal, setDisplayModal] = useState(false);

  function switchPage() {
    fields[item].page &&
      NewForm.update((s) => {
        s.currentPage = s.fields[item].page;
      });
  }
  function updateActiveField() {
    NewForm.update((s) => {
      s.activeField = s.fields[item];
    });
  }
  const handleActive = useCallback(() => {
    return activeField
      ? activeField.id === item
        ? setisActive("active")
        : setisActive("")
      : activeField;
  }, [activeField, item]);

  function updateProperty(e, prop, typeOptions) {
    if (typeOptions) {
      setFieldType(typeOptions[e.target.value]);
      NewForm.update((s) => {
        s.activeField["type"] = typeOptions[e.target.value];
        s.fields[item] = s.activeField;
      });
    }
    if (fieldType === "boolean" && prop === "value") {
      NewForm.update((s) => {
        s.activeField["value"] = e.target.checked;
        s.fields[item] = s.activeField;
      });
    } else {
      NewForm.update((s) => {
        s.activeField[prop] = e.target.value;
        s.fields[item] = s.activeField;
      });
    }

    NewForm.update((s) => {
      s.fields[item] = s.activeField;
    });
  }
  async function toggleStandard() {
    updateActiveField();
    setStandard(!standard);
    NewForm.update((s) => {
      s.activeField["typeStandard"] = !standard;
      s.fields[item] = s.activeField;
    });
  }
  // ============================== RENDER ===============================//
  function standardField() {
    return (
      <>
        <select
          className="tbField-select"
          onFocus={updateActiveField}
          value={fieldName}
          onChange={(e) => {
            setFieldName(e.target.value);
            updateProperty(e, "name", standardFieldsOptions);
          }}
        >
          {selectOptions(standardFieldsOptions)}
        </select>
      </>
    );
  }

  function customField() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          className="tbInput"
          style={{ width: "54%" }}
          type="text"
          placeholder="field name"
          value={fieldName}
          onChange={(e) => {
            setFieldName(e.target.value);
            updateProperty(e, "name");
          }}
        />
        <select
          className="tbField-select"
          style={{ flexBasis: "42%" }}
          onClick={updateActiveField}
          value={fieldType}
          onChange={(e) => {
            setFieldType(e.target.value);
            updateProperty(e, "type");
          }}
        >
          {selectOptions(inputTypeOptions)}
        </select>
      </div>
    );
  }
  const addListener = useCallback((e) => {
    $tbField.current.addEventListener("keyup", deleteListener);
  }, []);
  function deleteListener(e) {
    if (e.keyCode === 46) {
      setDisplayModal(true);
    }
  }

  const selectOptions = (obj) => {
    return Object.keys(obj).map((item) => (
      <option key={"option_key" + item} value={item}>
        {item}
      </option>
    ));
  };
  // ========================== LIFECYCLE AND RETURN JSX ====================//
  useEffect(
    (e) => {
      addListener(e);
      handleActive();
      return () => {};
    },
    [activeField, fields, standard, addListener, handleActive]
  );

  return (
    <div
      className={"toolbar__field--wrapper " + isActive}
      ref={$tbField}
      onClick={updateActiveField}
      onDoubleClick={switchPage}
    >
      <div className="tbField--inner">
        <div className="tbField--top">
          <span onClick={toggleStandard}>{standard ? "custom" : "back"}</span>
          <span
            id="deleteFieldButton"
            // onClick={deleteField}
            onClickCapture={() => setDisplayModal(true)}
          >
            delete
          </span>
        </div>
        <div className="tbField-select--wrapper">
          {standard ? standardField() : customField()}
          <div style={{ display: "flex" }}>
            {fieldType === "boolean" && (
              <label style={{ margin: "14px 3px 3px 4px" }}>value:</label>
            )}
            {fieldType === "boolean" && (
              <input
                style={{ marginTop: "10px" }}
                className="tbInput-checkbox"
                type="checkbox"
                placeholder="value"
                value={fieldValue}
                onChange={(e) => {
                  setFieldValue(e.target.value);
                  updateProperty(e, "value");
                }}
              />
            )}
            {fieldType !== "boolean" && (
              <input
                style={{ marginTop: "10px" }}
                className="tbInput"
                type="text"
                placeholder="value"
                value={fieldValue}
                onChange={(e) => {
                  setFieldValue(e.target.value);
                  updateProperty(e, "value");
                }}
              />
            )}
          </div>
        </div>
      </div>
      <div></div>
      <br />
      {displayModal && (
        <DeleteModal
          itemToRemove={activeField ? activeField.id : item}
          altText={"field"}
          reset={false}
          exit={() => setDisplayModal(false)}
        />
      )}
    </div>
  );
}
