import * as React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';

export const AppLayout = ({ title, children }) => {
  const styles = useStyles();
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ title });
  }, []);

  return (
    <SafeAreaView style={styles.root} edges={["bottom", "left", "right"]}>
      <View style={styles.content}>{children}</View>
      <StatusBar style="inverted" />
    </SafeAreaView>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
    },
    content: {
      flex: 1,
      margin: theme.spacing(1),
    },
  });
};
