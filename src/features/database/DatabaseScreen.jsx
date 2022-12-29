import React from "react";
import { useAssets } from "expo-asset";

import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

import * as fileService from "~/services/file-service";
import * as archiveService from "~/services/archive-service";
import { AppAssets } from "~/assets";

export const DatabaseScreen = () => {
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");

  const insertData = () => {
    const filename = "device-data.txt";
    const textFileUri = fileService.getDocumentFullFilename(filename);
    const filesToArchive = [
      textFileUri,
      AppAssets.backgrounds.dark.localUri,
      AppAssets.backgrounds.light.localUri,
    ];

    const archive = archiveService.getUniqueDbFilename();
    const { dbFilename } = archiveService.archiveFiles(archive, filesToArchive);

    setResult(dbFilename);
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
