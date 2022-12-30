import React from "react";

import { View, StyleSheet } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";
import * as service from "./service";

export const DatabaseScreen = () => {
  const [archiveName, setArchiveName] = React.useState("");
  const [result, setResult] = React.useState("");
  const [snackbarText, setSnackbarText] = React.useState("");

  const archiveDemo = async () => {
    const name = await service.archiveDataDemo();
    setArchiveName(name);
  };

  const unarchiveDemo = async () => {
    const result = await service.unarchiveDataDemo(archiveName);
    setResult(JSON.stringify(result));
  };

  return (
    <AppLayout title="Database screen">
      <View style={styles.root}>
        <TextInput
          label="Archive name"
          mode="outlined"
          value={archiveName}
          onChangeText={setArchiveName}
        />
        <TextInput
          label="Result"
          multiline={true}
          numberOfLines={10}
          mode="outlined"
          value={result}
        />
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={archiveDemo}>
          Archive
        </Button>

        <Button mode="contained" onPress={unarchiveDemo}>
          Unarchive
        </Button>
      </View>

      <Snackbar
        duration={3000}
        visible={!!snackbarText}
        onDismiss={() => setSnackbarText("")}
      >
        {snackbarText}
      </Snackbar>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
