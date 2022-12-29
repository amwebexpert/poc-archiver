import { Asset } from "expo-asset";

export const AppAssets = {
  backgrounds: {
    dark: Asset.fromModule(require("../assets/images/backgrounds/background-dark.jpg")),
    light: Asset.fromModule(require("../assets/images/backgrounds/background-light.jpg")),
  },
};
