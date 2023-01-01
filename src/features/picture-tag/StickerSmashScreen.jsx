import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, FAB, useTheme } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

import { AppLayout } from "~/components/layout/AppLayout";
import { ImageViewer } from "~/components/image/ImageViewer";
import { EmojiListDialog } from "./EmojiListDialog";
import { EmojiSticker } from "./EmojiSticker";

const PlaceholderImage = require("../../../assets/images/backgrounds/background-dark.jpg");

export const StickerSmashScreen = () => {
  const styles = useStyles();
  const [selectedImage, setSelectedImage] = useState();
  const [showAppOptions, setShowAppOptions] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
  };

  const useThisPicture = () => {
    setShowAppOptions(true);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImage = async () => {
    // we will implement this later
  };

  return (
    <AppLayout title="StickerSmash screen">
      <GestureHandlerRootView style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {!!pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </GestureHandlerRootView>

      {showAppOptions ? (
        <View style={styles.optionActions}>
          <FAB
            icon="undo"
            label="Reset"
            variant="secondary"
            style={styles.fab}
            onPress={onReset}
          />
          <FAB icon="plus" style={styles.fab} onPress={onAddSticker} />
          <FAB
            icon="content-save"
            label="Save"
            variant="secondary"
            style={styles.fab}
            onPress={onSaveImage}
          />
        </View>
      ) : (
        <View style={styles.actions}>
          <Button mode="contained" onPress={pickImage} icon="image">
            Choose a photo
          </Button>

          <Button mode="outlined" onPress={useThisPicture}>
            Use this photo
          </Button>
        </View>
      )}

      <EmojiListDialog
        isVisible={isModalVisible}
        onDismiss={onModalClose}
        onSelect={setPickedEmoji}
      />
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
    optionActions: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    fab: {
      borderRadius: theme.spacing(4),
    },
  });
};
