import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavBar } from "~/components/navbar/NavBar";

export const AppLayout = ({ title, children }) => {
  return (
    <>
      <NavBar title={title} />
      <View style={styles.root}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
