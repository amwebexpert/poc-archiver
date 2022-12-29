import * as SQLite from "expo-sqlite";
import * as fileService from "./file-service";

export const createDbFolderUri = async () => {
  const dbFolderUri = fileService.getDocumentFullFilename("SQLite");
  const exists = await fileService.isFileExists(dbFolderUri);
  if (!exists) {
    await fileService.createDirectoryStructure(dbFolderUri);
  }
};

export const getUniqueDbFilename = (prefix = "") => {
  const nowAsIsoFilename = fileService.nowAsIsoFilename();
  return `${prefix}${nowAsIsoFilename}.db`;
};

export const createDbInstance = async (existingFilename) => {
  await createDbFolderUri();

  const dbFilename = existingFilename ?? getUniqueDbFilename();
  const db = SQLite.openDatabase(dbFilename);

  return { db, dbFilename };
};

export const executeSql = async (db, sql = "", params = []) =>
  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
