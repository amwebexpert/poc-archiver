import * as FileSystem from "expo-file-system";
import * as fileService from "~/services/file-service";
import * as archiveService from "~/services/archive-service";

import { AppAssets } from "~/assets";
import { LONG_TEXT } from "./data";

export const archiveDataDemo = async ({ passphrase = "" }) => {
  const textFileUri = await createTextFileInDocumentFolder();
  const documentPictures = await copyAssetsPicturesToDocumentFolder();
  const fileURIs = [textFileUri, ...documentPictures];

  const archiveName = archiveService.getUniqueArchiveFilename();
  await archiveService.archiveFiles({
    archiveName,
    passphrase,
    fileURIs,
  });

  return archiveName;
};

export const unarchiveDataDemo = async ({
  archiveName = "",
  passphrase = "",
}) => {
  const archiveFiles = await archiveService.unarchiveFiles({
    archiveName,
    passphrase,
  });
  return archiveFiles;
};

export const copyAssetsPicturesToDocumentFolder = async () => {
  const picturesFolder = `${FileSystem.documentDirectory}MyPictures`;
  const { dark, light } = AppAssets.backgrounds;
  const pictures = [dark, light];
  const documentPictures = [];

  await fileService.createDirectoryStructure(picturesFolder);

  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    const target = `${picturesFolder}/${picture.name}.${picture.type}`;
    await FileSystem.downloadAsync(picture.uri, target);
    documentPictures.push(target);
  }

  return documentPictures;
};

export const createTextFileInDocumentFolder = async () => {
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
