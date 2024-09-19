import { executeCommand, getResult } from './dbConnection';


const perguntaDbService = new PerguntaDbService();
export default perguntaDbService;

class PerguntaDbService {
    constructor() {
        this.tabela = 'tbPerguntas';
    }

    async insertPergunta(pergunta) {
        const query = `insert into ${this.tabela} (id, textoPergunta, alternativa1, alternativa2, alternativa3, alternativa4, alternativaCorreta, temaId) values (?,?,?,?,?,?,?,?)`;
        const result = await executeCommand(query, [pergunta.id, pergunta.textPergunta, pergunta.alternativa1, pergunta.alternativa2, pergunta.alternativa3, pergunta.alternativa4, pergunta.alternativaCorreta, pergunta.temaId]);
        return result.changes;
    }

    async getAllPerguntas() {
        const query = `select * from ${this.tabela}`;
        return await getResult(query);
    }

    async getPerguntasByTemaId(temaId) {
        const query = `select * from ${this.tabela} where temaId=?`;
        return await getResult(query, temaId);
    }

    async getPerguntaById(id) {
        const query = `select * from ${this.tabela} where id=?`;
        return await getResult(query, id);
    }

    async updatePergunta(pergunta) {
        const query = `update ${this.tabela} set textoPergunta=?, alternativa1=?, alternativa2=?, alternativa3=?, alternativa4=?, alternativaCorreta=?, temaId=? where id=?`;
        const result = await executeCommand(query, [pergunta.textPergunta, pergunta.alternativa1, pergunta.alternativa2, pergunta.alternativa3, pergunta.alternativa4, pergunta.alternativaCorreta, pergunta.temaId, pergunta.id]);
        return result.changes;
    }

    async deletePergunta(id) {
        const query = `delete from ${this.tabela} where id=?`;
        const result = await getResult(query, id);
        return result.changes;
    }
}