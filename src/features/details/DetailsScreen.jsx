import * as React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";


export function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>

      <Button
        title="Go to Details... again"
        mode="outlined"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      >Go to Details... again</Button>
      <Button
        mode="outlined"
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
      >Go to Home</Button>
      <Button
        mode="outlined"
        title="Go back"
        onPress={() => navigation.goBack()}
      >Go back</Button>
    </View>
  );
}