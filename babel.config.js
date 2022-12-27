module.exports = function (api) {
  api.cache(true);

  const presets = ["babel-preset-expo"];
  const plugins = [
    [
      "babel-plugin-root-import",
      {
        rootPathPrefix: "~",
        rootPathSuffix: "src",
      },
    ],
  ];

  return {
    presets,
    plugins,
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
