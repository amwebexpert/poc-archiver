import { createDrawerNavigator } from "@react-navigation/drawer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";

import { appTheme } from "~/theme";

import { DatabaseScreen } from "~/features/database/DatabaseScreen";
import { FilesScreen } from "~/features/files/FilesScreen";

const Drawer = createDrawerNavigator();

const StorageManagementDemos = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.colors.primary,
      }}
    >
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
    </Drawer.Navigator>
  );
};

export default StorageManagementDemos;
