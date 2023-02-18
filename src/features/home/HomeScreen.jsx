import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme, Paragraph } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

export const HomeScreen = () => {
  const styles = useStyles();

  return (
    <AppLayout title="Home screen">
      <View style={styles.root}>
        <Text variant="headlineMedium" style={styles.heading}>
          Expo demos
        </Text>

        <Paragraph>
          Enjoy this "Expo" proof of concepts collection for React Native app
          development, including: picture region selector, encryption, sqlite,
          file system, material design user interface, sharing, and more.
        </Paragraph>

        <Paragraph>
          Stay tuned because this is also an evolutive app used as a sandbox to
          learn by implementing real solutions to real problems.
        </Paragraph>

        <Paragraph>Like it? Do not forget to star the repo!</Paragraph>
      </View>
    </AppLayout>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    root: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: theme.spacing(2),
    },
    heading: {
      marginVertical: theme.spacing(2),
    },
  });
};
