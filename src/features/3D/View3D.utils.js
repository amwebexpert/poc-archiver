import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { nowToISOLikeButLocalForFilename } from "~/utils/date.utils";

export const exportToPNG = async ({
    dataUriScheme = "",
    cameraPosition = {},
  }) => {
    const base64 = dataUriScheme.split("data:image/png;base64,")[1];
    console.log("camera position", { cameraPosition });
    const timestamp = nowToISOLikeButLocalForFilename();
    const filename = `3D-Capture-${timestamp}.png`;
    const fullFilename = `${FileSystem.documentDirectory}${filename}`;
  
    try {
      await FileSystem.writeAsStringAsync(fullFilename, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      await MediaLibrary.saveToLibraryAsync(fullFilename);
      return {
        isSuccess: true,
        filename,
      };
    } catch (e) {
      return {
        isSuccess: false,
        error: e.message,
      };
    }
  };
  