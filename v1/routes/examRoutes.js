const express = require('express');
const examController = require('../controller/examController');
const router = express.Router();

router.post('/',examController.createExam);
router.get('/',examController.findExam);
router.put('/',examController.updateExam);
router.delete('/',examController.deleteExam);

module.exports = router;
