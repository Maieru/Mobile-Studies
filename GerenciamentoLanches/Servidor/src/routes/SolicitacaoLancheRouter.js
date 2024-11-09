const express = require('express');
const router = express.Router();
const SolicitacaoLancheController = require('../controller/SolicitacaoLancheController');
const SolicitacaoLancheValidator = require('../middlewares/SolicitacaoLancheValidation');

router.get('/:id', SolicitacaoLancheController.get);
router.get('/filter/getAll', SolicitacaoLancheController.getAll);
router.get('/filter/getAllFromDate/:dataLiberacao', SolicitacaoLancheController.getAllFromDate);
router.get('/filter/getAllFromDateNaoEntregue/:dataLiberacao', SolicitacaoLancheController.getAllFromDateNaoEntregue);
router.get('/filter/getAllFromDateEntregue/:dataLiberacao', SolicitacaoLancheController.getAllFromDateEntregue);
router.post('/', SolicitacaoLancheValidator, SolicitacaoLancheController.create);
router.patch('/setLancheEntregue/:id', SolicitacaoLancheController.setLancheEntregue);
router.put('/:id', SolicitacaoLancheValidator, SolicitacaoLancheController.update);
router.delete('/:id', SolicitacaoLancheController.delete);

module.exports = router;