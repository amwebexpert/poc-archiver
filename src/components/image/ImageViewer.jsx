import { StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper";

export const ImageViewer = ({ placeholderImageSource }) => {
  const styles = useStyles();

  return <Image source={placeholderImageSource} style={styles.image} />;
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
