import { createDrawerNavigator } from "@react-navigation/drawer";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "react-native-paper";

import { appTheme } from "~/theme";

import View3D from "~/features/3D/View3D";
import { ManualNotesScreen } from "~/features/manual-notes/ManualNotesScreen";
import { RegionSelectorScreen } from "~/features/picture-region-selector/RegionSelectorScreen";
import { StickerSmashScreen } from "~/features/picture-tag/StickerSmashScreen";
import { PictureZoomScreen } from "~/features/picture-zoom/PictureZoomScreen";

const Drawer = createDrawerNavigator();

const ImageManipulationDemos = () => {
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.colors.primary,
      }}
    >
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
        name="3DView"
        component={View3D}
        options={{
          title: "3D File Viewer",
          drawerIcon: ({ size }) => (
            <MaterialCommunityIcons
              name="cube-scan"
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

export default ImageManipulationDemos;
