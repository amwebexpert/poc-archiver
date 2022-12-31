import React from "react";

import { View, StyleSheet, FlatList } from "react-native";
import { Button, Snackbar, TextInput, useTheme } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";
import { spacing } from "~/theme";
import * as service from "./service";
import { FileInfo } from "./FileInfo";

export const DatabaseScreen = () => {
  const styles = useStyles();
  const [archivePassphrase, setArchivePassphrase] =
    React.useState("my-passphrase");
  const [archiveName, setArchiveName] = React.useState("");
  const [files, setFiles] = React.useState([]);
  const [snackbarText, setSnackbarText] = React.useState("");

  const archiveDemo = async () => {
    const name = await service.archiveDataDemo({ archivePassphrase });
    setArchiveName(name);
    setFiles([]);
  };

  const unarchiveDemo = async () => {
    const archiveFiles = await service.unarchiveDataDemo({
      archiveName,
      archivePassphrase,
    });
    setFiles(archiveFiles);
  };

  return (
    <AppLayout title="Database screen">
      <TextInput
        label="Archive passphrase"
        mode="outlined"
        value={archivePassphrase}
        onChangeText={setArchivePassphrase}
      />
      <TextInput
        label="Archive name"
        mode="outlined"
        value={archiveName}
        onChangeText={setArchiveName}
      />
      <View style={styles.root}>
        <FlatList
          data={files}
          renderItem={({ item }) => <FileInfo item={item} />}
        />
      </View>

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={archiveDemo}
          disabled={!archivePassphrase}
        >
          Archive
        </Button>

        <Button
          mode="contained"
          onPress={unarchiveDemo}
          disabled={!archiveName}
        >
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

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      borderColor: theme.colors.primary,
      borderRadius: theme.roundness,
      borderWidth: 2,
      marginVertical: spacing(2),
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
};
