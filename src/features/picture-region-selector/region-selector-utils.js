import { SNAP_DELTA } from "./constants";

export const applyBottomRightSnap = (position, maxX, maxY) => {
  "worklet";
  const newX = position.value.x;
  const newY = position.value.y;

  position.value = {
    x: maxX - newX < SNAP_DELTA ? maxX : newX,
    y: maxY - newY < SNAP_DELTA ? maxY : newY,
  };
};

export const applyTopLeftSnap = (position) => {
  "worklet";
  const newX = position.value.x;
  const newY = position.value.y;
  position.value = {
    x: newX < SNAP_DELTA ? 0 : newX,
    y: newY < SNAP_DELTA ? 0 : newY,
  };
};
