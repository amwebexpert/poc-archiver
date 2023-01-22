import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { useSnackbar } from "~/components/snack-bar/useSnackbar";
import { AppLayout } from "~/components/layout/AppLayout";

import * as openerService from "./opener-service";

export const ShareScreen = () => {
  const styles = useStyles();
  const showSnackbarMessage = useSnackbar();

  const openHtmlFileDemo = async () => {
    const { error } = await openerService.openHtmlFileDemo();
    if (error) {
      showSnackbarMessage(error.message);
    }
  };

  const openTextFileDemo = async () => {
    const { error } = await openerService.openTextFileDemo();
    if (error) {
      showSnackbarMessage(error.message);
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
    </AppLayout>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
    },
    heading: {
      marginBottom: theme.spacing(2),
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    });
};
