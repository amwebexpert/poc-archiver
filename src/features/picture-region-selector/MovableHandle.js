import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { HALF_CIRCLE_SIZE, CIRCLE_SIZE } from "./constants";

const AnimatedView = Animated.createAnimatedComponent(View);

export const MovableHandle = ({ position, onDrag }) => {
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
});
