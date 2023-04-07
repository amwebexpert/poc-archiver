import React from "react";
import Svg, { Path } from "react-native-svg";

const EmptyView = () => null;

const PathView = ({ d, strokeColor, strokeWidth }) => <Path d={d} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />;

const ELEMENT_VIEWERS = new Map([
  ["path", PathView],
  //...other elements supported by react-native-svg will be supported (not yet implemented)
  ["circle", EmptyView],
  ["rect", EmptyView],
  ["ellipse", EmptyView],
  ["line", EmptyView],
  ["polyline", EmptyView],
  ["polygon", EmptyView],
  ["text", EmptyView],
]);

const SvgViewer = React.forwardRef((props, ref) => {
  const { elements, ...rest } = props;

  return (
    <Svg height="100%" width="100%" {...rest} ref={ref}>
      {elements.map((item, i) => {
        const ElementViewer = ELEMENT_VIEWERS.get(item.type);
        return <ElementViewer key={i} {...item} />;
      })}
    </Svg>
  );
});

export default SvgViewer;
