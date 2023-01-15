import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import { HALF_CIRCLE_SIZE, CIRCLE_SIZE } from "./constants";

const AnimatedView = Animated.createAnimatedComponent(View);

export const MovableCircleHandle = ({ imageLayout, position }) => {
  // state for drag movement boundaries
  const maxX = useSharedValue(imageLayout.width - HALF_CIRCLE_SIZE);
  const maxY = useSharedValue(imageLayout.height - HALF_CIRCLE_SIZE);

  const onDrag = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = position.value.x;
      context.translateY = position.value.y;
    },
    onActive: (event, context) => {
      const x = event.translationX + context.translateX;
      if (x >= -HALF_CIRCLE_SIZE && x <= maxX.value) {
        position.value = {
          x,
          y: position.value.y,
        };
      }

      const y = event.translationY + context.translateY;
      if (y >= -HALF_CIRCLE_SIZE && y <= maxY.value) {
        position.value = {
          x: position.value.x,
          y,
        };
      }
    },
  });

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value.x },
      { translateY: position.value.y },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[styles.container, circleAnimatedStyle]}>
        <View style={styles.circle} />
      </AnimatedView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: HALF_CIRCLE_SIZE,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
  rectangleRegion: {
    width: 100,
    height: 100,
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
});
