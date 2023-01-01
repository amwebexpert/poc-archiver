import { StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper";

export const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
  const styles = useStyles();
  const imageSource = selectedImage
    ? { uri: selectedImage }
    : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    image: {
      width: 340,
      height: 440,
      borderRadius: theme.roundness,
    },
  });
};
