import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import { MimeTypes } from "./mimetype-utils";

const DEFAULT_ENCODING = FileSystem.EncodingType.UTF8;
const DEFAULT_OPTIONS = { encoding: DEFAULT_ENCODING };
const DEFAULT_FILE_PICKER_OPTIONS = { type: "*/*", copyToCacheDirectory: true };

export const isFileExists = async (fileUri = "") => {
  const { exists } = await FileSystem.getInfoAsync(fileUri);
  return exists;
};

export const getFilenameOnly = (fileUri = "/") => fileUri.split("/").pop();

export const getFileExtensionOnly = (fileUri = "/") => fileUri.split(".").pop().toLowerCase();

export const getDirectoryOnly = (fileUri = "/") => fileUri.substring(0, fileUri.lastIndexOf("/"));

export const getDocumentFolderRelativePath = (fileUri = "/") => fileUri.substring(FileSystem.documentDirectory.length);

export const getDocumentFullFilename = (filename) => FileSystem.documentDirectory + filename;

export const createDirectoryStructure = async (folderUri) => {
  const exists = await isFileExists(folderUri);

  if (exists) {
    return { exists: true };
  }

  try {
    await FileSystem.makeDirectoryAsync(folderUri, { intermediates: true });
    return { exists: true };
  } catch (error) {
    return {
      exists: false,
      error,
    };
  }
};

export const saveTextContent = async ({ fileUri = "", text = "" }) => {
  const exists = await isFileExists(fileUri);

  try {
    await FileSystem.writeAsStringAsync(fileUri, text, DEFAULT_OPTIONS);
    return { exists };
  } catch (error) {
    return {
      exists,
      error,
    };
  }
};

export const loadTextContent = async (fileUri = "") => {
  const exists = await isFileExists(fileUri);

  if (!exists) {
    return { exists };
  }

  try {
    const content = await FileSystem.readAsStringAsync(fileUri, DEFAULT_OPTIONS);

    return {
      exists,
      content,
    };
  } catch (error) {
    return { exists, error };
  }
};

export const deleteFile = async (fileUri) => {
  const exists = await isFileExists(fileUri);

  if (!exists) {
    return { exists };
  }

  try {
    await FileSystem.deleteAsync(fileUri);
    return { exists };
  } catch (error) {
    return { exists, error };
  }
};

export const nowAsIsoFilename = () => {
  const isoString = new Date().toISOString();

  // '2022-12-28T20:21:40.862Z' ==> '2022-12-28T20_21_40.862Z'
  return isoString.replace(new RegExp(":", "g"), "_");
};

export const shareFile = async (fileUri = "") => {
  const filename = getFilenameOnly(fileUri);
  const extension = getFileExtensionOnly(fileUri);
  const mimeType = MimeTypes.get(extension);

  const canOpen = await Sharing.isAvailableAsync();
  if (!canOpen) {
    return {
      error: {
        message: `File can't be opened:\n ➡ ${filename}`,
      },
    };
  }

  try {
    await Sharing.shareAsync(fileUri, {
      dialogTitle: filename,
      UTI: mimeType,
      mimeType,
    });
  } catch (error) {
    return { error };
  }

  return {};
};

export const pickSingleFile = async (options = DEFAULT_FILE_PICKER_OPTIONS) => {
  try {
    const result = await DocumentPicker.getDocumentAsync(options);
    if (result.canceled) {
      return { exists: false, error: "canceled" };
    }

    const { uri, name, size, lastModified, mimeType } = result.assets[0];
    return {
      exists: true,
      uri,
      name,
      size,
      lastModified,
      mimeType,
    };
  } catch (error) {
    return { error, exists: false };
  }
};
