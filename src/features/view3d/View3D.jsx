import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";
import { SceneWithModel } from "./SceneWithModel";
import { SceneWithR2D2Model } from "./SceneWithR2D2Model";

export const View3D = () => {
  const styles = useStyles();

  return (
    <AppLayout title="3D File Viewer">
      <View style={styles.root}>
        <SceneWithR2D2Model />
      </View>

      <View style={styles.actions}>
        <Button icon="cube-scan" mode="contained" onPress={() => {}}>
          File…
        </Button>
      </View>
    </AppLayout>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
    },
    heading: {
      marginBottom: theme.spacing(2),
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
};
