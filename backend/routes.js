const express = require('express');

const MovieController = require('./controllers/MovieController');

const router = express.Router();

router.get('/', MovieController.index);
router.post('/movie', MovieController.store);
router.get('/movie/:id', MovieController.show);
router.put('/movie/:id', MovieController.update);
router.delete('/movie/:id', MovieController.delete);

module.exports = router;