import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";

import { appTheme } from "~/theme";

import { CypherScreen } from "~/features/cypher/CypherScreen";
import { NavScreen } from "~/features/navigation/NavScreen";
import { OAuthScreen } from "~/features/oauth2/OAuthScreen";
import { SettingsScreen } from "~/features/settings/SettingsScreen";
import { ShareScreen } from "~/features/share/ShareScreen";

const Drawer = createDrawerNavigator();

const OtherDemos = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.colors.primary,
      }}
    >
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
        name="OAuth"
        component={OAuthScreen}
        options={{
          title: "AWS Authentication",
          drawerIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="lock"
              size={size}
              color={appTheme.colors.secondary}
            />
          ),
        }}
        initialParams={{}}
      />
    </Drawer.Navigator>
  );
};

export default OtherDemos;
