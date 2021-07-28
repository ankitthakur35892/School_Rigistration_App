const express = require('express');
const subjectController = require('../controller/subjectController')
const router = express.Router();

router.post('/',subjectController.addsubject);
router.get('/',subjectController.findSubject);
router.put('/',subjectController.updateSubject);
router.delete('/:id',subjectController.deleteSubject);
module.exports = router;