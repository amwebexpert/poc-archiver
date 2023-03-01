import React from "react";
import { StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";

export const SvgExporter = ({ paths }) => (
  <Svg height="100%" width="100%" style={styles.container}>
    {paths.map((d, index) => (
      <Path d={d} key={index} stroke="red" strokeWidth={3} />
    ))}
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});
