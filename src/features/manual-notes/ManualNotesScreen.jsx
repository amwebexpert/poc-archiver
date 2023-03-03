import { StyleSheet, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

import { AppLayout } from "~/components/layout/AppLayout";
import * as svgUtils from "./svg-utils";
import { useElements } from "./hooks/useElements";
import { DEFAULT_NOTES_URI } from "./constants";
import { usePenStyle } from "./hooks/usePenStyle";
import { SvgViewer } from "./SvgViewer";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const ManualNotesScreen = () => {
  const { elements, setElements, hasElements, addElement, removeLastElement, clearElements } = useElements();
  const { penStyle } = usePenStyle();
  const gesturePoints = useSharedValue([]);

  const addPath = (d = "") => {
    const { strokeColor, strokeWidth } = penStyle;
    return addElement({ type: "path", d, strokeColor, strokeWidth, id: Date.now() });
  };

  const clearCanvas = () => {
    clearElements();
    gesturePoints.value = [];
  };

  const undo = () => {
    removeLastElement();
    gesturePoints.value = [];
  };

  const importSvg = async () => {
    const importedElements = await svgUtils.importSvg();
    if (importedElements?.length > 0) {
      setElements(importedElements);
      gesturePoints.value = [];
    }
  };
  const exportAsSvg = () => svgUtils.exportAsSvg({ elements, fileUri: DEFAULT_NOTES_URI });

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
                stroke={penStyle.strokeColor}
                strokeWidth={penStyle.strokeWidth}
              />
            </AnimatedSvg>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>

      <SvgViewer elements={elements} style={styles.svgElements} />

      <View style={styles.actions}>
        <IconButton
          mode="outlined"
          onPress={clearCanvas}
          icon="delete"
          disabled={!hasElements}
          style={styles.iconButton}
        />
        <IconButton mode="outlined" onPress={undo} icon="undo" disabled={!hasElements} style={styles.iconButton} />

        <Button mode="outlined" onPress={importSvg} icon="file-import">
          Import
        </Button>
        <Button mode="outlined" onPress={exportAsSvg} icon="file-export" disabled={!hasElements}>
          Export
        </Button>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svgElements: {
    position: "absolute",
    zIndex: -1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    margin: 0,
  },
});
