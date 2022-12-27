import * as React from "react";
import { View, StyleSheet } from "react-native";
import { NavBar } from "~/components/navbar/NavBar";
import { spacing } from "~/theme";

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
    margin: spacing(1),
  },
});
