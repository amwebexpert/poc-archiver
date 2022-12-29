import React, { useEffect } from "react";
import { useAssets } from "expo-asset";

import { View, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

import * as fileService from "~/services/file-service";
import * as archiveService from "~/services/archive-service";
import { AppAssets } from "~/assets";

export const DatabaseScreen = () => {
  const [assets] = useAssets([
    AppAssets.backgrounds.dark,
    AppAssets.backgrounds.light,
  ]);
  const [text, setText] = React.useState("");
  const [result, setResult] = React.useState("");

  const insertData = () => {
    const filename = "device-data.txt";
    const fileUri = fileService.getDocumentFullFilename(filename);
    const archive = archiveService.getUniqueDbFilename();

    const fileURIs = [fileUri, ...assets.map((a) => a.localUri)];
    const { dbFilename } = archiveService.archiveFiles(archive, fileURIs);
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
