import * as fileService from "~/services/file-service";

import { HTML_SAMPLE, LONG_TEXT } from "./data";

export const openHtmlFileDemo = async () => {
  const fileUri = await createHtmlFile();
  return fileService.shareFile(fileUri);
};

export const openTextFileDemo = async () => {
  const fileUri = await createTextFile();
  return fileService.shareFile(fileUri);
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
