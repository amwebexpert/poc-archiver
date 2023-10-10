// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const EXTRA_EXTENTSIONS = ["gltf", "glb", "js_"];

config.resolver.assetExts.push(...EXTRA_EXTENTSIONS);
config.resolver.sourceExts = config.resolver.sourceExts.filter(
  (ext) => !EXTRA_EXTENTSIONS.includes(ext)
);
module.exports = config;
