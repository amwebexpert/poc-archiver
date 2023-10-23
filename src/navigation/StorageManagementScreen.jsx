import { useNavigation } from "@react-navigation/native";

import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Paragraph, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

const StorageManagement = () => {
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <AppLayout title="Storage Management">
      <View style={styles.root}>
        <Paragraph style={styles.paragraph}>Device storage related features</Paragraph>

        <ScrollView style={styles.features}>
          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("Database")}
            icon="database"
          >
            SQLite Database
          </Button>

          <Button
            mode="outlined"
            style={styles.category}
            onPress={() => navigation.navigate("Files")}
            icon="folder"
          >
            File System
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

export default StorageManagement;
