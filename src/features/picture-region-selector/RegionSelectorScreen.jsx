import React, { useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Snackbar, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import { AppLayout } from "~/components/layout/AppLayout";
import { ImageViewer } from "~/components/image/ImageViewer";
import { RegionSelector } from "./RegionSelector";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const RegionSelectorScreen = () => {
  const styles = useStyles();
  const [selectedImage, setSelectedImage] = useState();
  const [snackbarText, setSnackbarText] = React.useState("");
  const [imageLayout, setImageLayout] = useState({});
  const isLayoutReady = !!imageLayout?.width && !!imageLayout?.height;

  const onImageLayout = (event) =>
    setImageLayout(event?.nativeEvent?.layout ?? {});

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <AppLayout title="Region selector (work in progress)">
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <View collapsable={false} onLayout={onImageLayout}>
            <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {isLayoutReady && <RegionSelector imageLayout={imageLayout} />}
          </View>
        </View>
      </GestureHandlerRootView>

      <View style={styles.actions}>
        <Button mode="contained" onPress={pickImage} icon="image">
          Choose a photo
        </Button>

        <Button mode="outlined" onPress={() => setSnackbarText("Toggle handles")}>
          Toggle handles
        </Button>
      </View>

      <Snackbar duration={1000} visible={!!snackbarText} onDismiss={() => setSnackbarText("")}>
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
    actions: {
      flexDirection: "row",
      justifyContent: "center"
    },
  });
};
