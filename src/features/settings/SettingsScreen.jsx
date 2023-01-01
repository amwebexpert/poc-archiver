import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppLayout } from "../../components/layout/AppLayout";

export const SettingsScreen = () => {
  const { params } = useRoute();
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <AppLayout title="Settings screen">
      <View style={styles.root}>
        <View style={styles.params}>
          <Text>{JSON.stringify(params, null, 4)}</Text>
        </View>

        <Button mode="outlined" onPress={() => navigation.goBack()}>
          Go Home
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
      justifyContent: "center",
    },
    params: {
      flex: 1,
      width: "100%",
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
  });
};
