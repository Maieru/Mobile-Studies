const AlunoModel = require('../model/AlunoModel');

class AlunoController {
    async create(req, res) {
        const aluno = new AlunoModel(req.body);
        await aluno
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }

    async update(req, res) {
        await AlunoModel.findOneAndUpdate(
            { "ra": Number.parseInt(req.params.ra) },
            req.body, { new: true }
        )
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async delete(req, res) {
        await AlunoModel.findOneAndDelete({ "ra": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async getAll(req, res) {
        await AlunoModel.find().sort('nome')
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async get(req, res) {
        await AlunoModel.findOne({ "ra": req.params.ra })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }
}

module.exports = new AlunoController();
