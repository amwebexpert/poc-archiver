import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import { AppLayout } from "~/components/layout/AppLayout";
import { LONG_TEXT } from "./data";

export const FilesScreen = () => {
  const fileUri = FileSystem.documentDirectory + "device-data.txt";
  const [text, setText] = React.useState(LONG_TEXT);
  const [snackbarText, setSnackbarText] = React.useState("");

  const saveData = async () => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    await FileSystem.writeAsStringAsync(fileUri, text, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    if (fileInfo.exists) {
      setSnackbarText(`File replaced:\n ${fileUri}`);
    }
  };

  const loadData = async () => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const deviceTextFileContent = await FileSystem.readAsStringAsync(
        fileUri,
        { encoding: FileSystem.EncodingType.UTF8 }
      );
      setText(deviceTextFileContent);
    } else {
      setSnackbarText(`File not found:\n ${fileUri}`);
    }
  };

  const clearData = () => {
    setText("");
  };

  const deleteFile = async () => {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      await FileSystem.deleteAsync(fileUri);
      setSnackbarText(`File deleted`);
    } else {
      setSnackbarText(`File not found:\n ${fileUri}`);
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

      <Snackbar visible={!!snackbarText} onDismiss={() => setSnackbarText("")}>
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
