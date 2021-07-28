const classController = require('../controller/classController');
const express = require('express');
const router = express.Router();
router.post('/new',classController.newClass);
router.get('/find',classController.findClass);
router.put('/update',classController.updateClass);
router.post('/delete',classController.deleteClass);

module.exports = router;