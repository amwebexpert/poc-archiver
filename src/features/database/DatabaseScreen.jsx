import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

import * as service from "./service";
import { FileInfo } from "./FileInfo";

export const DatabaseScreen = () => {
  const styles = useStyles();
  const [passphrase, setPassphrase] = React.useState("my-passphrase");
  const [archiveName, setArchiveName] = React.useState("");
  const [files, setFiles] = React.useState([]);

  const archiveDemo = async () => {
    const name = await service.archiveDataDemo({ passphrase });
    setArchiveName(name);
    setFiles([]);
  };

  const unarchiveDemo = async () => {
    const archiveFiles = await service.unarchiveDataDemo({
      archiveName,
      passphrase,
    });
    setFiles(archiveFiles);
  };

  return (
    <AppLayout title="Database screen">
      <TextInput
        label="Archive passphrase"
        mode="outlined"
        value={passphrase}
        onChangeText={setPassphrase}
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
        <Button mode="contained" onPress={archiveDemo} disabled={!passphrase}>
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
      marginVertical: theme.spacing(2),
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
};
