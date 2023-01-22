import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import * as FileSystem from "expo-file-system";

import { AppLayout } from "~/components/layout/AppLayout";
import { SnackbarContext } from "~/components/snack-bar/SnackbarContext";

import { LONG_TEXT } from "./data";
import * as fileService from "~/services/file-service";

export const FilesScreen = () => {
  const filename = "device-data.txt";
  const fileUri = FileSystem.documentDirectory + filename;
  const [text, setText] = React.useState(LONG_TEXT);
  const showSnackbarMessage = useContext(SnackbarContext);

  const saveData = async () => {
    const { exists, error } = await fileService.saveTextContent({
      fileUri,
      text,
    });

    if (error) {
      showSnackbarMessage(`Error while storing data:\n ➡ ${error.message}`);
      return;
    }

    if (exists) {
      showSnackbarMessage(`File replaced:\n ➡ ${filename}`);
    } else {
      showSnackbarMessage(`File created:\n ➡ ${filename}`);
    }
  };

  const loadData = async () => {
    const { exists, content, error } = await fileService.loadTextContent(
      fileUri
    );

    if (!exists) {
      showSnackbarMessage(`File not found:\n ➡ ${filename}`);
      return;
    }

    if (error) {
      showSnackbarMessage(`Error while loading:\n ➡ ${error.message}`);
    } else {
      setText(content);
    }
  };

  const clearData = () => {
    setText("");
  };

  const deleteFile = async () => {
    const { exists, error } = await fileService.deleteFile(fileUri);

    if (!exists) {
      showSnackbarMessage(`File not found:\n ➡ ${filename}`);
      return;
    }

    if (error) {
      showSnackbarMessage(`Error while deleting:\n ➡ ${error.message}`);
    } else {
      showSnackbarMessage(`File deleted:\n ➡ ${filename}`);
    }
  };

  return (
    <AppLayout title="Files screen">
      <View style={styles.root}>
        <TextInput
          label="Data"
          multiline={true}
          numberOfLines={15}
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={saveData}>
          Save
        </Button>

        <Button mode="contained" onPress={loadData}>
          Load
        </Button>

        <Button mode="contained" onPress={clearData}>
          Clear
        </Button>

        <Button mode="contained" onPress={deleteFile}>
          Delete file
        </Button>
      </View>
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
