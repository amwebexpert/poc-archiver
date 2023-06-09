import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { Button, TextInput } from "react-native-paper";
import { AppLayout } from "~/components/layout/AppLayout";

import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

export const OAuthScreen = () => {
  const [user, setUser] = useState({});
  const [customState, setCustomState] = useState(null);
  const url = Linking.useURL();

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);

    console.log(
      `Linked to app with hostname: ${hostname}, path: ${path} and data`,
      {queryParams,
      url}
    );
  }

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          setUser(data);
          break;
        case "signOut":
          setUser(null);
          break;
      }
    });

    Auth.currentAuthenticatedUser()
      .then((currentUser) => setUser(currentUser ?? {}))
      .catch(() => console.error("Not signed in"));

    return unsubscribe;
  }, []);

  const onRefreshToken = () => {
    setCustomState("Refresh token");
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
          value={JSON.stringify(user, null, 2)}
        />
      </View>

      <View style={styles.actions}>
        <Button mode="contained" onPress={() => Auth.federatedSignIn()}>
          Open Hosted UI
        </Button>
        <Button mode="contained" onPress={() => Auth.signOut()}>
          Sign Out
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
