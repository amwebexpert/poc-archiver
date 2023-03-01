import { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Button } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import { AppLayout } from "~/components/layout/AppLayout";
import { useSnackbar } from "~/components/snack-bar/useSnackbar";
import * as fileService from "~/services/file-service";
import { SvgExporter } from "./exporter/SvgExporter";
import { exportElementAsSVG } from "./exporter/svg-exporter-utils";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const ManualNotesScreen = () => {
  const showSnackbarMessage = useSnackbar();
  const [paths, setPaths] = useState([]);
  const hasPaths = paths.length > 0;

  const gesturePoints = useSharedValue([]);

  const addPath = (path = "") => setPaths((paths) => [...paths, path]);

  const clearAllPaths = () => {
    setPaths([]);
    gesturePoints.value = [];
  };

  const undo = () => {
    setPaths((paths) => [...paths.slice(0, paths.length - 1)]);
    gesturePoints.value = [];
  };

  const exportAsSvg = async () => {
    const filename = "manual-notes.xml";
    const fileUri = `${FileSystem.documentDirectory}/${filename}`;
    const xml = exportElementAsSVG(<SvgExporter paths={paths} />);

    const { exists, error } = await fileService.saveTextContent({
      fileUri,
      text: xml,
    });

    if (error) {
      showSnackbarMessage(`Error while storing SVG:\n ➡ ${error.message}`);
      return;
    }

    fileService.shareFile(fileUri);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: ({ x, y }, _ctx) => {
      gesturePoints.value = [`M ${x},${y}`];
    },
    onActive: ({ x, y }, _ctx) => {
      gesturePoints.value = [...gesturePoints.value, `L ${x},${y}`];
    },
    onEnd: (_event, _ctx) => runOnJS(addPath)(gesturePoints.value.join(" ")),
  });

  const animatedProps = useAnimatedProps(() => ({
    d: gesturePoints.value.join(),
  }));

  return (
    <AppLayout title="Hand written notes">
      <GestureHandlerRootView style={styles.container}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={styles.container}>
            <AnimatedSvg height="100%" width="100%">
              <AnimatedPath
                animatedProps={animatedProps}
                stroke="red"
                strokeWidth={3}
              />
            </AnimatedSvg>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>

      <Svg height="100%" width="100%" style={styles.fixedPaths}>
        {paths.map((d, i) => {
          return <Path d={d} key={i} stroke="red" strokeWidth={3} />;
        })}
      </Svg>

      <View style={styles.actions}>
        <Button
          mode="outlined"
          onPress={clearAllPaths}
          icon="delete"
          disabled={!hasPaths}
        >
          Clear
        </Button>

        <Button mode="outlined" onPress={undo} icon="undo" disabled={!hasPaths}>
          Undo
        </Button>

        <Button
          mode="outlined"
          onPress={exportAsSvg}
          icon="file-export"
          disabled={!hasPaths}
        >
          Export
        </Button>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  fixedPaths: {
    position: "absolute",
    flex: 1,
    backgroundColor: "transparent",
    zIndex: -1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
