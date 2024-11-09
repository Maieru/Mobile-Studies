const SolicitacaoLancheModel = require('../model/SolicitacaoLancheModel');
const { getAll } = require('./AlunoController');

class SolicitacaoLancheController {
    async create(req, res) {
        const solicitacaoLanche = new SolicitacaoLancheModel(req.body);
        await solicitacaoLanche
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async update(req, res) {
        await SolicitacaoLancheModel.findOneAndUpdate(
            { "id": req.params.id },
            req.body, { new: true }
        )
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async delete(req, res) {
        await SolicitacaoLancheModel.findOneAndDelete({ "id": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async getAll(req, res) {
        await SolicitacaoLancheModel.find().sort('dataLiberacao')
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async get(req, res) {
        await SolicitacaoLancheModel.findOne({ "id": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async getAllFromDate(req, res) {
        try {
            const { dataLiberacao } = req.params;
            const solicitacoes = await SolicitacaoLancheModel.find({ dataLiberacao });
            return res.status(200).json(solicitacoes);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async setLancheEntregue(req, res) {
        try {
            const { id } = req.params;
            const solicitacao = await SolicitacaoLancheModel.findOne({ id });
            solicitacao.lancheEntregue = true;
            await solicitacao.save();
            return res.status(200).json(solicitacao);
        }
        catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = new SolicitacaoLancheController();