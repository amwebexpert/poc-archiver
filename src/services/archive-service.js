import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import * as fileService from "./file-service";

const SQL_TABLE_FILE = `CREATE TABLE IF NOT EXISTS 
  FILE (
    ID                 INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME               TEXT NOT NULL,
    SIZE               INT NOT NULL,
    MODIFICATION_TIME  INT NOT NULL
  );`;

const SQL_TABLE_CHUNK = `CREATE TABLE IF NOT EXISTS 
  CHUNK (
    ID                 INTEGER PRIMARY KEY AUTOINCREMENT,
    FILE_ID            INTEGER PRIMARY KEY AUTOINCREMENT,
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

  return { dbFilename, db };
};

const setupDbTables = async (existingFilename) => {
  const { db, dbFilename } = createDbInstance(existingFilename);

  await db.executeSql(SQL_TABLE_FILE);
  await db.executeSql(SQL_TABLE_CHUNK);

  return { db, dbFilename };
};

export const archiveFile = async (existingFilename, fileUri) => {
  const { db, dbFilename } = setupDbTables(existingFilename);

  const name = fileService.getDocumentFolderRelativePath(fileUri);
  const { exists, size, modificationTime } = await FileSystem.getInfoAsync(
    fileUri
  );

  if (!exists) {
    throw Error(`File not found\n ➡ "${name}"`);
  }

  await db.executeSql(
    `INSERT INTO FILE (NAME, SIZE, MODIFICATION_TIME) VALUES (?, ?, ?);`,
    [name, size, modificationTime]
  );

  const results = await db.executeSql("SELECT * FROM FILE");
  results.forEach((result) => {
    for (let i = 0; i < result.rows.length; i++) {
      console.log(`FILE table row ${i}`, result.rows.item(i));
    }
  });

  return {
    dbFilename,
  };
};
