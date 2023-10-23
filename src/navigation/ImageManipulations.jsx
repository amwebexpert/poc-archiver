import { useNavigation } from "@react-navigation/native";

import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

const ImageManipulations = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <AppLayout title="Image manipulations">
      <View style={styles.root}>
        <Paragraph style={styles.paragraph}>
          Features related to image manipulation.
        </Paragraph>

        <ScrollView style={styles.features}>
          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("StickerSmash")}
            icon="image"
          >
            Sticker Smash
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("RegionSelector")}
            icon="picture-in-picture-bottom-right-outline"
          >
            Picture region selector
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("PictureZoomScreen")}
            icon="magnify-plus"
          >
            Picture Zoom
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("ManualNotesScreen")}
            icon="notebook-edit-outline"
          >
            Hand written notes
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("3DView")}
            icon="cube-scan"
          >
            3D Model Viewer
          </Button>
        </ScrollView>
      </View>
    </AppLayout>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: theme.spacing(2),
    },
    paragraph: {
      marginVertical: theme.spacing(2),
    },
    features: {
      marginTop: theme.spacing(2),
    },
    category: {
      marginVertical: theme.spacing(2),
    },
  });
};

export default ImageManipulations;
