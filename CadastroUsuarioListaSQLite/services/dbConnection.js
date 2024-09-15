import * as SQLite from 'expo-sqlite/next';

let tablesCreated = false

async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('dbUsuarios.db');
    await createTables(cx)
    return cx;
}

async function createTables(cx) {
    if (tablesCreated)
        return;

    await createUserTable(cx);
    tablesCreated = true;
}

async function createUserTable(cx) {
    const query = `CREATE TABLE IF NOT EXISTS tbUsuarios
            (
                id text not null primary key,
                nome text not null,
                email text not null,
                senha text not null          
            )`;

    await cx.execAsync(query);
}

export async function executeCommand(query, params) {
    var cx = await getDbConnection();

    try {
        const result = params ? await cx.runAsync(query, params) : await cx.execAsync(query);
        console.log(result);
        return result;
    }
    finally {
        await cx.closeAsync();
    }
}

export async function getResult(query, params) {
    var cx = await getDbConnection();

    try {
        const result = params ? await cx.getAllAsync(query, params) : await cx.getAllAsync(query);
        console.log(result);
        return result;
    }
    finally {
        await cx.closeAsync();
    }
}