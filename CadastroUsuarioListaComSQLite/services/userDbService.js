import executeCommand from './dbConnection';

export async function insertUser(user) {
    const query = 'insert into tbUsuarios (id, nome, email, senha) values (?,?,?,?)';
    const result = await executeCommand(query, [user.id, user.nome, user.telefone]);
    return result.changes;
}

export async function getAllUsers() {
    const query = 'select * from tbUsuarios';
    return await executeCommand(query);
}

export async function getUserById(id) {
    const query = 'select * from tbUsuarios where id=?';
    return await executeCommand(query, id);
}

export async function updateUser(user) {
    const query = 'update tbUsuarios set nome=?, email=?, senha=? where id=?';
    const result = await executeCommand(query, [user.nome, user.email, user.senha, user.id]);
    return result.changes;
}

export async function deleteUser(id) {
    const query = 'delete from tbUsuarios where id=?';
    const result = await executeCommand(query, id);
    return result.changes;
}