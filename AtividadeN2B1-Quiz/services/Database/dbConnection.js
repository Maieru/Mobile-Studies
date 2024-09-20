import * as SQLite from 'expo-sqlite/next';

let tablesCreated = false

async function getDbConnection() {
    const cx = await SQLite.openDatabaseAsync('quizDatabase.db');
    await createTables(cx)
    return cx;
}

async function createTables(cx) {
    if (tablesCreated)
        return;

    await createTemasTable(cx);
    await createPerguntasTable(cx);
    tablesCreated = true;
}

async function createTemasTable(cx) {
    const query = `CREATE TABLE IF NOT EXISTS tbTemas
            (
                id int not null primary key,
                nome text not null  
            )`;

    await cx.execAsync(query);
}

async function createPerguntasTable(cx) {
    const query = `CREATE TABLE IF NOT EXISTS tbPerguntas
            (
                id text not null primary key,
                textoPergunta text not null,
                alternativa1 text not null,
                alternativa2 text not null,
                alternativa3 text not null,
                alternativa4 text not null,
                alternativaCorreta int not null,
                temaId int not null,
                foreign key(temaId) references tbTemas(id)
            )`;

    await cx.execAsync(query);
}

export async function executeCommand(query, params) {
    var cx = await getDbConnection();

    try {
        const result = params ? await cx.runAsync(query, params) : await cx.execAsync(query);
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
        return result;
    }
    finally {
        await cx.closeAsync();
    }
}

export async function getFirst(query, params) {
    var cx = await getDbConnection();

    try {
        const result = params ? await cx.getFirstAsync(query, params) : await cx.getFirstAsync(query);
        return result;
    }
    finally {
        await cx.closeAsync();
    }
}