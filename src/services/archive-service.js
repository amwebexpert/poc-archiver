import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import CryptoES from "crypto-es";

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
    BASE64_DATA        TEXT NOT NULL
  );`;

export const getUniqueArchiveFilename = () =>
  sqlService.getUniqueDbFilename("archive-");

const setupDbTables = async (archiveName = "") => {
  const { db, dbFilename } = await sqlService.createDbInstance(archiveName);

  await sqlService.executeSql(db, SQL_TABLE_FILE);
  await sqlService.executeSql(db, SQL_TABLE_CHUNK);

  return { db, dbFilename };
};

const buildArchiveFileInfo = async (fileUri = "") => {
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

const writeFileInfo = async ({ db, fileUri = "", passphrase = "" }) => {
  const { name, size, modifiedAtISO } = await buildArchiveFileInfo(fileUri);
  const archivedAtISO = new Date().toISOString();

  return await sqlService.executeSql(
    db,
    "INSERT INTO FILE (NAME, SIZE, MODIFICATION_TIME, ARCHIVED_AT) VALUES (?, ?, ?, ?);",
    [name, size, modifiedAtISO, archivedAtISO]
  );
};

const writeFileContent = async ({
  db,
  fileId = -1,
  fileUri = "",
  passphrase = "",
}) => {
  const { size } = await buildArchiveFileInfo(fileUri);
  const sql = "INSERT INTO CHUNK (FILE_ID, BASE64_DATA) VALUES (?, ?);";
  let bytesCount = 0;
  let chunk;

  do {
    chunk = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
      position: bytesCount,
      length: CHUNK_SIZE,
    });

    await sqlService.executeSql(db, sql, [
      fileId,
      encrypt({ chunk, passphrase }),
    ]);

    bytesCount += chunk.length;
  } while (bytesCount < size);
};

const readFileContent = async ({ db, fileId, passphrase = "" }) => {
  const buffers = [];
  const sql = "SELECT BASE64_DATA FROM CHUNK WHERE FILE_ID = ?";
  const { rows } = await sqlService.executeSql(db, sql, [fileId]);

  for (let i = 0; i < rows.length; i++) {
    const chunk = rows.item(i).BASE64_DATA;
    buffers.push(Buffer.from(decrypt({ chunk, passphrase }), "base64"));
  }

  return Buffer.concat(buffers).toString("base64");
};

const encrypt = ({ chunk, passphrase = "" }) => {
  if (!passphrase) {
    return chunk;
  }

  const chunkAsString = CryptoES.enc.Base64.parse(chunk);
  return CryptoES.AES.encrypt(chunkAsString, passphrase).toString();
};

const decrypt = ({ chunk, passphrase = "" }) => {
  if (!passphrase) {
    return chunk;
  }

  return CryptoES.AES.decrypt(chunk, passphrase).toString(CryptoES.enc.Base64);
};

/**
 * Extracts files included in the provided archive name
 *
 * @param {string} archiveName - The name of the archive
 * @param {string} [passphrase] - The encryption passphrase
 * @param {string[]} fileURIs - The file URIs to archive
 *
 * @returns {string[]} The extracted file URIs
 */
export const unarchiveFiles = async ({ archiveName = "", passphrase = "" }) => {
  if (!archiveName || archiveName.trim().length === 0) {
    throw Error("Invalid archiveName argument");
  }

  const archiveFolderUri = await createArchiveFolder(archiveName);
  const { db } = await setupDbTables(archiveName);
  const archiveFiles = await readArchiveFiles(db, archiveFolderUri);

  for (let i = 0; i < archiveFiles.length; i++) {
    const { id: fileId, fileUri, folderUri } = archiveFiles[i];
    const data = await readFileContent({ db, fileId, passphrase });
    await fileService.createDirectoryStructure(folderUri);
    await FileSystem.writeAsStringAsync(fileUri, data, {
      encoding: FileSystem.EncodingType.Base64,
    });
  }

  return archiveFiles;
};

const createArchiveFolder = async (archiveName) => {
  const archiveFolderUri = fileService.getDocumentFullFilename(
    archiveName.replace(".db", "")
  );
  await fileService.createDirectoryStructure(archiveFolderUri);
  return archiveFolderUri;
};

const readArchiveFiles = async (db, archiveFolderUri) => {
  const archiveFiles = [];
  const filesResultset = await sqlService.executeSql(db, "SELECT * FROM FILE");

  for (let i = 0; i < filesResultset.rows.length; i++) {
    const { ID, NAME, MODIFICATION_TIME, SIZE } = filesResultset.rows.item(i);
    const fileUri = `${archiveFolderUri}/${NAME}`;
    const folderUri = fileService.getDirectoryOnly(fileUri);

    archiveFiles.push({
      id: ID,
      size: SIZE,
      name: NAME,
      modifiedAt: new Date(MODIFICATION_TIME),
      fileUri,
      folderUri,
    });
  }

  archiveFiles.forEach(({ fileUri }) => {
    const startIndex = fileUri.indexOf("/Documents/");
    console.log(fileUri.substring(startIndex));
  });

  return archiveFiles;
};

/**
 * Archive (and optionaly encrypt) the provided files
 *
 * @param {string} [archiveName] - The name of the archive (a default unique archive name will be generated if no archive name is provided)
 * @param {string} [passphrase] - The encryption passphrase (data will only be encrypted if the passphrase is defined)
 * @param {string[]} fileURIs - The file URIs to archive
 *
 * @returns {object} - the final archive
 */
export const archiveFiles = async ({
  archiveName = "",
  passphrase = "",
  fileURIs = [],
}) => {
  if (!fileURIs || fileURIs.length === 0) {
    throw Error("Invalid fileURIs argument");
  }

  const { db, dbFilename } = await setupDbTables(archiveName);

  for (let i = 0; i < fileURIs.length; i++) {
    const fileUri = fileURIs[i];
    const { insertId } = await writeFileInfo({ db, fileUri, passphrase });
    await writeFileContent({ db, fileId: insertId, fileUri, passphrase });
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
    const { ID, FILE_ID, BASE64_DATA } = chucksResulset.rows.item(i);
    console.log(`*** CHUNK table row ${i}`, {
      chunk: BASE64_DATA.substring(0, 20) + "…",
      id: ID,
      fileId: FILE_ID,
    });
  }
};
