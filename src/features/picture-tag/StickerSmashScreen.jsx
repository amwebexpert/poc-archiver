import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { AppLayout } from "~/components/layout/AppLayout";

export const StickerSmashScreen = () => {
  const navigation = useNavigation();

  return (
    <AppLayout title="StickerSmash screen">
      <View style={styles.root}>
        <Text>StickerSmashScreen</Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
