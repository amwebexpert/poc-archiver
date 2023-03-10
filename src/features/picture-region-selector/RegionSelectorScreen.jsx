import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppLayout } from "~/components/layout/AppLayout";
import { useSnackbar } from "~/components/snack-bar/useSnackbar";
import { ImageViewer } from "~/components/image/ImageViewer";
import { useImagePicker } from "~/hooks/useImagePicker";

import { RegionSelector } from "./RegionSelector";
import { useSharedValue } from "react-native-reanimated";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const RegionSelectorScreen = () => {
  const styles = useStyles();
  const {selectedImage, pickImage} = useImagePicker();
  const [showRegionInfo, setShowRegionInfo] = useState(false);
  const [imageLayout, setImageLayout] = useState({});
  const isLayoutReady = !!imageLayout?.width && !!imageLayout?.height;
  const selection = useSharedValue({ top: 0, left: 0, width: 0, height: 0 });
  const showSnackbarMessage = useSnackbar();

  const onImageLayout = (event) =>
    setImageLayout(event?.nativeEvent?.layout ?? {});

  const toggleRegionInfoVisibility = () =>
    setShowRegionInfo((visible) => !visible);

  const onCaptureRegion = () => {
    const { top, left, width, height } = selection.value;
    const rectangle = {
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(width),
      height: Math.round(height),
    };
    showSnackbarMessage(JSON.stringify(rectangle, null, 2));
  };

  return (
    <AppLayout title="Picture region selector">
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <View collapsable={false} onLayout={onImageLayout}>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />

            {isLayoutReady && (
              <RegionSelector
                imageLayout={imageLayout}
                selection={selection}
                showRegionInfo={showRegionInfo}
              />
            )}
          </View>
        </View>
      </GestureHandlerRootView>

      <View style={styles.actions}>
        <Button mode="outlined" onPress={pickImage} icon="image">
          Pick photo
        </Button>

        <Button mode="outlined" onPress={onCaptureRegion}>
          Capture
        </Button>

        <Button mode={showRegionInfo ? "contained" : "outlined"} onPress={toggleRegionInfoVisibility}>
          (x, y)
        </Button>
      </View>
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
    actions: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });
};
