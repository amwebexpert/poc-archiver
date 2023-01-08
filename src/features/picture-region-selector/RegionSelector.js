import { StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated";

import { MovableCircleHandle } from "./MovableCircleHandle";
import { INITIAL_PADDING, CIRCLE_SIZE } from "./constants";

export const RegionSelector = ({ imageLayout }) => {
  const topLeft = useSharedValue({
    x: INITIAL_PADDING,
    y: INITIAL_PADDING,
  });
  const bottomRight = useSharedValue({
    x: imageLayout.width - INITIAL_PADDING - CIRCLE_SIZE,
    y: imageLayout.height - INITIAL_PADDING - CIRCLE_SIZE,
  });

  return (
    <>
      <MovableCircleHandle imageLayout={imageLayout} position={topLeft} />
      <MovableCircleHandle imageLayout={imageLayout} position={bottomRight} />
    </>
  );
};

const styles = StyleSheet.create({});
