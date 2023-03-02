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
import { SnackbarProvider } from "~/components/snack-bar/SnackbarProvider";

import { SettingsScreen } from "~/features/settings/SettingsScreen";
import { HomeScreen } from "~/features/home/HomeScreen";
import { CypherScreen } from "~/features/cypher/CypherScreen";
import { FilesScreen } from "~/features/files/FilesScreen";
import { DatabaseScreen } from "~/features/database/DatabaseScreen";
import { ShareScreen } from "~/features/share/ShareScreen";
import { NavScreen } from "~/features/navigation/NavScreen";
import { StickerSmashScreen } from "~/features/picture-tag/StickerSmashScreen";
import { RegionSelectorScreen } from "~/features/picture-region-selector/RegionSelectorScreen";
import { PictureZoomScreen } from "~/features/picture-zoom/PictureZoomScreen";
import { ManualNotesScreen } from "~/features/manual-notes/ManualNotesScreen";
import { AboutScreen } from "~/features/about/AboutScreen";
import { setupLogBox } from "~/utils/logger";

const Drawer = createDrawerNavigator();
setupLogBox();

const App = () => {
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  return (
    <NavigationContainer theme={appTheme}>
      <PaperProvider theme={appTheme}>
        <SnackbarProvider>
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
              name="RegionSelector"
              component={RegionSelectorScreen}
              initialParams={{}}
              options={{
                title: "Picture region selector",
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
              name="PictureZoomScreen"
              component={PictureZoomScreen}
              initialParams={{}}
              options={{
                title: "Picture zooming",
                drawerIcon: ({ size }) => (
                  <MaterialIcons
                    name="zoom-in"
                    size={size}
                    color={appTheme.colors.secondary}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="ManualNotesScreen"
              component={ManualNotesScreen}
              initialParams={{}}
              options={{
                title: "Hand written notes",
                drawerIcon: ({ size }) => (
                  <MaterialCommunityIcons
                    name="notebook-edit-outline"
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
            <Drawer.Screen
              name="About"
              component={AboutScreen}
              options={{
                title: "About this app…",
                drawerIcon: ({ size }) => (
                  <MaterialCommunityIcons
                    name="book-information-variant"
                    size={size}
                    color={appTheme.colors.secondary}
                  />
                ),
              }}
              initialParams={{}}
            />
          </Drawer.Navigator>
        </SnackbarProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
