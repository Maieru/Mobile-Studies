const mongoose = require('../config/database');

const SolicitacaoLancheSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        dataLiberacao: { type: String, required: true },
        codigoAluno: { type: Number, required: true },
        quantidadeLanches: { type: Number, required: true },
        lancheEntregue: { type: Boolean, required: true, default: false },
    }
)

module.exports = mongoose.model('SolicitacaoLanche', SolicitacaoLancheSchema);