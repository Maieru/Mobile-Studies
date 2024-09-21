import { executeCommand, getResult, getFirst } from './dbConnection';

export class TemaDbService {
    constructor() {
        this.tabela = 'tbTemas';
    }

    async insertTema(tema) {
        const query = `insert into ${this.tabela} (id, nome) values (?,?)`;
        const result = await executeCommand(query, [tema.id, tema.nome]);
        return result.changes;
    }

    async getAllTemas() {
        const query = `select * from ${this.tabela}`;   
        return await getResult(query);
    }

    async getTemaById(id) {
        const query = `select * from ${this.tabela} where id=?`;
        return await getFirst(query, id);
    }

    async updateTema(tema) {
        const query = `update ${this.tabela} set nome=? where id=?`;
        const result = await executeCommand(query, [tema.nome, tema.id]);
        return result.changes;
    }

    async deleteTema(id) {
        const query = `delete from ${this.tabela} where id=?`;
        const result = await executeCommand(query, id);
        return result.changes;
    }

    async getNextAvailableId() {
        const query = `select max(id) as id from ${this.tabela}`;
        const result = await getFirst(query);
        return parseInt(result.id) + 1;
    }
}