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
      context.translateX = topLeft.value.x;
      context.translateY = topLeft.value.y;
      isMoving.value = true;
    },
    onActive: (event, context) => {
      const unboundedX = event.translationX + context.translateX;
      let newX = unboundedX < 0 ? 0 : unboundedX;
      if (newX > bottomRight.value.x) {
        newX = bottomRight.value.x - 1;
      }

      const unboundedY = event.translationY + context.translateY;
      let newY = unboundedY < 0 ? 0 : unboundedY;
      if (newY > bottomRight.value.y) {
        newY = bottomRight.value.y - 1;
      }

      topLeft.value = { x: newX, y: newY };
    },
    onEnd: () => {
      // optional (remvoe if you don't want a "snap 2 the edge" behavior)
      applyTopLeftSnap(topLeft);
      isMoving.value = false;
    },
  });

  const onDragBottomRight = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = bottomRight.value.x;
      context.translateY = bottomRight.value.y;
      isMoving.value = true;
    },
    onActive: (event, context) => {
      const unboundedX = event.translationX + context.translateX;
      let newX = unboundedX > MAX_X ? MAX_X : unboundedX;
      if (newX < topLeft.value.x) {
        newX = topLeft.value.x + 1;
      }

      const unboundedY = event.translationY + context.translateY;
      let newY = unboundedY > MAX_Y ? MAX_Y : unboundedY;
      if (newY < topLeft.value.y) {
        newY = topLeft.value.y + 1;
      }

      bottomRight.value = { x: newX, y: newY };
    },
    onEnd: () => {
      // optional (remvoe if you don't want a "snap 2 the edge" behavior)
      applyBottomRightSnap(bottomRight, MAX_X, MAX_Y);
      isMoving.value = false;
    },
  });

  const onDragRectangle = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      "worklet";

      context.topLeft = topLeft.value;
      context.bottomRight = bottomRight.value;
      context.rectangleWidth = bottomRight.value.x - topLeft.value.x;
      context.rectangleHeight = bottomRight.value.y - topLeft.value.y;
      isMoving.value = true;
    },
    onActive: (event, context) => {
      "worklet";

      const unboundedX = event.translationX + context.topLeft.x;
      let newX = unboundedX < 0 ? 0 : unboundedX;
      if (newX + context.rectangleWidth > MAX_X) {
        newX = MAX_X - context.rectangleWidth;
      }

      const unboundedY = event.translationY + context.topLeft.y;
      let newY = unboundedY < 0 ? 0 : unboundedY;
      if (newY + context.rectangleHeight > MAX_Y) {
        newY = MAX_Y - context.rectangleHeight;
      }

      topLeft.value = { x: newX, y: newY };
      bottomRight.value = {
        x: newX + context.rectangleWidth,
        y: newY + context.rectangleHeight,
      };
    },
    onEnd: () => {
      "worklet";

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
