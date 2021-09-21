import ReactDOM from "react-dom";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import { Stage, Layer, Transformer, Group, Rect, Text } from "react-konva";

// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import './Sample.less';
import { useStoreState } from "pullstate";
import { NewForm } from "../formai_states";
// import OverviewKonva from "./OverviewKonva";

const pdf_options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  scale: "0.4",
  zoom: "10%",
  width: "30%",
};

function OverviewPDF({ width, height }) {
  const file = useStoreState(NewForm, (s) => s.pdf_file);
  const currentPage = useStoreState(NewForm, (s) => s.currentPage);
  const activeField = useStoreState(NewForm, (s) => s.activeField);
  const fields = useStoreState(NewForm, (s) => s.fields);
  //   const [active, triggerActive] = useState();

  const numPages = useStoreState(NewForm, (s) => s.numPages);
  const pagesRef = useRef([]);

  async function onDocumentLoadSuccess({ numPages }) {
    NewForm.update((s) => {
      s.numPages = numPages;
    });
  }
  function toggleActive() {
    for (let i = 1; i <= numPages; i++) {
      if (i == currentPage) {
        document
          .getElementById(`pdf-overview__page_${i}`)
          .classList.add("active");
      } else
        document
          .getElementById(`pdf-overview__page_${i}`)
          .classList.remove("active");
    }
  }

  function loadCanvas(page) {
    return <Layer>{addKonva(page)}</Layer>;
  }
  function addKonva(page) {
    const LABEL_OFFSET = 18;
    console.log("add konva ran");
    if (activeField) {
      const myNode = ReactDOM.findDOMNode(pagesRef.current[page]);
      const myNodePosition = myNode.getBoundingClientRect();
      console.log(myNodePosition);
      return Object.keys(fields).map((item) =>
        fields[item].page === currentPage ? (
          <Group

          // onDragStart={() => dragHandler()}
          // onDragEnd={e => canvasListener(e)}
          >
            <Rect
              key={"rect" + new Date().getTime()}
              x={fields[item].loc.x1 * myNodePosition.width}
              y={fields[item].loc.y1 * myNodePosition.height}
              width={
                (fields[item].loc.x2 - fields[item].loc.x1) *
                myNodePosition.width
              }
              height={
                (fields[item].loc.y2 - fields[item].loc.y1) *
                myNodePosition.height
              }
              stroke={"#173751"}
              strokeWidth={width / 150}
              // fill={'#0a0a0a'}
              // shadowBlur={2}
              cornerRadius={3}
            />
            <Text
              text={fields[item].name}
              fontSize={width / 33.3}
              fontStyle={500}
              x={fields[item].loc.x1 * myNodePosition.width}
              y={fields[item].loc.y1 * myNodePosition.height - LABEL_OFFSET}
              fill={"#000000"}
              key={"text" + new Date().getTime()}
            />
            <Transformer />
          </Group>
        ) : null
      );
    }
  }
  useEffect(() => {
    pagesRef.current = pagesRef.current.slice(0, numPages + 1);
    toggleActive();
    return () => {};
  }, [numPages, pagesRef, currentPage]);
  return (
    <Document
      className="pdf-overview__doc"
      file={file}
      onLoadSuccess={(e) => onDocumentLoadSuccess(e)}
      options={pdf_options}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <div
          ref={(el) => (pagesRef.current[index + 1] = el)}
          className="pdf-overview__page--wrapper"
          id={`pdf-overview__page_${index + 1}`}
          key={`page_div${index}`}
        >
          <Stage
            width={width}
            height={height}
            className="konvaStage"
            style={{ zIndex: "1", position: "absolute" }}
          >
            {loadCanvas(index + 1)}
          </Stage>
          <Page
            className={`pdf-overview__page`}
            key={`page${index}`}
            pageNumber={index + 1}
            width={width}
            onClick={() => {
              NewForm.update((s) => {
                s.currentPage = index + 1;
              });
            }}
          />
          <h5 key={`page_h5${index}`} style={{ margin: "3px" }}>
            {index + 1}
          </h5>
        </div>
      ))}
    </Document>
  );
}

export default OverviewPDF;
