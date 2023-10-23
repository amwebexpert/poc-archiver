import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import * as ImagePicker from "expo-image-picker";
import * as React from "react";

import { Linking, ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph, Text, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";
import { APP_URL } from "./HomeScreen.constants";

export const HomeScreen = () => {
  const styles = useStyles();
  const navigation = useNavigation();
  const [mediaLibraryStatus, setMediaLibraryStatus] = React.useState(null);
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    React.useState(null);

  React.useEffect(() => {
    ImagePicker.requestCameraPermissionsAsync().then(setCameraPermissionStatus);
    ImagePicker.requestMediaLibraryPermissionsAsync().then(
      setMediaLibraryStatus
    );
  }, []);

  return (
    <AppLayout title="Home">
      <ScrollView>
        <View style={styles.root}>
          <Text variant="headlineMedium" style={styles.heading}>
            Expo demos
          </Text>

          <Paragraph style={styles.paragraph}>
            {Device.brand} {Device.modelName} ({Device.osName}{" "}
            {Device.osVersion})
          </Paragraph>

          <Paragraph style={styles.paragraph}>
            Camera & Media library permission status: [
            {cameraPermissionStatus?.status}, {mediaLibraryStatus?.status}]
          </Paragraph>

          <Paragraph style={styles.paragraph}>
            Enjoy this "Expo" proof of concepts collection for React Native app
            development, including: picture region selector, encryption, sqlite,
            file system, material design user interface, sharing, 3D model
            viewer, and more.
          </Paragraph>

          <Paragraph style={styles.paragraph}>
            Stay tuned because this is also an evolutive app used as a sandbox
            to learn by implementing real solutions to real problems.
          </Paragraph>
        </View>

        <Button
          mode="outlined"
          style={styles.category}
          onPress={() => navigation.navigate("ImageTransform")}
          icon="image"
        >
          Image manipulation…
        </Button>
        <Button
          mode="outlined"
          style={styles.category}
          onPress={() => navigation.navigate("DeviceStorage")}
          icon="database"
        >
          Storage management…
        </Button>
        <Button
          mode="outlined"
          style={styles.category}
          onPress={() => navigation.navigate("OtherDemos")}
          icon="brain"
        >
          Miscellaneous…
        </Button>
      </ScrollView>

      <View>
        <Paragraph style={styles.paragraphCentered}>
          Like it? Do not forget to star the repo!
        </Paragraph>

        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => Linking.openURL(APP_URL)}
            icon="star"
          >
            Star it!
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.navigate("About")}
            icon="book-information-variant"
          >
            Licences…
          </Button>
        </View>
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
    heading: {
      marginVertical: theme.spacing(2),
    },
    paragraph: {
      marginVertical: theme.spacing(1),
    },
    paragraphCentered: {
      marginVertical: theme.spacing(1),
      textAlign: "center",
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    category: {
      marginVertical: theme.spacing(1),
    },
  });
};
