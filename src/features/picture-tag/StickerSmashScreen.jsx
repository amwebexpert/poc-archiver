import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";
import { ImageViewer } from "~/components/image/ImageViewer";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const StickerSmashScreen = () => {
  const styles = useStyles();

  const choosePicture = () => {
    console.log("choosePicture");
  };

  const useThisPicture = () => {
    console.log("useThisPicture");
  };

  return (
    <AppLayout title="StickerSmash screen">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} />
        </View>
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={choosePicture} icon="image">
          Choose a photo
        </Button>

        <Button mode="outlined" onPress={useThisPicture}>
          Use this photo
        </Button>
      </View>
    </AppLayout>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 4,
      alignItems: "center",
    },
    imageContainer: {
      flex: 1,
      paddingTop: theme.spacing(7),
    },
    actions: {
      flex: 1,
      alignItems: "center",
    },
  });
};
