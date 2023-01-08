import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import { HALF_CIRCLE_SIZE, CIRCLE_SIZE } from "./constants";

const AnimatedView = Animated.createAnimatedComponent(View);

export const MovableCircleHandle = ({ imageLayout, initialPosition }) => {
  // state for drag movement boundaries
  const maxX = useSharedValue(imageLayout.width - HALF_CIRCLE_SIZE);
  const maxY = useSharedValue(imageLayout.height - HALF_CIRCLE_SIZE);

  // state for drag behavior
  const translateX = useSharedValue(initialPosition.value.x);
  const translateY = useSharedValue(initialPosition.value.y);

  const onDrag = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      const x = event.translationX + context.translateX;
      if (x >= -HALF_CIRCLE_SIZE && x <= maxX.value) {
        translateX.value = x;
      }

      const y = event.translationY + context.translateY;
      if (y >= -HALF_CIRCLE_SIZE && y <= maxY.value) {
        translateY.value = y;
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, styles.container]}>
        <View style={styles.circle} />
      </AnimatedView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
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
