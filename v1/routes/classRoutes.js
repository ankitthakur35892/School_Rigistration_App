const classController = require('../controller/classController');
const express = require('express');
const router = express.Router();
router.post('/',classController.newClass);
router.get('/',classController.findClass);
router.put('/',classController.updateClass);
router.delete('/:standard',classController.deleteClass);

module.exports = router;