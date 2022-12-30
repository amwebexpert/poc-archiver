import * as Sharing from "expo-sharing";

import * as fileService from "~/services/file-service";
import { MimeTypes } from "~/services/mimetype-utils";

import { HTML_SAMPLE, LONG_TEXT } from "./data";

export const openHtmlFileDemo = async () => {
  const fileUri = await createHtmlFile();
  return openFileDemo(fileUri);
};

export const openTextFileDemo = async () => {
  const fileUri = await createTextFile();
  return openFileDemo(fileUri);
};

export const openFileDemo = async (fileUri) => {
  const filename = fileService.getFilenameOnly(fileUri);
  const extension = fileService.getFileExtensionOnly(fileUri);
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

export const createHtmlFile = async () => {
  const fileUri = fileService.getDocumentFullFilename("device-data.html");
  const { error } = await fileService.saveTextContent({
    fileUri,
    text: HTML_SAMPLE,
  });

  if (error) {
    throw error;
  }

  return fileUri;
};

export const createTextFile = async () => {
  const fileUri = fileService.getDocumentFullFilename("device-data.txt");
  const { error } = await fileService.saveTextContent({
    fileUri,
    text: LONG_TEXT,
  });

  if (error) {
    throw error;
  }

  return fileUri;
};
