import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";
import { ImageViewer } from "~/components/image/ImageViewer";
import { useImagePicker } from "~/hooks/useImagePicker";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const PictureZoom = () => {
  const styles = useStyles();
  const { selectedImage, pickImage } = useImagePicker();

  return (
    <AppLayout title="Picture zoom">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
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
