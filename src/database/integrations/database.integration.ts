// import { Connection } from '../database.providers';
//
// const databaseName = `test_${randomBytes(8).toString('hex')}`;
//
// export async function databaseIntegrationSetup() {
//     try {
//         await Connection.initialize();
//         await Connection.query(`CREATE DATABASE "${databaseName}"`);
//     } catch (err) {
//         console.error(err instanceof Error ? err.stack : JSON.stringify(err));
//         process.exit(1);
//     }
//
//     return Connection;
// }
//
// export async function closeDatabaseIntegrationConnections() {
//     try {
//         await Connection.query(`DROP DATABASE "${databaseName}"`);
//         await Connection.destroy();
//     } catch (err) {
//         console.error(err instanceof Error ? err.stack : JSON.stringify(err));
//         process.exit(1);
//     }
// }
