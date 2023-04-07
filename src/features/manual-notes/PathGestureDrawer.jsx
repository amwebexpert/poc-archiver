import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, { useAnimatedProps, useAnimatedGestureHandler, runOnJS } from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const PathGestureDrawer = ({ strokeColor, strokeWidth, addPath, gesturePoints }) => {
  const gestureHandler = useAnimatedGestureHandler({
    onStart: ({ x, y }, _ctx) => {
      gesturePoints.value = [`M ${x},${y}`];
    },
    onActive: ({ x, y }, _ctx) => {
      gesturePoints.value = [...gesturePoints.value, `L ${x},${y}`];
    },
    onEnd: (_event, _ctx) => runOnJS(addPath)(gesturePoints.value.join(" ")),
  });

  const animatedProps = useAnimatedProps(() => ({
    d: gesturePoints.value.join(),
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={styles.container}>
          <AnimatedSvg height="100%" width="100%">
            <AnimatedPath animatedProps={animatedProps} stroke={strokeColor} strokeWidth={strokeWidth} fill="none" />
          </AnimatedSvg>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
