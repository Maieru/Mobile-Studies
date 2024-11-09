const express = require('express');
const router = express.Router();
const AlunoController = require('../controller/AlunoController');
const AlunoValidator = require('../middlewares/AlunoValidation');

router.get('/:ra', AlunoController.get);
router.get('/filter/getAll', AlunoController.getAll);
router.post('/', AlunoValidator, AlunoController.create);
router.put('/:ra', AlunoValidator, AlunoController.update);
router.delete('/:ra', AlunoController.delete);

module.exports = router;