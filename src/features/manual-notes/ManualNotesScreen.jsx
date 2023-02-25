import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
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

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export const ManualNotesScreen = () => {
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

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, _ctx) => {
      gesturePoints.value = [`M ${event.x},${event.y}`];
    },
    onActive: (event, _ctx) => {
      gesturePoints.value = [...gesturePoints.value, `L ${event.x},${event.y}`];
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
