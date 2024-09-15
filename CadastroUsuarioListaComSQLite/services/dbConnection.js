import * as SQLite from 'expo-sqlite/next';

let tablesCreated = false

async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbUsuarios.db');
    await createTables();
    return cx;
}

async function createTables() {
    if (tablesCreated)
        return;

    await createUserTable();
    tablesCreated = true;
}

async function createUserTable() {
    const query = `CREATE TABLE IF NOT EXISTS tbUsuarios
            (
                id text not null primary key,
                nome text not null,
                email text not null,
                senha text not null          
            )`;
    var cx = await getDbConnection();
    await cx.execAsync(query);
    await cx.closeAsync();
}

export async function executeCommand(query, params) {
    var cx = await getDbConnection();

    try {
        const result = params ? await cx.runAsync(query, params) : await cx.runAsync(query);
        await cx.closeAsync();
        return result;
    }
    finally {
        await cx.closeAsync();
    }
}