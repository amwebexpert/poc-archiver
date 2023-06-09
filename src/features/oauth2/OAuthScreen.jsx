import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

export const OAuthScreen = () => {
  const [result, setResult] = React.useState("");

  const onLogin = () => {
    setResult("Login");
  };

  const onLogout = () => {
    setResult("Logout");
  };

  const onRefreshToken = () => {
    setResult("Refresh token");
  };

  return (
    <AppLayout title="OAuth 2 screen">
      <View style={styles.root}>
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
        <Button mode="contained" onPress={onLogin}>
          Login
        </Button>

        <Button mode="contained" onPress={onLogout}>
          Logout
        </Button>

        <Button mode="contained" onPress={onRefreshToken}>
          Refresh token
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
