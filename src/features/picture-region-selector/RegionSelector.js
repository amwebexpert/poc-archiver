import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { MovableCircleHandle } from "./MovableCircleHandle";
import { INITIAL_PADDING, CIRCLE_SIZE } from "./constants";

const AnimatedView = Animated.createAnimatedComponent(View);

export const RegionSelector = ({ imageLayout }) => {
  const topLeft = useSharedValue({
    x: INITIAL_PADDING,
    y: INITIAL_PADDING,
  });
  const bottomRight = useSharedValue({
    x: imageLayout.width - INITIAL_PADDING - CIRCLE_SIZE,
    y: imageLayout.height - INITIAL_PADDING - CIRCLE_SIZE,
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      top: topLeft.value.y,
      left: topLeft.value.x,
      width: bottomRight.value.x - topLeft.value.x,
      height: bottomRight.value.y - topLeft.value.y,
    };
  });

  return (
    <>
      <MovableCircleHandle imageLayout={imageLayout} position={topLeft} />
      <MovableCircleHandle imageLayout={imageLayout} position={bottomRight} />

      <AnimatedView style={[styles.rectangleRegion, containerStyle]} />
    </>
  );
};

const styles = StyleSheet.create({
  rectangleRegion: {
    position: "absolute",
    borderColor: "red",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
});
