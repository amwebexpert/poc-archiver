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
      const newX = event.translationX + context.translateX;
      const newY = event.translationY + context.translateY;

      topLeft.value = {
        x: event.dx < 0 // moving left
          ? Math.max(-HALF_CIRCLE_SIZE, newX)
          : Math.min(bottomRight.value.x, newX),
        y: event.dy < 0 // moving up
          ? Math.max(-HALF_CIRCLE_SIZE, newY)
          : Math.min(bottomRight.value.y, newY),
      };
    },
  });

  const onDragBottomRight = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = bottomRight.value.x;
      context.translateY = bottomRight.value.y;
    },
    onActive: (event, context) => {
      const newX = event.translationX + context.translateX;
      const newY = event.translationY + context.translateY;

      bottomRight.value = {
        x: event.dx > 0 // moving right
          ? Math.max(maxX.value, newX)
          : Math.min(topLeft.value.x, newX),
        y: event.dy > 0 // moving down
          ? Math.max(maxY.value, newY)
          : Math.min(topLeft.value.y, newY),
      };
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
