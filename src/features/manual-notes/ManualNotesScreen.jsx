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
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

import { AppLayout } from "~/components/layout/AppLayout";

export const ManualNotesScreen = () => {
  const [paths, setPaths] = useState([]);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  const gesturePath = useSharedValue([]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, _ctx) => {
      gesturePath.value = [`M ${event.x} ${event.y}`];
    },
    onActive: (event, _ctx) => {
      gesturePath.value = [...gesturePath.value, `L ${event.x} ${event.y}`];
    },
    onEnd: (_event, _ctx) => {
      const newPaths = [...paths, gesturePath.value];
      runOnJS(setPaths, newPaths);
    },
  });

  const animatedProps = useAnimatedProps(() => ({
    d: gesturePath.value.join(),
  }));

  return (
    <AppLayout title="Hand written notes">
      <GestureHandlerRootView style={styles.container}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={styles.container}>
              <AnimatedSvg height="100%" width="100%">
                <AnimatedPath
                  animatedProps={animatedProps}
                  fill="none"
                  stroke="red"
                  strokeWidth={3}
                />
              </AnimatedSvg>
            </Animated.View>
          </PanGestureHandler>
      </GestureHandlerRootView>

      <View style={styles.actions}>
        <Button mode="outlined" onPress={() => Alert.alert("Not yet implemented!")} icon="image">
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
  actions: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
