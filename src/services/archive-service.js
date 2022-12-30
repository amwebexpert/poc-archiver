import * as FileSystem from "expo-file-system";
import * as fileService from "./file-service";
import * as sqlService from "./sql-service";

const CHUNK_SIZE = 100 * 1024; // 100kB

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

export const getUniqueArchiveFilename = () =>
  sqlService.getUniqueDbFilename("archive-");

const setupDbTables = async (archiveName = "") => {
  const { db, dbFilename } = await sqlService.createDbInstance(archiveName);

  await sqlService.executeSql(db, SQL_TABLE_FILE);
  await sqlService.executeSql(db, SQL_TABLE_CHUNK);

  return { db, dbFilename };
};

const getFileInfo = async (fileUri = "") => {
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

const storeFileInfo = async ({ db, fileUri = "" }) => {
  const { name, size, modifiedAtISO } = await getFileInfo(fileUri);
  const archivedAtISO = new Date().toISOString();

  return await sqlService.executeSql(
    db,
    "INSERT INTO FILE (NAME, SIZE, MODIFICATION_TIME, ARCHIVED_AT) VALUES (?, ?, ?, ?);",
    [name, size, modifiedAtISO, archivedAtISO]
  );
};

const storeFileContent = async ({ db, fileId = -1, fileUri = "" }) => {
  const { size } = await getFileInfo(fileUri);
  const sql = "INSERT INTO CHUNK (FILE_ID, DATA) VALUES (?, ?);";
  let bytesCount = 0;
  let chunk;

  do {
    chunk = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
      position: bytesCount,
      length: CHUNK_SIZE,
    });

    await sqlService.executeSql(db, sql, [fileId, chunk]);

    bytesCount += chunk.length;
  } while (bytesCount < size);
};

export const unarchiveFiles = async (archiveName = "") => {
  if (!archiveName || archiveName.trim().length === 0) {
    throw Error("Invalid archiveName argument");
  }

  const archiveFolderUri = await createArchiveFolder(archiveName);

  const { db } = await setupDbTables(archiveName);
  const fileURIs = await getFileURIs(db, archiveFolderUri);

  console.log("__________ FILES __________");
  fileURIs.forEach((f) => console.log(f.fileUriRelative));
  // await FileSystem.writeAsStringAsync(fileUri, text, DEFAULT_OPTIONS);
};

const createArchiveFolder = async (archiveName) => {
  const archiveFolderUri = fileService.getDocumentFullFilename(
    archiveName.replace(".db", "")
  );
  await fileService.createDirectoryStructure(archiveFolderUri);
  return archiveFolderUri;
};

const getFileURIs = async (db, archiveFolderUri) => {
  const fileURIs = [];
  const filesResultset = await sqlService.executeSql(db, "SELECT * FROM FILE");

  for (let i = 0; i < filesResultset.rows.length; i++) {
    const { ID: id, NAME: filename } = filesResultset.rows.item(i);

    const fileUri = `${archiveFolderUri}/${filename}`;
    fileURIs.push({
      id,
      filename,
      fileUri,
      fileUriRelative: fileUri.substring(fileUri.indexOf("/Documents/")),
    });
  }

  return fileURIs;
};

export const archiveFiles = async ({ archiveName = "", fileURIs = [] }) => {
  if (!fileURIs || fileURIs.length === 0) {
    throw Error("Invalid fileURIs argument");
  }

  const { db, dbFilename } = await setupDbTables(archiveName);

  for (let i = 0; i < fileURIs.length; i++) {
    const fileUri = fileURIs[i];
    const { insertId } = await storeFileInfo({ db, fileUri });
    await storeFileContent({ db, fileId: insertId, fileUri });
  }

  await logDebuggingInfo(db);

  return {
    archiveName: dbFilename,
  };
};

const logDebuggingInfo = async (db) => {
  const filesResultset = await sqlService.executeSql(db, "SELECT * FROM FILE");
  for (let i = 0; i < filesResultset.rows.length; i++) {
    const item = filesResultset.rows.item(i);
    console.log(`*** FILE table row ${i}`, item);
  }

  const chucksResulset = await sqlService.executeSql(db, "SELECT * FROM CHUNK");
  for (let i = 0; i < chucksResulset.rows.length; i++) {
    const { ID, FILE_ID, DATA } = chucksResulset.rows.item(i);
    console.log(`*** CHUNK table row ${i}`, {
      data: DATA.substring(0, 20) + "…",
      id: ID,
      fileId: FILE_ID,
    });
  }
};
