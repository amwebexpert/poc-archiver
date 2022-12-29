import * as FileSystem from "expo-file-system";
import * as fileService from "~/services/file-service";
import * as archiveService from "~/services/archive-service";
import { AppAssets } from "~/assets";

export const LONG_TEXT = `React Native history

In 2012 Mark Zuckerberg commented, "The biggest mistake we made as a company was betting too much on HTML as opposed to native".[12][13] Using HTML5 for Facebook's mobile version resulted in an unstable application that retrieved data slowly.[14] He promised Facebook would soon deliver a better mobile experience.

Inside Facebook, Jordan Walke found a way to generate UI elements for iOS from a background JavaScript thread, which became the basis for the React web framework. They decided to organize an internal Hackathon to perfect this prototype in order to be able to build native apps with this technology.[15]

In 2015, after months of development, Facebook released the first version for the React JavaScript Configuration. During a technical talk,[16] Christopher Chedeau explained that Facebook was already using React Native in production for their Group App and their Ads Manager App.[17]`;

export const insertData = async () => {
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
  const textFileUri = fileService.getDocumentFullFilename("device-data.txt");
  const { error } = await fileService.saveTextContent({
    fileUri: textFileUri,
    text: LONG_TEXT,
  });

  if (error) {
    throw error;
  }

  return textFileUri;
};
