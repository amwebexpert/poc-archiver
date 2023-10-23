import { useNavigation } from "@react-navigation/native";

import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

const Others = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <AppLayout title="Miscellaneous">
      <View style={styles.root}>
        <Paragraph style={styles.paragraph}>Other features</Paragraph>

        <ScrollView style={styles.features}>
        <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("NavScreen")}
            icon="directions"
          >
            Navigation screen
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("Share")}
            icon="share"
          >
            Share screen
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("Cypher")}
            icon="lock"
          >
            Cypher screen
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("OAuth")}
            icon="login"
          >
            AWS Authentication
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

export default Others;
