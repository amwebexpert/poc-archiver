import Svg, { Path } from "react-native-svg";

const EmptyView = () => null;

const PathView = ({ d, strokeColor, strokeWidth }) => (
  <Path d={d} stroke={strokeColor} strokeWidth={strokeWidth} />
);

const ELEMENT_VIEWERS = new Map([
  ["path", PathView],
  ["circle", EmptyView],
  ["rect", EmptyView],
  ["ellipse", EmptyView],
  ["line", EmptyView],
  ["polyline", EmptyView],
  ["polygon", EmptyView],
  ["text", EmptyView],
  //...other elements supported by react-native-svg
]);

export const SvgViewer = ({ elements, ...others }) => (
  <Svg height="100%" width="100%" {...others}>
    {elements.map((item, i) => {
      const ElementViewer = ELEMENT_VIEWERS.get(item.type);
      return <ElementViewer key={i} {...item} />;
    })}
  </Svg>
);
