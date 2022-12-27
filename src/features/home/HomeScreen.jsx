import { DrawerActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View } from "react-native";
import { Text, Button, Appbar } from "react-native-paper";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="menu"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
        <Appbar.Content title="Home screen" />
      </Appbar.Header>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          mode="outlined"
          title="Go to Settings..."
          onPress={() => {
            /* 1. Navigate to the Settings route with params */
            navigation.navigate("Settings", {
              itemId: 86,
              otherParam: "anything you want here",
            });
          }}
        >
          Go to details
        </Button>
      </View>
    </>
  );
}
