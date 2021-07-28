const express = require('express');
const principalController = require('../controller/principalController')
const router = express.Router();
router.post('/new',principalController.addPrincipal);
router.post('/verify',principalController.verifyOtp);
router.post('/changePassword',principalController.changePassword);
router.post('/forgetPassword',principalController.forgetPassword);
router.get('/find',principalController.findPrincipal);
router.put('/update',principalController.updatePrincipal);
router.delete('/delete',principalController.deletePrincipal);
router.post('/login',principalController.login);

module.exports = router;
