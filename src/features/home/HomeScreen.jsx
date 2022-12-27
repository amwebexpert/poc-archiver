import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <AppLayout title="Home screen">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          mode="outlined"
          title="Go to Settings..."
          onPress={() => {
            navigation.navigate("Settings", {
              itemId: 86,
              otherParam: "anything you want here",
            });
          }}
        >
          Go to details
        </Button>
      </View>
    </AppLayout>
  );
};
