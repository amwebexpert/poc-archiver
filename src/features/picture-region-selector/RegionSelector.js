import { StyleSheet } from "react-native";

import { MovableCircleHandle } from "./MovableCircleHandle";

export const RegionSelector = ({ imageLayout }) => {
  const isLayoutReady = !!imageLayout?.width && !!imageLayout?.height;

  if (!isLayoutReady) {
    return null;
  }

  return (
    <>
      <MovableCircleHandle imageLayout={imageLayout} />
      <MovableCircleHandle imageLayout={imageLayout} />
    </>
  );
};

const styles = StyleSheet.create({});
