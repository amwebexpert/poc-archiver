import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SettingsScreen } from "~/features/settings/SettingsScreen";
import { HomeScreen } from "~/features/home/HomeScreen";
import { appTheme } from "~/theme";
import { CypherScreen } from "./src/features/cypher/CypherScreen";
import { FilesScreen } from "./src/features/files/FilesScreen";
import { DatabaseScreen } from "./src/features/database/DatabaseScreen";

const Drawer = createDrawerNavigator();

const App = () => (
  <NavigationContainer theme={appTheme}>
    <PaperProvider theme={appTheme}>
      <Drawer.Navigator
        initialRouteName="Database"
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
          name="Database"
          component={DatabaseScreen}
          options={{
            title: "Database screen",
            drawerIcon: ({ size }) => (
              <MaterialCommunityIcons
                name="database"
                size={size}
                color={appTheme.colors.secondary}
              />
            ),
          }}
          initialParams={{}}
        />
        <Drawer.Screen
          name="Cypher"
          component={CypherScreen}
          options={{
            title: "Cypher screen",
            drawerIcon: ({ size }) => (
              <MaterialIcons
                name="enhanced-encryption"
                size={size}
                color={appTheme.colors.secondary}
              />
            ),
          }}
          initialParams={{}}
        />
        <Drawer.Screen
          name="Files"
          component={FilesScreen}
          options={{
            title: "Files screen",
            drawerIcon: ({ size }) => (
              <MaterialIcons
                name="save"
                size={size}
                color={appTheme.colors.secondary}
              />
            ),
          }}
          initialParams={{}}
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
