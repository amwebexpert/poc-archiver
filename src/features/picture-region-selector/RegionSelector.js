import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { INITIAL_PADDING } from "./constants";
import { MovableHandle } from "./MovableHandle";
import {
  applyBottomRightSnap,
  applyTopLeftSnap,
  onBottomRightDrag,
  onRegionDrag,
  onTopLeftDrag,
  setupRegionContext,
} from "./region-selector-utils";

const AnimatedView = Animated.createAnimatedComponent(View);

export const RegionSelector = ({
  imageLayout = { width: 0, height: 0 },
  selection = {},
  showRegionInfo = false,
}) => {
  // state for drag movement boundaries
  const MAX_X = imageLayout.width;
  const MAX_Y = imageLayout.height;

  const isMoving = useSharedValue(false);
  const topLeft = useSharedValue({ x: INITIAL_PADDING, y: INITIAL_PADDING });
  const bottomRight = useSharedValue({
    x: imageLayout.width - INITIAL_PADDING,
    y: imageLayout.height - INITIAL_PADDING,
  });

  const top = useDerivedValue(() => topLeft.value.y);
  const left = useDerivedValue(() => topLeft.value.x);
  const width = useDerivedValue(() => bottomRight.value.x - topLeft.value.x);
  const height = useDerivedValue(() => bottomRight.value.y - topLeft.value.y);
  useDerivedValue(() => {
    const value = {
      top: top.value,
      left: left.value,
      width: width.value,
      height: height.value,
      borderStyle: isMoving.value ? "dashed" : "solid",
    };
    selection.value = value; // update parent selection property
    return value;
  });

  const containerStyle = useAnimatedStyle(() => selection.value ?? {});

  const onDragTopLeft = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      setupRegionContext({ context, topLeft, bottomRight, MAX_X, MAX_Y });
      isMoving.value = true;
    },
    onActive: (event, context) => {
      topLeft.value = onTopLeftDrag(event, context);
    },
    onEnd: () => {
      applyTopLeftSnap(topLeft);
      isMoving.value = false;
    },
  });

  const onDragBottomRight = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      setupRegionContext({ context, topLeft, bottomRight, MAX_X, MAX_Y });
      isMoving.value = true;
    },
    onActive: (event, context) => {
      bottomRight.value = onBottomRightDrag(event, context);
    },
    onEnd: () => {
      applyBottomRightSnap(bottomRight, MAX_X, MAX_Y);
      isMoving.value = false;
    },
  });

  const onDragRectangle = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      setupRegionContext({ context, topLeft, bottomRight, MAX_X, MAX_Y });
      isMoving.value = true;
    },
    onActive: (event, context) => {
      const { newTopLeft, newBottomRight } = onRegionDrag(event, context);
      topLeft.value = newTopLeft;
      bottomRight.value = newBottomRight;
    },
    onEnd: () => {
      isMoving.value = false;
    },
  });

  return (
    <>
      <MovableHandle
        position={topLeft}
        onDrag={onDragTopLeft}
        showCoordinates={showRegionInfo}
      />
      <MovableHandle
        position={bottomRight}
        onDrag={onDragBottomRight}
        showCoordinates={showRegionInfo}
      />

      <PanGestureHandler onGestureEvent={onDragRectangle}>
        <AnimatedView style={[styles.rectangleRegion, containerStyle]} />
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  rectangleRegion: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 1,
  },
});
