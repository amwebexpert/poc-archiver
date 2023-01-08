import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { appTheme } from "~/theme";
import { SettingsScreen } from "~/features/settings/SettingsScreen";
import { HomeScreen } from "~/features/home/HomeScreen";
import { CypherScreen } from "~/features/cypher/CypherScreen";
import { FilesScreen } from "~/features/files/FilesScreen";
import { DatabaseScreen } from "~/features/database/DatabaseScreen";
import { ShareScreen } from "~/features/share/ShareScreen";
import { NavScreen } from "~/features/navigation/NavScreen";
import { StickerSmashScreen } from "~/features/picture-tag/StickerSmashScreen";
import { RegionSelectorScreen } from "./src/features/picture-region-selector/RegionSelectorScreen";

const Drawer = createDrawerNavigator();

const App = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  return (
    <NavigationContainer theme={appTheme}>
      <PaperProvider theme={appTheme}>
        <Drawer.Navigator
          initialRouteName="RegionSelector"
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
            name="RegionSelector"
            component={RegionSelectorScreen}
            initialParams={{}}
            options={{
              title: "RegionSelector screen",
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="picture-in-picture-bottom-right-outline"
                  size={size}
                  color={appTheme.colors.secondary}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="StickerSmash"
            component={StickerSmashScreen}
            initialParams={{}}
            options={{
              title: "StickerSmash screen",
              drawerIcon: ({ size }) => (
                <FontAwesome
                  name="file-picture-o"
                  size={size}
                  color={appTheme.colors.secondary}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="NavScreen"
            component={NavScreen}
            initialParams={{}}
            options={{
              title: "Navigation screen",
              drawerIcon: ({ size }) => (
                <FontAwesome5
                  name="directions"
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
            name="Share"
            component={ShareScreen}
            options={{
              title: "Share screen",
              drawerIcon: ({ size }) => (
                <MaterialCommunityIcons
                  name="share"
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
};

export default App;
