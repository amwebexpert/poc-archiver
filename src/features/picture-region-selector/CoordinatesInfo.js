import { StyleSheet } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { HALF_CIRCLE_SIZE } from "./constants";

export const CoordinatesInfo = ({ position }) => {
  const animatedTextX = useDerivedValue(
    () => `x: ${Math.round(position.value.x)}`
  );

  const animatedTextY = useDerivedValue(
    () => `y: ${Math.round(position.value.y)}`
  );

  return (
    <>
      <ReText style={[styles.coord, styles.coordX]} text={animatedTextX} />
      <ReText style={[styles.coord, styles.coordY]} text={animatedTextY} />
    </>
  );
};

const styles = StyleSheet.create({
  coord: {
    position: "absolute",
    color: "white",
    paddingLeft: 2,
    backgroundColor: "black",
    left: 4,
  },
  coordX: {
    top: HALF_CIRCLE_SIZE - 24,
  },
  coordY: {
    top: HALF_CIRCLE_SIZE - 4,
  },
});
