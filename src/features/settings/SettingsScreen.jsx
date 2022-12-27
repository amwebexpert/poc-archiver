import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { AppLayout } from "../../components/layout/AppLayout";

export const SettingsScreen = () => {
  const route = useRoute();
  const { itemId, otherParam } = route.params;
  const navigation = useNavigation();

  return (
    <AppLayout title="Settings screen">
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Settings Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>

        <Button
          mode="outlined"
          title="Go back"
          onPress={() => navigation.goBack()}
        >
          Go back
        </Button>
      </View>
    </AppLayout>
  );
};
