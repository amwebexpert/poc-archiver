import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";
import { ImageViewer } from "~/components/image/ImageViewer";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const StickerSmashScreen = () => {
  const styles = useStyles();

  return (
    <AppLayout title="StickerSmash screen">
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer placeholderImageSource={PlaceholderImage} />
        </View>
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
  });
};
