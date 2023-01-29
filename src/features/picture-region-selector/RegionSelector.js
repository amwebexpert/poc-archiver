import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { CIRCLE_SIZE, HALF_CIRCLE_SIZE, INITIAL_PADDING } from "./constants";
import { MovableHandle } from "./MovableHandle";
import {
  applyBottomRightSnap,
  applyTopLeftSnap,
} from "./region-selector-utils";

const AnimatedView = Animated.createAnimatedComponent(View);

export const RegionSelector = ({
  imageLayout = { width: 0, height: 0 },
  showHandles = true,
  selection,
}) => {
  // state for drag movement boundaries
  const MAX_X = imageLayout.width - HALF_CIRCLE_SIZE;
  const MAX_Y = imageLayout.height - HALF_CIRCLE_SIZE;

  const topLeft = useSharedValue({ x: INITIAL_PADDING, y: INITIAL_PADDING });
  const bottomRight = useSharedValue({
    x: imageLayout.width - INITIAL_PADDING - CIRCLE_SIZE,
    y: imageLayout.height - INITIAL_PADDING - CIRCLE_SIZE,
  });

  const containerStyle = useAnimatedStyle(() => ({
    top: topLeft.value.y + HALF_CIRCLE_SIZE,
    left: topLeft.value.x + HALF_CIRCLE_SIZE,
    width: bottomRight.value.x - topLeft.value.x,
    height: bottomRight.value.y - topLeft.value.y,
  }));

  const onDragTopLeft = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = topLeft.value.x;
      context.translateY = topLeft.value.y;
    },
    onActive: (event, context) => {
      const x = event.translationX + context.translateX;
      if (x >= -HALF_CIRCLE_SIZE && x <= bottomRight.value.x) {
        topLeft.value = { x, y: topLeft.value.y };
      }

      const y = event.translationY + context.translateY;
      if (y >= -HALF_CIRCLE_SIZE && y <= bottomRight.value.y) {
        topLeft.value = { x: topLeft.value.x, y };
      }
    },
    onEnd: () => applyTopLeftSnap(topLeft),
  });

  const onDragBottomRight = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = bottomRight.value.x;
      context.translateY = bottomRight.value.y;
    },
    onActive: (event, context) => {
      const x = event.translationX + context.translateX;
      if (x >= topLeft.value.x && x <= MAX_X) {
        bottomRight.value = { x, y: bottomRight.value.y };
      }

      const y = event.translationY + context.translateY;
      if (y >= topLeft.value.y && y <= MAX_Y) {
        bottomRight.value = { x: bottomRight.value.x, y };
      }
    },
    onEnd: () => applyBottomRightSnap(bottomRight, MAX_X, MAX_Y),
  });

  return (
    <>
      {showHandles && (
        <>
          <MovableHandle position={topLeft} onDrag={onDragTopLeft} />
          <MovableHandle position={bottomRight} onDrag={onDragBottomRight} />
        </>
      )}

      <AnimatedView style={[styles.rectangleRegion, containerStyle]} />
    </>
  );
};

const styles = StyleSheet.create({
  rectangleRegion: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 2,
    borderStyle: "dashed",
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
