import * as React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "~/components/navbar/NavBar";
import { spacing } from "~/theme";

export const AppLayout = ({ title, children }) => {
  return (
    <SafeAreaView style={styles.root} edges={["bottom", "left", "right"]}>
      <NavBar title={title} />
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 1,
    margin: spacing(1),
  },
});
