// import React, { Component } from 'react';
// import Konva from 'konva';
// import { render } from 'react-dom';
// import { Stage, Layer, Rect, Text } from 'react-konva';

// class App extends Component {
//   handleDragStart = e => {
//     e.target.setAttrs({
//       shadowOffset: {
//         x: 15,
//         y: 15
//       },
//       scaleX: 1.1,
//       scaleY: 1.1
//     });
//   };
//   handleDragEnd = e => {
//     e.target.to({
//       duration: 0.5,
//       easing: Konva.Easings.ElasticEaseOut,
//       scaleX: 1,
//       scaleY: 1,
//       shadowOffsetX: 5,
//       shadowOffsetY: 5
//     });
//   };
//   render() {
//     return (
//       <Stage width={window.innerWidth} height={window.innerHeight}>
//         <Layer>
//           <Text text="Try to drag a star" />
//           {[...Array(10)].map((_, i) => (
//             <Rect
//               key={i}
//               x={Math.random() * window.innerWidth}
//               y={Math.random() * window.innerHeight}
//               width={58}
//               height={20}
//               fill="#89b717"
//               opacity={0.8}
//               draggable
//               // rotation={Math.random() * 180}
//               shadowColor="black"
//               shadowBlur={10}
//               shadowOpacity={0.6}
//               onDragStart={this.handleDragStart}
//               onDragEnd={this.handleDragEnd}
//             />
//           ))}
//         </Layer>
//       </Stage>
//     );
//   }
// }

// render(<App />, document.getElementById('root'));


import React from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Transformer } from 'react-konva';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={e => {
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
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY)
          });
        }}
      />
      {isSelected && (
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
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1'
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2'
  }
];

const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
      }}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={newAttrs => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

render(<App />, document.getElementById('root'));
