import React, { createRef } from "react";
import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { Button, IconButton, useTheme } from "react-native-paper";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";

import { AppLayout } from "~/components/layout/AppLayout";
import { useImagePicker } from "~/hooks/useImagePicker";

export const PictureZoom = () => {
  const zoomableViewRef = createRef();
  const styles = useStyles();
  const { width } = useWindowDimensions();
  const { pickImage, selectedImage, dimensions } = useImagePicker();

  const contentWidth = width - 10;
  const contentHeight = contentWidth / dimensions?.aspectRatio ?? 1;

  const onTransform = (zoomableViewEventObject) =>
    console.log("onTransform", zoomableViewEventObject);

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
            ref={zoomableViewRef}
            initialZoom={1}
            minZoom={1}
            maxZoom={10}
            initialOffsetX={0}
            initialOffsetY={0}
            bindToBorders={true}
            onTransform={onTransform}
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
          Galery
        </Button>

        <IconButton
          mode="outlined"
          onPress={() => zoomableViewRef.current.zoomTo(1)}
          icon="undo"
          style={styles.iconButton}
        />
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
    iconButton: {
      margin: 0,
    },
  });
};
