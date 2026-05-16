const express = require('express');
const router = express.Router();
const dreamController = require('../controllers/dreamController');


router.get('/', dreamController.getAllDreams);

router.get('/:id', dreamController.getDreamById);

router.post('/', dreamController.createDream);

router.put('/:id', dreamController.updateDream);

router.delete('/:id', dreamController.deleteDream);

module.exports = router;
