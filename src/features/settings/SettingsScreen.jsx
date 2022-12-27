import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { Text, Button, Appbar } from "react-native-paper";

export const SettingsScreen = () => {
  const route = useRoute();
  const { itemId, otherParam } = route.params;
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <Appbar.Content title="Settings screen" />
      </Appbar.Header>
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
    </>
  );
};
