import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

import { SettingsScreen } from "~/features/settings/SettingsScreen";
import { HomeScreen } from "~/features/home/HomeScreen";
import { appTheme } from "~/theme";

const Drawer = createDrawerNavigator();

const App = () => (
  <NavigationContainer theme={appTheme}>
    <PaperProvider theme={appTheme}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{}}
          options={{
            title: "Home screen",
            drawerIcon: ({ size }) => (
              <Ionicons
                name="md-home"
                size={size}
                color={appTheme.colors.secondary}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: "Settings screen",
            drawerIcon: ({ size }) => (
              <Ionicons
                name="settings"
                size={size}
                color={appTheme.colors.secondary}
              />
            ),
          }}
          initialParams={{}}
        />
      </Drawer.Navigator>
    </PaperProvider>
  </NavigationContainer>
);

export default App;
