import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useSharedValue } from "react-native-reanimated";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

import { AppLayout } from "~/components/layout/AppLayout";
import { useSnackbar } from "~/components/snack-bar/useSnackbar";
import * as svgUtils from "./svg-utils";
import { useElements } from "./hooks/useElements";
import { DEFAULT_NOTES_URI } from "./constants";
import { usePenStyle } from "./hooks/usePenStyle";
import SvgViewer from "./SvgViewer";
import { PathGestureDrawer } from "./PathGestureDrawer";
import { DEFAULT_IMAGE_OPTIONS } from "./snapshot-utils";

export const ManualNotesScreen = () => {
  const imageRef = useRef();
  const showSnackbarMessage = useSnackbar();

  const { elements, setElements, hasElements, addElement, removeLastElement, clearElements } = useElements();
  const { penStyle } = usePenStyle();
  const gesturePoints = useSharedValue([]);

  const clearGesturePoints = () => (gesturePoints.value = []);

  const addPath = (d = "") => {
    const { strokeColor, strokeWidth } = penStyle;
    return addElement({ type: "path", d, strokeColor, strokeWidth, id: Date.now() });
  };

  const clearCanvas = () => {
    clearElements();
    clearGesturePoints();
  };

  const undo = () => {
    removeLastElement();
    clearGesturePoints();
  };

  const importSvg = async () => {
    const importedElements = await svgUtils.importSvg();
    if (importedElements?.length > 0) {
      setElements(importedElements);
      clearGesturePoints();
    }
  };
  const exportAsSvg = () => svgUtils.exportAsSvg({ elements, fileUri: DEFAULT_NOTES_URI });

  const saveAsBitmap = async () => {
    try {
      const localUri = await captureRef(imageRef, DEFAULT_IMAGE_OPTIONS);
      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        showSnackbarMessage("Saved into media library!");
      }
    } catch (e) {
      showSnackbarMessage(e.message);
    }
  };

  return (
    <AppLayout title="Hand written notes">
      <PathGestureDrawer
        gesturePoints={gesturePoints}
        strokeColor={penStyle.strokeColor}
        strokeWidth={penStyle.strokeWidth}
        addPath={addPath}
      />

      <SvgViewer elements={elements} style={styles.svgElements} ref={imageRef} collapsable={false} />

      <View style={styles.actions}>
        <IconButton
          mode="outlined"
          onPress={clearCanvas}
          icon="delete"
          disabled={!hasElements}
          style={styles.iconButton}
        />
        <IconButton mode="outlined" onPress={undo} icon="undo" disabled={!hasElements} style={styles.iconButton} />
        <IconButton
          mode="outlined"
          onPress={saveAsBitmap}
          icon="camera"
          disabled={!hasElements}
          style={styles.iconButton}
        />

        <Button mode="outlined" onPress={importSvg} icon="file-import">
          Import
        </Button>
        <Button mode="outlined" onPress={exportAsSvg} icon="file-export" disabled={!hasElements}>
          Export
        </Button>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svgElements: {
    position: "absolute",
    zIndex: -1,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    margin: 0,
  },
});
