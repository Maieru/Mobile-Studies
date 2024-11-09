const SolicitacaoLancheModel = require('../model/SolicitacaoLancheModel');
const AlunoModel = require('../model/AlunoModel');

async function SolicitacaoLancheValidation(req, res, next) {
    console.log(req.body);
    const { id, dataLiberacao, codigoAluno, quantidadeLanches, lancheEntregue } = req.body;

    let alteracaoRegistro = req.params.id != null;

    if (!dataLiberacao)
        return res.status(400).json({ erro: 'Informe a data de liberação' });

    if (!codigoAluno)
        return res.status(400).json({ erro: 'Informe o código do aluno' });

    if (!quantidadeLanches)
        return res.status(400).json({ erro: 'Informe a quantidade de lanches' });

    if (quantidadeLanches < 1)
        return res.status(400).json({ erro: 'A quantidade de lanches deve ser maior que zero' });

    if (quantidadeLanches > 3)
        return res.status(400).json({ erro: 'A quantidade de lanches não pode ser maior que 3' });

    let alunoExiste = (await AlunoModel.countDocuments({ "ra": codigoAluno })) >= 1;

    if (!alunoExiste)
        return res.status(400).json({ erro: 'Não há aluno cadastrado com o RA informado' });

    let solicitacaoParaOMesmoDiaDoMesmoAluno = (await SolicitacaoLancheModel.countDocuments({ "dataLiberacao": dataLiberacao, "codigoAluno": codigoAluno })) >= 1;

    if (alteracaoRegistro) {
        if (id && Number.parseInt(req.params.id) != Number.parseInt(id))
            return res.status(400).json({ erro: 'ID informado no parâmetro está diferente do id informado no Json' });

        let qtde = (await SolicitacaoLancheModel.countDocuments({ "id": req.params.id }));
        let existe = qtde >= 1;

        if (!existe)
            return res.status(400).json({ erro: 'Não há registro para o ID informado' });

        if (solicitacaoParaOMesmoDiaDoMesmoAluno && solicitacaoParaOMesmoDiaDoMesmoAluno.id != id)
            return res.status(400).json({ erro: 'Já existe uma solicitação de lanche para este aluno nesta data' });
    }
    else {
        if (!id)
            return res.status(400).json({ erro: 'Informe o ID' });

        if (solicitacaoParaOMesmoDiaDoMesmoAluno)
            return res.status(400).json({ erro: 'Já existe uma solicitação de lanche para este aluno nesta data' });

        let existe = (await SolicitacaoLancheModel.countDocuments({ "id": id })) >= 1;

        if (existe)
            return res.status(400).json({ erro: 'Já existe uma solicitação de lanche cadastrada com este ID' });
    }

    return next();
}

module.exports = SolicitacaoLancheValidation;