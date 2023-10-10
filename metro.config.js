// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("mtl", "obj", "gltf", "glb");
config.resolver.sourceExts = config.resolver.sourceExts.filter(
  (ext) => !["mtl", "obj", "gltf", "glb"].includes(ext)
);
module.exports = config;
