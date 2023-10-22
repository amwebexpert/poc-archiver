import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Device from "expo-device";
import { Provider as PaperProvider } from "react-native-paper";

import { SnackbarProvider } from "~/components/snack-bar/SnackbarProvider";
import { appTheme } from "~/theme";

import { AboutScreen } from "~/features/about/AboutScreen";
import { HomeScreen } from "~/features/home/HomeScreen";
import { setupLogBox } from "~/utils/logger";
import ImageManipulationDemos from "~/navigation/ImageManipulationsDemos";
import OtherDemos from "~/navigation/OtherDemos";
import StorageManagementDemos from "~/navigation/StorageManagementDemos";

const Stack = createNativeStackNavigator();

setupLogBox();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="ImageManipulation"
        component={ImageManipulationDemos}
      />
      <Stack.Screen
        name="StorageManagement"
        component={StorageManagementDemos}
      />
      <Stack.Screen name="OtherDemos" component={OtherDemos} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  console.info(
    `Starting App on ${Device.brand} ${Device.modelName} (${Device.osName} ${Device.osVersion})`
  );

  return (
    <NavigationContainer theme={appTheme}>
      <PaperProvider theme={appTheme}>
        <SnackbarProvider>
          <MainNavigation />
        </SnackbarProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
