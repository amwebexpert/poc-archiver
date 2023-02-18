import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";

const options = {
  allowsEditing: true,
  quality: 1,
};

export const useImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [dimensions, setDimensions] = useState();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync(options);
    if (result.canceled) {
      return;
    }

    const { uri } = result.assets[0];
    setSelectedImage(uri);

    Image.getSize(
      uri,
      (width, height) =>
        setDimensions({ width, height, aspectRatio: width / height }),
      console.error
    );
  };

  return {
    pickImage,
    selectedImage,
    dimensions,
  };
};
