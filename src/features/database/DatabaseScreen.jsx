import React from "react";

import { View, StyleSheet } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";
import * as service from "./service";
import * as openerService from "./opener-service";

export const DatabaseScreen = () => {
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");
  const [snackbarText, setSnackbarText] = React.useState("");

  const insertData = async () => {
    const archive = await service.archiveDataDemo();
    setResult(archive);
  };

  const openHtmlFile = async () => {
    const { error } = await openerService.openHtmlFileDemo();
    if (error) {
      setSnackbarText(error.message);
    }
  };

  const openTextFile = async () => {
    const { error } = await openerService.openTextFileDemo();
    if (error) {
      setSnackbarText(error.message);
    }
  };

  return (
    <AppLayout title="Database screen">
      <View style={styles.root}>
        <TextInput
          label="Data"
          multiline={true}
          numberOfLines={1}
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          label="Result"
          multiline={true}
          numberOfLines={5}
          mode="outlined"
          value={result}
        />
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={insertData}>
          Insert
        </Button>

        <Button mode="contained" onPress={openTextFile}>
          Open text
        </Button>

        <Button mode="contained" onPress={openHtmlFile}>
          Open html
        </Button>
      </View>

      <Snackbar duration={3000} visible={!!snackbarText} onDismiss={() => setSnackbarText("")}>
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
