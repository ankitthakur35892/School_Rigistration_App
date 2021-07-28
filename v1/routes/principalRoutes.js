const express = require('express');
const principalController = require('../controller/principalController')
const router = express.Router();
router.post('/',principalController.addPrincipal);
router.post('/verify',principalController.verifyOtp);
router.post('/changePassword',principalController.changePassword);
router.post('/forgetPassword',principalController.forgetPassword);
router.get('/',principalController.findPrincipal);
router.put('/',principalController.updatePrincipal);
router.delete('/:id',principalController.deletePrincipal);
router.post('/login',principalController.login);

module.exports = router;
