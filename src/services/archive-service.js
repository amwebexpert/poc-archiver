import * as FileSystem from "expo-file-system";
import * as fileService from "./file-service";
import * as sqlService from "./sql-service";

const SQL_TABLE_FILE = `CREATE TABLE IF NOT EXISTS 
  FILE (
    ID                 INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME               TEXT NOT NULL,
    SIZE               INTEGER NOT NULL,
    MODIFICATION_TIME  TEXT NOT NULL,
    ARCHIVED_AT        TEXT NOT NULL
  );`;

const SQL_TABLE_CHUNK = `CREATE TABLE IF NOT EXISTS 
  CHUNK (
    ID                 INTEGER PRIMARY KEY AUTOINCREMENT,
    FILE_ID            INTEGER NOT NULL,
    DATA               BLOB NOT NULL
  );`;

export const getUniqueDbFilename = () =>
  sqlService.getUniqueDbFilename("archive-");

const setupDbTables = async (existingFilename) => {
  const { db, dbFilename } = await sqlService.createDbInstance(
    existingFilename
  );

  await sqlService.executeSql(db, SQL_TABLE_FILE);
  await sqlService.executeSql(db, SQL_TABLE_CHUNK);

  return { db, dbFilename };
};

const getFileInfo = async (fileUri) => {
  const name = fileService.getDocumentFolderRelativePath(fileUri);
  const { exists, size, modificationTime } = await FileSystem.getInfoAsync(
    fileUri
  );

  if (!exists) {
    throw Error(`File not found\n ➡ "${name}"`);
  }

  const modifiedAtISO = new Date(modificationTime * 1000).toISOString();
  return { name, size, modifiedAtISO };
};

const storeFileInfo = async ({ db, fileUri }) => {
  const { name, size, modifiedAtISO } = await getFileInfo(fileUri);
  const archivedAtISO = new Date().toISOString();

  sqlService.executeSql(
    db,
    "INSERT INTO FILE (NAME, SIZE, MODIFICATION_TIME, ARCHIVED_AT) VALUES (?, ?, ?, ?);",
    [name, size, modifiedAtISO, archivedAtISO]
  );
};

export const archiveFile = async (existingFilename, fileUri) => {
  const { db, dbFilename } = await setupDbTables(existingFilename);

  await storeFileInfo({ db, fileUri });

  const result = await sqlService.executeSql(db, "SELECT * FROM FILE");
  for (let i = 0; i < result.rows.length; i++) {
    console.log(`FILE table row ${i}`, result.rows.item(i));
  }

  return {
    dbFilename,
  };
};
