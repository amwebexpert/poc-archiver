import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

export const NavScreen = () => {
  const navigation = useNavigation();

  return (
    <AppLayout title="Navigation screen">
      <View style={styles.root}>
        <Button
          mode="outlined"
          title="Go to Settings"
          onPress={() =>
            navigation.navigate("Settings", {
              itemId: 86,
              otherParam: "anything you want here",
            })
          }
        >
          Settings screen with params
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
