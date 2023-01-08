import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppLayout } from "~/components/layout/AppLayout";
import { ImageViewer } from "~/components/image/ImageViewer";
import { RegionSelector } from "./RegionSelector";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const RegionSelectorScreen = () => {
  const styles = useStyles();
  const [imageLayout, setImageLayout] = useState({});

  const onImageLayout = (event) =>
    setImageLayout(event?.nativeEvent?.layout ?? {});

  return (
    <AppLayout title="Region selection screen">
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <View collapsable={false} onLayout={onImageLayout}>
            <ImageViewer placeholderImageSource={PlaceholderImage} />
            <RegionSelector imageLayout={imageLayout} />
          </View>
        </View>
      </GestureHandlerRootView>
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
