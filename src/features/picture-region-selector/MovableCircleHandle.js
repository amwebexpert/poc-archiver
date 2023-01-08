import { View, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export const MovableCircleHandle = () => {
  // state for drag behavior
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDrag = useAnimatedGestureHandler({
    onStart: (_event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
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
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <View style={styles.circle} />
      </AnimatedView>
    </PanGestureHandler>
  );
};

const CIRCLE_SIZE = 30;
const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: CIRCLE_SIZE / 2,
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
