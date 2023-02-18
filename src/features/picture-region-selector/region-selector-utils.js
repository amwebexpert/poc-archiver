import { SNAP_DELTA } from "./constants";

// optional (dont call it if you don't want a "snap 2 the edge" behavior)
export const applyBottomRightSnap = (position, maxX, maxY) => {
  "worklet";
  const newX = position.value.x;
  const newY = position.value.y;

  position.value = {
    x: maxX - newX < SNAP_DELTA ? maxX : newX,
    y: maxY - newY < SNAP_DELTA ? maxY : newY,
  };
};

// optional (dont call it if you don't want a "snap 2 the edge" behavior)
export const applyTopLeftSnap = (position) => {
  "worklet";
  const newX = position.value.x;
  const newY = position.value.y;
  position.value = {
    x: newX < SNAP_DELTA ? 0 : newX,
    y: newY < SNAP_DELTA ? 0 : newY,
  };
};

export const setupRegionContext = ({
  context,
  topLeft,
  bottomRight,
  MAX_X,
  MAX_Y,
}) => {
  "worklet";

  context.topLeft = topLeft.value;
  context.bottomRight = bottomRight.value;
  context.rectangleWidth = bottomRight.value.x - topLeft.value.x;
  context.rectangleHeight = bottomRight.value.y - topLeft.value.y;
  context.MAX_X = MAX_X;
  context.MAX_Y = MAX_Y;
};

export const onRegionDrag = (event, context) => {
  "worklet";

  const { topLeft, rectangleWidth, rectangleHeight, MAX_X, MAX_Y } = context;

  const unboundedX = event.translationX + topLeft.x;
  let x = unboundedX < 0 ? 0 : unboundedX;
  if (x + rectangleWidth > MAX_X) {
    x = MAX_X - rectangleWidth;
  }

  const unboundedY = event.translationY + topLeft.y;
  let y = unboundedY < 0 ? 0 : unboundedY;
  if (y + rectangleHeight > MAX_Y) {
    y = MAX_Y - rectangleHeight;
  }

  return {
    newTopLeft: { x, y },
    newBottomRight: { x: x + rectangleWidth, y: y + rectangleHeight },
  };
};

export const onTopLeftDrag = (event, context) => {
  "worklet";

  const { topLeft, bottomRight } = context;

  const unboundedX = event.translationX + topLeft.x;
  let x = unboundedX < 0 ? 0 : unboundedX;
  if (x > bottomRight.x) {
    x = bottomRight.x - 1;
  }

  const unboundedY = event.translationY + topLeft.y;
  let y = unboundedY < 0 ? 0 : unboundedY;
  if (y > bottomRight.y) {
    y = bottomRight.y - 1;
  }

  return { x, y };
};

export const onBottomRightDrag = (event, context) => {
  "worklet";

  const { topLeft, bottomRight, MAX_X, MAX_Y } = context;

  const unboundedX = event.translationX + bottomRight.x;
  let x = unboundedX > MAX_X ? MAX_X : unboundedX;
  if (x < topLeft.x) {
    x = topLeft.x + 1;
  }

  const unboundedY = event.translationY + bottomRight.y;
  let y = unboundedY > MAX_Y ? MAX_Y : unboundedY;
  if (y < topLeft.y) {
    y = topLeft.y + 1;
  }

  return { x, y };
};
