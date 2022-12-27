import * as React from "react";
import { View } from "react-native";
import { NavBar } from "~/components/navbar/NavBar";

export const CypherScreen = () => {
  const [text, setText] = React.useState("");

  return (
    <>
      <NavBar title="Cypher screen"></NavBar>
      <View style={styles.root}>
        <TextInput
          label="Email"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
