import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

import { HALF_CIRCLE_SIZE, CIRCLE_SIZE } from "./constants";
import { CoordinatesInfo } from "./CoordinatesInfo";

const AnimatedView = Animated.createAnimatedComponent(View);

export const MovableHandle = ({
  position,
  onDrag,
  showCoordinates = false,
}) => {
  const circlePositionX = useDerivedValue(
    () => position.value.x - HALF_CIRCLE_SIZE
  );
  const circlePositionY = useDerivedValue(
    () => position.value.y - HALF_CIRCLE_SIZE
  );

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: circlePositionX.value },
      { translateY: circlePositionY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[styles.container, circleAnimatedStyle]}>
        <View style={styles.circle} />
        {showCoordinates && <CoordinatesInfo position={position} />}
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
