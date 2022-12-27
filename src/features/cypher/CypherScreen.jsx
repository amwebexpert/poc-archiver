import * as React from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

export const CypherScreen = () => {
  const [text, setText] = React.useState("Here the text to encrypt");

  const encryptData = () => {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }

  return (
    <AppLayout title="Cypher screen">
      <View style={styles.root}>
        <TextInput
          label="Text to encrypt"
          placeholder="Type some text here"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>

      <Button
          mode="contained"
          onPress={encryptData}
        >
          Encrypt
        </Button>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
