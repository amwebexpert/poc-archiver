export const buildSvgPath = (coordinates = []) => {
  "worklet";

  if (!coordinates?.length > 0) {
    return "";
  }

  const [firstCoord, ...rest] = coordinates;
  const pathStart = `M ${firstCoord.x},${firstCoord.y}`;

  const path = rest.reduce((acc, { x, y }) => {
    return `${acc} L ${x},${y}`;
  }, pathStart);

  return path;
};
