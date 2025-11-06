
const express = require('express');
const router = express.Router();
const controller = require('../controllers/bugsController');

router.post('/', controller.createBug);
router.get('/', controller.getBugs);
router.put('/:id', controller.updateBug);
router.delete('/:id', controller.deleteBug);

module.exports = router;

