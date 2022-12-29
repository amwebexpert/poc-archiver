import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import * as fileService from "./file-service";

const SQL_TABLE_FILE = `CREATE TABLE IF NOT EXISTS 
  FILE (
    ID                 INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME               TEXT NOT NULL,
    SIZE               INTEGER NOT NULL,
    MODIFICATION_TIME  TEXT NOT NULL
  );`;

const SQL_TABLE_CHUNK = `CREATE TABLE IF NOT EXISTS 
  CHUNK (
    ID                 INTEGER PRIMARY KEY AUTOINCREMENT,
    FILE_ID            INTEGER NOT NULL,
    DATA               BLOB NOT NULL
  );`;

const createDbFolderUri = async () => {
  const dbFolderUri = fileService.getDocumentFullFilename("SQLite");
  const exists = await fileService.isFileExists(dbFolderUri);
  if (!exists) {
    await fileService.createDirectoryStructure(dbFolderUri);
  }
};

export const getUniqueDbFilename = () => {
  const nowAsIsoFilename = fileService.nowAsIsoFilename();
  return `archive-${nowAsIsoFilename}.db`;
};

const createDbInstance = async (existingFilename) => {
  await createDbFolderUri();

  const dbFilename = existingFilename ?? getUniqueDbFilename();
  const db = SQLite.openDatabase(dbFilename);

  return { db, dbFilename };
};

const executeSql = async (db, sql = "", params = []) =>
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

const setupDbTables = async (existingFilename) => {
  const { db, dbFilename } = await createDbInstance(existingFilename);

  await executeSql(db, SQL_TABLE_FILE);
  await executeSql(db, SQL_TABLE_CHUNK);

  return { db, dbFilename };
};

export const archiveFile = async (existingFilename, fileUri) => {
  const { db, dbFilename } = await setupDbTables(existingFilename);

  const name = fileService.getDocumentFolderRelativePath(fileUri);
  const { exists, size, modificationTime } = await FileSystem.getInfoAsync(
    fileUri
  );

  if (!exists) {
    throw Error(`File not found\n ➡ "${name}"`);
  }

  const modifiedAtISO = new Date(modificationTime * 1000).toISOString();
  const sql =
    "INSERT INTO FILE (NAME, SIZE, MODIFICATION_TIME) VALUES (?, ?, ?);";
  await executeSql(db, sql, [name, size, modifiedAtISO]);

  const result = await executeSql(db, "SELECT * FROM FILE");
  for (let i = 0; i < result.rows.length; i++) {
    console.log(`FILE table row ${i}`, result.rows.item(i));
  }

  return {
    dbFilename,
  };
};
