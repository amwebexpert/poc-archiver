import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

export const downloadFile = async ({ url = "", albumName = "" }) => {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  const fullpathname = `${FileSystem.documentDirectory}${filename}`;

  try {
    const { uri } = await FileSystem.downloadAsync(url, fullpathname);
    console.info("MediaLibrary.createAssetAsync", uri);
    const asset = await MediaLibrary.createAssetAsync(uri);
    return MediaLibrary.createAlbumAsync(albumName, asset);
  } catch (error) {
    console.error(error);
    return null;
  }
};
