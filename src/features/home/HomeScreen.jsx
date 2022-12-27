import * as React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";

export function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        mode="outlined"
        title="Go to Details..."
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
          });
        }}
      >Go to details</Button>
    </View>
  );
}
