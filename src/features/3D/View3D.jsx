import React, { useEffect, useRef, useState } from "react";

import { ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useTheme, ProgressBar } from "react-native-paper";

import { AppLayout } from "~/components/layout/AppLayout";

import { useHtmlViewerAssets } from "./useHtmlViewerAssets";
import { htmlDocumentMessage, logHtmlDocumentEvent } from "./webview.utils";
import { useSnackbar } from "~/components/snack-bar/useSnackbar";
import { exportToPNG, loadGLTFModel } from "./View3D.utils";
import { useLoading } from "./useLoading";

const View3D = () => {
  const styles = useStyles();

  const webViewRef = useRef(null);
  const [isHtmlDocumentReady, setIsHtmlDocumentReady] = useState(false);
  const { isLoading, html, injectedJavaScript } = useHtmlViewerAssets();
  const showSnackbarMessage = useSnackbar();
  const { isProgressVisible, progress, onLoadingModelUpdate } = useLoading();

  const onMessage = (payload = {}) => {
    setIsHtmlDocumentReady(true);
    const payloadData = payload?.nativeEvent?.data;

    try {
      const { type, data } = JSON.parse(payloadData);
      if (type === "console") {
        logHtmlDocumentEvent(data);
      } else if (type === "loadingModel") {
        onLoadingModelUpdate(data);
      } else if (type === "capture") {
        onSnapshotUpdate(data);
      } else {
        console.log(`[webview]: onMessage: ${type}: ${data}`);
      }
    } catch (e) {
      console.error("Error parsing JSON onMessage", e, payloadData);
    }
  };

  useEffect(() => {
    loadGLTFModel().then((data) => {
      if (!data) {
        return;
      }

      const jsCode = htmlDocumentMessage({ type: "parseGLTFModel", data });
      webViewRef.current?.injectJavaScript(jsCode);
    });
  }, []);

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
    const { isSuccess, filename, error } = await exportToPNG({
      dataUriScheme,
      cameraPosition,
    });

    if (isSuccess) {
      showSnackbarMessage(`Saved into media library: ${filename}`);
    } else {
      showSnackbarMessage(error);
    }
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

      <ProgressBar visible={isProgressVisible} progress={progress} />
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
