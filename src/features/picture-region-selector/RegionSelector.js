import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { MovableCircleHandle } from "./MovableCircleHandle";
import { INITIAL_PADDING, CIRCLE_SIZE, HALF_CIRCLE_SIZE } from "./constants";

const AnimatedView = Animated.createAnimatedComponent(View);

export const RegionSelector = ({
  imageLayout = { width: 0, height: 0 },
  showHandles = true,
}) => {
  const topLeft = useSharedValue({
    x: INITIAL_PADDING,
    y: INITIAL_PADDING,
  });
  const bottomRight = useSharedValue({
    x: imageLayout.width - INITIAL_PADDING - CIRCLE_SIZE,
    y: imageLayout.height - INITIAL_PADDING - CIRCLE_SIZE,
  });

  const containerStyle = useAnimatedStyle(() => ({
    top: topLeft.value.y + HALF_CIRCLE_SIZE,
    left: topLeft.value.x + HALF_CIRCLE_SIZE,
    width: bottomRight.value.x - topLeft.value.x,
    height: bottomRight.value.y - topLeft.value.y,
  }));

  return (
    <>
      {showHandles && (
        <>
          <MovableCircleHandle imageLayout={imageLayout} position={topLeft} />
          <MovableCircleHandle
            imageLayout={imageLayout}
            position={bottomRight}
          />
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
