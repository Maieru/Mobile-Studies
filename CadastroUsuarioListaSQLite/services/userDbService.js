import { executeCommand, getResult } from './dbConnection';

export async function insertUser(user) {
    const query = 'insert into tbUsuarios (id, nome, email, senha) values (?,?,?,?)';
    const result = await executeCommand(query, [user.codigo, user.nome, user.email, user.senha]);
    return result.changes;
}

export async function getAllUsers() {
    const query = 'select * from tbUsuarios';
    return await getResult(query);
}

export async function getUserById(id) {
    const query = 'select * from tbUsuarios where id=?';
    return await getResult(query, id);
}

export async function updateUser(user) {
    console.log(user);
    const query = 'update tbUsuarios set nome=?, email=?, senha=? where id=?';
    const result = await executeCommand(query, [user.nome, user.email, user.senha, user.codigo]);
    return result.changes;
}

export async function deleteUser(id) {
    const query = 'delete from tbUsuarios where id=?';
    const result = await getResult(query, id);
    return result.changes;
}