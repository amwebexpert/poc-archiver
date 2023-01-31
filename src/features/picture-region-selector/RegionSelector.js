import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
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
  selection = {},
}) => {
  // state for drag movement boundaries
  const MAX_X = imageLayout.width - HALF_CIRCLE_SIZE;
  const MAX_Y = imageLayout.height - HALF_CIRCLE_SIZE;

  const isMoving = useSharedValue(false);
  const topLeft = useSharedValue({ x: INITIAL_PADDING, y: INITIAL_PADDING });
  const bottomRight = useSharedValue({
    x: imageLayout.width - INITIAL_PADDING - CIRCLE_SIZE,
    y: imageLayout.height - INITIAL_PADDING - CIRCLE_SIZE,
  });

  const top = useDerivedValue(() => topLeft.value.y + HALF_CIRCLE_SIZE);
  const left = useDerivedValue(() => topLeft.value.x + HALF_CIRCLE_SIZE);
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
      const x = event.translationX + context.translateX;
      if (x >= -HALF_CIRCLE_SIZE && x <= bottomRight.value.x) {
        topLeft.value = { x, y: topLeft.value.y };
      }

      const y = event.translationY + context.translateY;
      if (y >= -HALF_CIRCLE_SIZE && y <= bottomRight.value.y) {
        topLeft.value = { x: topLeft.value.x, y };
      }
    },
    onEnd: () => {
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
      const x = event.translationX + context.translateX;
      if (x >= topLeft.value.x && x <= MAX_X) {
        bottomRight.value = { x, y: bottomRight.value.y };
      }

      const y = event.translationY + context.translateY;
      if (y >= topLeft.value.y && y <= MAX_Y) {
        bottomRight.value = { x: bottomRight.value.x, y };
      }
    },
    onEnd: () => {
      applyBottomRightSnap(bottomRight, MAX_X, MAX_Y);
      isMoving.value = false;
    },
  });

  const onDragRectangle = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      "worklet";
      context.topLeft = topLeft.value;
      context.bottomRight = bottomRight.value;
      isMoving.value = true;
    },
    onActive: (event, context) => {
      "worklet";
      topLeft.value = {
        x: event.translationX + context.topLeft.x,
        y: event.translationY + context.topLeft.y,
      };

      bottomRight.value = {
        x: event.translationX + context.bottomRight.x,
        y: event.translationY + context.bottomRight.y,
      };
    },
    onEnd: () => {
      isMoving.value = false;
    },
  });

  return (
    <>
      <MovableHandle position={topLeft} onDrag={onDragTopLeft} />
      <MovableHandle position={bottomRight} onDrag={onDragBottomRight} />

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
