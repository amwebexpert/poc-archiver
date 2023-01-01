import * as React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavBar } from "~/components/navbar/NavBar";
import { useTheme } from "react-native-paper";

export const AppLayout = ({ title, children }) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.root} edges={["bottom", "left", "right"]}>
      <NavBar title={title} />
      <View style={styles.content}>{children}</View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    content: {
      flex: 1,
      margin: theme.spacing(1),
    },
  });
};
