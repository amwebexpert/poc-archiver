import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <AppLayout title="Home screen">
      <View style={styles.root}>
      <Button mode="outlined" onPress={() => navigation.navigate("Database")}>
          Database screen
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate("NavScreen")}>
          Navigation screen
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate("Cypher")}>
          Cypher screen
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate("Files")}>
          Files screen
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate("Share")}>
          Share screen
        </Button>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
