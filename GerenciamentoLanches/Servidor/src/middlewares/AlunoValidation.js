const AlunoModel = require('../model/AlunoModel');

async function AlunoValidation(req, res, next) {
    console.log(req.body);
    const { ra, nome, imagem } = req.body;

    let alteracaoRegistro = req.params.ra != null;

    if (!nome || nome.length < 2)
        return res.status(400).json({ erro: 'Informe o nome com ao menos 2 dígitos' });

    if (alteracaoRegistro) {
        if (ra && Number.parseInt(req.params.ra) != Number.parseInt(ra))
            return res.status(400).json({ erro: 'RA informado no parâmetro está diferente do ra informado no Json' });

        let qtde = (await AlunoModel.countDocuments({ "ra": req.params.ra }));
        let existe = qtde >= 1;

        if (!existe)
            return res.status(400).json({ erro: 'Não há registro para o RA informado' });
    }
    else {
        if (!ra)
            return res.status(400).json({ erro: 'Informe o RA' });

        let existe = (await AlunoModel.countDocuments({ "ra": ra })) >= 1;
        if (existe)
            return res.status(400).json({ erro: 'Já existe um aluno cadastrado com este RA' });
    }

    return next();
}


module.exports = AlunoValidation;