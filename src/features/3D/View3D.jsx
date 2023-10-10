import React, { useEffect, useRef, useState } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { Button, useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

import { useHtmlViewerAssets } from "./useHtmlViewerAssets";
import { htmlDocumentMessage, logHtmlDocumentEvent } from "./webview-utils";

const View3D = () => {
  const styles = useStyles();
  const webViewRef = useRef(null);
  const [isHtmlDocumentReady, setIsHtmlDocumentReady] = useState(false);
  const { isLoading, html, injectedJavaScript } = useHtmlViewerAssets();

  const onMessage = (payload = {}) => {
    setIsHtmlDocumentReady(true);
    const payloadData = payload?.nativeEvent?.data;

    try {
      const { type, data } = JSON.parse(payloadData);
      if (type === "console") {
        logHtmlDocumentEvent(data);
      } else if (type === "capture") {
        onSnapshotUpdate(data);
      } else {
        logger.log(`[webview]: onMessage: ${type}: ${data}`);
      }
    } catch (e) {
      console.error("Error parsing JSON onMessage", e, payloadData);
    }
  };

  useEffect(() => {
    if (isHtmlDocumentReady) {
      // update camera position
      const cameraPosition = { x: 0, y: 0, z: 100 };
      const jsCode = htmlDocumentMessage({
        type: "cameraPosition",
        data: cameraPosition,
      });
      webViewRef.current?.injectJavaScript(jsCode);
    }
  }, [isHtmlDocumentReady]);

  const onSnapshotUpdate = async ({
    dataUriScheme = "",
    cameraPosition = {},
  }) => {
    const base64 = dataUriScheme.split("data:image/png;base64,")[1];
    console.log("base64", { cameraPosition, base64 });
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <AppLayout title="3D File Viewer">
      <View style={styles.root}>
        <View style={styles.container}>
          <WebView
            ref={webViewRef}
            style={styles.container}
            originWhitelist={["*"]}
            source={{ html }}
            onMessage={onMessage}
            injectedJavaScript={injectedJavaScript}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <Button icon="cube-scan" mode="contained" onPress={() => {}}>
          File…
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
      alignItems: "center",
    },
    container: {
      flex: 1,
      width: "100%",
      borderColor: "red",
      borderWidth: 1,
    },
    actions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
  });
};
export default View3D;
