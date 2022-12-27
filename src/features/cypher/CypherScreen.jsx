import * as React from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";
import CryptoES from "crypto-es";

export const CypherScreen = () => {
  const [text, setText] = React.useState("Data: ➡ Here the original data in clear text.");
  const [result, setResult] = React.useState("");

  const encryptData = () => {
    const result = CryptoES.AES.encrypt(text, "my-passphrase");
    setResult(result.toString());
  };

  const decryptData = () => {
    const result = CryptoES.AES.decrypt(text, "my-passphrase");
    setResult(result.toString(CryptoES.enc.Utf8));
  };

  const switchResult = () => {
    setText(result);
    setResult("");
  };

  return (
    <AppLayout title="Cypher screen">
      <View style={styles.root}>
        <TextInput
          label="Data"
          multiline={true}
          numberOfLines={5}
          placeholder="Type some text here"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TextInput
          label="Result"
          multiline={true}
          numberOfLines={5}
          placeholder="Result will be displayed here"
          mode="outlined"
          value={result}
        />
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={encryptData}>
          Encrypt
        </Button>

        <Button mode="contained" onPress={decryptData}>
          Decrypt
        </Button>

        <Button mode="contained" onPress={switchResult}>
          Switch result
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
