import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";

import { MovableHandle } from "./MovableHandle";
import { INITIAL_PADDING, CIRCLE_SIZE, HALF_CIRCLE_SIZE } from "./constants";

const AnimatedView = Animated.createAnimatedComponent(View);

export const RegionSelector = ({
  imageLayout = { width: 0, height: 0 },
  showHandles = true,
  selection,
}) => {
  // state for drag movement boundaries
  const maxX = useSharedValue(imageLayout.width - HALF_CIRCLE_SIZE);
  const maxY = useSharedValue(imageLayout.height - HALF_CIRCLE_SIZE);

  const topLeft = useSharedValue({ x: INITIAL_PADDING, y: INITIAL_PADDING });
  const bottomRight = useSharedValue({
    x: imageLayout.width - INITIAL_PADDING - CIRCLE_SIZE,
    y: imageLayout.height - INITIAL_PADDING - CIRCLE_SIZE,
  });

  useDerivedValue(() => {
    const value = {
      top: topLeft.value.y + HALF_CIRCLE_SIZE,
      left: topLeft.value.x + HALF_CIRCLE_SIZE,
      width: bottomRight.value.x - topLeft.value.x,
      height: bottomRight.value.y - topLeft.value.y,
    };
    selection.value = value; // update parent selection property
    return selection.value;
  });

  const containerStyle = useAnimatedStyle(() => selection.value);

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
  });

  const onDragBottomRight = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = bottomRight.value.x;
      context.translateY = bottomRight.value.y;
    },
    onActive: (event, context) => {
      const x = event.translationX + context.translateX;
      if (x >= topLeft.value.x && x <= maxX.value) {
        bottomRight.value = { x, y: bottomRight.value.y };
      }

      const y = event.translationY + context.translateY;
      if (y >= topLeft.value.y && y <= maxY.value) {
        bottomRight.value = { x: bottomRight.value.x, y };
      }
    },
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
      <AnimatedView style={[styles.rectangleRegion2, containerStyle]} />
    </>
  );
};

const styles = StyleSheet.create({
  rectangleRegion: {
    position: "absolute",
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  rectangleRegion2: {
    position: "absolute",
    borderColor: "white",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
});
