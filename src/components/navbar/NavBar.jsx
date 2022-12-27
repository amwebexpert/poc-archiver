import * as React from "react";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";

export const NavBar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Appbar.Header>
      <Appbar.Action
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
