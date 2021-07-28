const express = require('express');
const subjectController = require('../controller/subjectController')
const router = express.Router();

router.post('/new',subjectController.addsubject);
router.get('/find',subjectController.findSubject);
router.put('/update',subjectController.updateSubject);
router.delete('/delete',subjectController.deleteSubject);
module.exports = router;