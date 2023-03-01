import { LogBox } from "react-native";

export const setupLogBox = () => {
  LogBox.ignoreLogs([
    "React does not recognize the ",
    "<RNSVGPath /> is using incorrect casing",
    "<RNSVGSvgView /> is using incorrect casing.",
    "<RNSVGGroup /> is using incorrect casing.",
  ]);
};
