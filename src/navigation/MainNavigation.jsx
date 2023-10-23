import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AboutScreen } from "~/features/about/AboutScreen";
import { HomeScreen } from "~/navigation/HomeScreen";
import OtherDemos from "~/navigation/others/OtherFeaturesNavigation";
import StorageManagementDemos from "~/navigation/storage-management/StorageManagementNavigation";
import View3D from "~/features/3D/View3D";
import { ManualNotesScreen } from "~/features/manual-notes/ManualNotesScreen";
import { RegionSelectorScreen } from "~/features/picture-region-selector/RegionSelectorScreen";
import { StickerSmashScreen } from "~/features/picture-tag/StickerSmashScreen";
import { PictureZoomScreen } from "~/features/picture-zoom/PictureZoomScreen";
import ImageManipulations from "./ImageManipulations";
import { CypherScreen } from "~/features/cypher/CypherScreen";
import { NavScreen } from "~/features/navigation/NavScreen";
import { OAuthScreen } from "~/features/oauth2/OAuthScreen";
import { SettingsScreen } from "~/features/settings/SettingsScreen";
import { ShareScreen } from "~/features/share/ShareScreen";
import Others from "./Others";
import StorageManagement from "./StorageManagementScreen";
import { DatabaseScreen } from "~/features/database/DatabaseScreen";
import { FilesScreen } from "~/features/files/FilesScreen";

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="ImageManipulation" component={ImageManipulations} />
      <Stack.Screen name="StickerSmash" component={StickerSmashScreen} />
      <Stack.Screen name="RegionSelector" component={RegionSelectorScreen} />
      <Stack.Screen name="PictureZoomScreen" component={PictureZoomScreen} />
      <Stack.Screen name="ManualNotesScreen" component={ManualNotesScreen} />
      <Stack.Screen name="3DView" component={View3D} />

      <Stack.Screen name="StorageManagement" component={StorageManagement} />
      <Stack.Screen name="Database" component={DatabaseScreen} />
      <Stack.Screen name="Files" component={FilesScreen} />

      <Stack.Screen name="OtherDemos" component={Others} />
      <Stack.Screen name="NavScreen" component={NavScreen} />
      <Stack.Screen name="Share" component={ShareScreen} />
      <Stack.Screen name="Cypher" component={CypherScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="OAuth" component={OAuthScreen} />

      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
