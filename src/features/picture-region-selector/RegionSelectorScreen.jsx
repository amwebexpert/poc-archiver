import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppLayout } from "~/components/layout/AppLayout";
import { ImageViewer } from "~/components/image/ImageViewer";
import { MovableCircleHandle } from "./MovableCircleHandle";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const RegionSelectorScreen = () => {
  const [snackbarText, setSnackbarText] = React.useState("");
  const styles = useStyles();

  return (
    <AppLayout title="Region selection screen">
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <View collapsable={false}>
            <ImageViewer placeholderImageSource={PlaceholderImage} />
            <MovableCircleHandle />
            <MovableCircleHandle />
          </View>
        </View>
      </GestureHandlerRootView>

      <Snackbar visible={!!snackbarText} onDismiss={() => setSnackbarText("")}>
        {snackbarText}
      </Snackbar>
    </AppLayout>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    imageContainer: {
      flex: 1,
      paddingTop: theme.spacing(7),
    },
  });
};
