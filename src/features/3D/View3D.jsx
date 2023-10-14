import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

import { useHtmlViewerAssets } from "./useHtmlViewerAssets";
import { htmlDocumentMessage, logHtmlDocumentEvent } from "./webview-utils";
import { nowToISOLikeButLocalForFilename } from "~/utils/date.utils";

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
    // TODO put this into a generic pure js service
    const base64 = dataUriScheme.split("data:image/png;base64,")[1];
    console.log("camera position", { cameraPosition });
    const filename = FileSystem.documentDirectory + `3D-Capture-${nowToISOLikeButLocalForFilename()}.png`;
    await FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
    console.log("mediaResult", mediaResult);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <AppLayout title="3D File Viewer">
      <WebView
        ref={webViewRef}
        style={styles.webview}
        originWhitelist={["*"]}
        source={{ html }}
        onMessage={onMessage}
        injectedJavaScript={injectedJavaScript}
      />
    </AppLayout>
  );
};

const useStyles = () => {
  const theme = useTheme();

  return StyleSheet.create({
    webview: {
      flex: 1,
      width: "100%",
    },
  });
};
export default View3D;
