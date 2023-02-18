import React from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";

import { AppLayout } from "~/components/layout/AppLayout";
import { useImagePicker } from "~/hooks/useImagePicker";

export const PictureZoom = () => {
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const { pickImage, selectedImage, dimensions } = useImagePicker();

  const contentWidth = width - 10;
  const contentHeight = contentWidth / dimensions?.aspectRatio ?? 1;

  return (
    <AppLayout title="Picture zoom">
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "red",
            width: "100%",
          }}
        >
          <ReactNativeZoomableView
            maxZoom={30}
            minZoom={1}
            contentWidth={contentWidth}
            contentHeight={contentHeight}
          >
            <Image
              style={{ width: "100%", height: "100%", resizeMode: "contain" }}
              source={{ uri: selectedImage }}
            />
          </ReactNativeZoomableView>
        </View>
      </View>

      <View style={styles.actions}>
        <Button mode="outlined" onPress={pickImage} icon="image">
          Pick photo
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
    },
    image: {
      resizeMode: "stretch",
      borderRadius: theme.roundness,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });
};
