// node_modules
import React, { useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";
// import Konva from "konva";
import { Transformer, Rect } from "react-konva";
import { useStoreState } from "pullstate";
// hooks
// import { consoleJSON } from "../hooks/CustomHooks";
// states
import { NewForm } from "../formai_states";

const KonvaRect = ({ item, myNode, updateActive }) => {
  const [active, triggerActive] = useState();
  const ACTIVE_COLOR = "#173751"; // navyblue
  const NON_ACTIVE_COLOR = "#33B7C5"; // teal
  const fields = useStoreState(NewForm, (s) => s.fields);
  const activeField = useStoreState(NewForm, (s) => s.activeField);
  // const currentPage = useStoreState(NewForm, s => s.currentPage);
  const lastChange = useStoreState(NewForm, (s) => s.lastChange);
  const shapeRef = useRef();
  const trRef = useRef();

  function dragEnd(e, item, thisNode) {
    const myRect = e.target;
    NewForm.update((s) => {
      s.activeField.loc.x1 = myRect.x() / thisNode.width;
      s.activeField.loc.y1 = myRect.y() / thisNode.height;
      s.activeField.loc.x2 = (myRect.x() + myRect.width()) / thisNode.width;
      s.activeField.loc.y2 = (myRect.y() + myRect.height()) / thisNode.height;
      s.fields[item] = s.activeField;
      s.lastChange = new Date().getTime();
    });
    triggerActive(lastChange);
  }

  useEffect(() => {
    if (fields[item] && fields[item] === activeField) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
    return () => {};
  }, [activeField, fields, item, active]);

  return (
    <>
      {fields[item] && (
        <Rect
          ref={shapeRef}
          draggable={fields[item] === activeField}
          perfectDrawEnabled={true}
          onDblClick={updateActive}
          onDragEnd={(e) => dragEnd(e, item, myNode)}
          x={fields[item].loc.x1 * myNode.width}
          y={fields[item].loc.y1 * myNode.height}
          width={(fields[item].loc.x2 - fields[item].loc.x1) * myNode.width}
          height={(fields[item].loc.y2 - fields[item].loc.y1) * myNode.height}
          stroke={
            fields[item] === activeField ? ACTIVE_COLOR : NON_ACTIVE_COLOR
          }
          strokeWidth={myNode.width / 150}
          strokeScaleEnabled={false}
          cornerRadius={3}
          fill={"rgba(194, 194, 194, 0.301)"}
          // onTransform={e => console.log(e)}
          // onDragStart={e => dragStart(e, item, myNode)}
          // onMouseOver={e => canvasPopUpFunc(e, item, myNode)}
          // shadowBlur={2}
          onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            NewForm.update((s) => {
              s.fields[item].loc.x1 = node.x() / myNode.width;
              s.fields[item].loc.y1 = node.y() / myNode.height;
              s.fields[item].loc.x2 =
                (node.x() + node.width() * scaleX) / myNode.width;
              s.fields[item].loc.y2 =
                (node.y() + node.height() * scaleY) / myNode.height;
              s.lastChange = new Date().getTime();
            });
          }}
        />
      )}

      {fields[item] === activeField && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default KonvaRect;
