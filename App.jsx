import { NavigationContainer } from "@react-navigation/native";
import * as Device from "expo-device";
import { Provider as PaperProvider } from "react-native-paper";

import { SnackbarProvider } from "~/components/snack-bar/SnackbarProvider";
import MainNavigation from "~/navigation/MainNavigation";
import { appTheme } from "~/theme";

import { setupLogBox } from "~/utils/logger";

setupLogBox();

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
