import * as FileSystem from "expo-file-system";
import * as fileService from "~/services/file-service";
import * as archiveService from "~/services/archive-service";

import { AppAssets } from "~/assets";
import { LONG_TEXT } from "./data";

export const archiveDataDemo = async () => {
  const textFileUri = await createTextFile();
  const documentPictures = await copyAssetsToDocumentFolder();
  const files = [textFileUri, ...documentPictures];

  const archive = archiveService.getUniqueDbFilename();
  const { dbFilename } = await archiveService.archiveFiles(archive, files);

  return dbFilename;
};

export const copyAssetsToDocumentFolder = async () => {
  const picturesFolder = `${FileSystem.documentDirectory}MyPictures`;
  const { dark, light } = AppAssets.backgrounds;
  const pictures = [dark, light];
  const documentPictures = [];

  await fileService.createDirectoryStructure(picturesFolder);

  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    const target = `${picturesFolder}/${picture.name}`;
    await FileSystem.downloadAsync(picture.uri, target);
    documentPictures.push(target);
  }

  return documentPictures;
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
