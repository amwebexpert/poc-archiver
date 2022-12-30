import * as FileSystem from "expo-file-system";

const DEFAULT_ENCODING = FileSystem.EncodingType.UTF8;
const DEFAULT_OPTIONS = { encoding: DEFAULT_ENCODING };

export const isFileExists = async (fileUri = "") => {
  const { exists } = await FileSystem.getInfoAsync(fileUri);
  return exists;
};

export const getFilenameOnly = (fileUri = "/") => fileUri.split("/").pop();

export const getFileExtensionOnly = (fileUri = "/") => fileUri.split(".").pop().toLowerCase();

export const getDirectoryOnly = (fileUri = "/") =>
  fileUri.substring(0, fileUri.lastIndexOf("/"));

export const getDocumentFolderRelativePath = (fileUri = "/") =>
  fileUri.substring(FileSystem.documentDirectory.length);

export const getDocumentFullFilename = (filename) =>
  FileSystem.documentDirectory + filename;

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
    const content = await FileSystem.readAsStringAsync(
      fileUri,
      DEFAULT_OPTIONS
    );

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
