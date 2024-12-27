import { dbName } from "../../Config/dbConnection.js";

export async function createDatabaseIfNotExist(client) {
  try {
    const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = '${dbName}'`;
    const res = await client.query(checkDbQuery);
    if (res.rowCount === 0) {
      const createDbQuery = `CREATE DATABASE ${dbName}`;
      await client.query(createDbQuery);
    }
  } catch (err) {}
}
