import React, { useRef } from "react";
import ReactDOM from "react-dom";
// import Konva from "konva";
import { Stage, Layer, Transformer, Group, Rect, Text } from "react-konva";
import { useStoreState } from "pullstate";
import { NewForm } from "../formai_states";

export default function OverviewKonva({ width, height, _canvas }) {
  const $canvas = useRef(_canvas);
  const fields = useStoreState(NewForm, (s) => s.fields);
  // const [active, triggerActive] = useState();
  const activeField = useStoreState(NewForm, (s) => s.activeField);
  const currentPage = useStoreState(NewForm, (s) => s.currentPage);

  function loadCanvas() {
    return <Layer>{addKonva()}</Layer>;
  }
  function addKonva() {
    const LABEL_OFFSET = 18;
    if (activeField) {
      const myNode = ReactDOM.findDOMNode($canvas.current);
      const myNodePosition = myNode.getBoundingClientRect();
      return Object.keys(fields).map((item) =>
        fields[item].page === currentPage ? (
          <Group>
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
  return (
    <Stage
      width={width}
      height={height}
      className="konvaStage"
      style={{ zIndex: "1", position: "absolute" }}
    >
      {activeField && loadCanvas()}
    </Stage>
  );
}
