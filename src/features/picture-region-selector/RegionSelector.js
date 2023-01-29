import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

import { CIRCLE_SIZE, HALF_CIRCLE_SIZE, INITIAL_PADDING } from "./constants";
import { MovableHandle } from "./MovableHandle";

const AnimatedView = Animated.createAnimatedComponent(View);

const onGestureStart = (context, position) => {
  context.translateX = position.value.x;
  context.translateY = position.value.y;
};

const applyBottomRightSnap = (position, maxX, maxY) => {
  const newX = position.value.x;
  const newY = position.value.y;

  position.value = {
    x: maxX - newX < 8 ? maxX : newX,
    y: maxY - newY < 8 ? maxY : newY,
  };
};

const applyTopLeftSnap = (position) => {
  const newX = position.value.x;
  const newY = position.value.y;
  position.value = {
    x: newX + HALF_CIRCLE_SIZE < 8 ? -HALF_CIRCLE_SIZE : newX,
    y: newY + HALF_CIRCLE_SIZE < 8 ? -HALF_CIRCLE_SIZE : newY,
  };
};

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
    onStart: (_event, context) => onGestureStart(context, topLeft),
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
    onStart: (_event, context) => onGestureStart(context, bottomRight),
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
