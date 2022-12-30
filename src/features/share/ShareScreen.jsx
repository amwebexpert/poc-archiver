import React from "react";

import { View, StyleSheet } from "react-native";
import { Button, Snackbar, Text } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";
import { spacing } from "~/theme";

import * as openerService from "./opener-service";

export const ShareScreen = () => {
  const [snackbarText, setSnackbarText] = React.useState("");

  const openHtmlFileDemo = async () => {
    const { error } = await openerService.openHtmlFileDemo();
    if (error) {
      setSnackbarText(error.message);
    }
  };

  const openTextFileDemo = async () => {
    const { error } = await openerService.openTextFileDemo();
    if (error) {
      setSnackbarText(error.message);
    }
  };

  return (
    <AppLayout title="Share screen">
      <View style={styles.root}>
        <Text variant="headlineMedium" style={styles.heading}>
          Share file examples
        </Text>
        <Text>
          "expo-sharing" allows you to share files directly with other
          compatible applications.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={openTextFileDemo}>
          Share text doc
        </Button>

        <Button mode="contained" onPress={openHtmlFileDemo}>
          Share html doc
        </Button>
      </View>

      <Snackbar
        duration={3000}
        visible={!!snackbarText}
        onDismiss={() => setSnackbarText("")}
      >
        {snackbarText}
      </Snackbar>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    marginBottom: spacing(2),
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
