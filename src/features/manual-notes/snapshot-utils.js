import { PixelRatio } from "react-native";

export const PIXEL_RATIO = PixelRatio.get();

export const DEFAULT_IMAGE_OPTIONS = {
  format: "jpg",
  quality: 1,
  width: 900 / PIXEL_RATIO,
  height: 1600 / PIXEL_RATIO,
};

